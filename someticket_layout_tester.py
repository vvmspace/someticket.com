import os
import re
import yaml
from bs4 import BeautifulSoup
import glob

ROOT_DIR = "/Users/vvm/someticket.com"
CONTENT_DIR = os.path.join(ROOT_DIR, "content")
PUBLIC_DIR = os.path.join(ROOT_DIR, "public")

# Sovereign Filter: Forbidden "Technical/SEO" phrases
STERILE_PHRASES = [
    "if you are searching for", "this page is written for", "this page is built for",
    "search queries this page intentionally targets", "use this page to",
    "narrowing down sections", "purchase-focused guide", "buyer-first guide",
    "conversion-focused guide", "search intent", "rank for high-intent searches"
]

# AI-isms for premium feel
AI_CLICHES = [
    "unforgettable experience", "heart-pounding", "delve into", "testament to", 
    "ultimate destination", "passion and excitement", "discover the magic"
]

def analyze_markdown(path):
    """Analyzes the source .md file for YAML syntax and sterile content."""
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 1. Basic YAML syntax check
        try:
            # Split frontmatter and content
            if content.startswith('---'):
                parts = content.split('---', 2)
                if len(parts) >= 3:
                    yaml.safe_load(parts[1])
        except yaml.YAMLError as e:
            return 0, [f"CRITICAL: YAML Syntax Error: {e}"]

        # 2. Cyrillic Check
        if re.search(r'[а-яА-ЯёЁ]', content):
            return 0, ["CRITICAL: Cyrillic characters detected in source!"]

        # 3. Sterile Content Check
        issues = []
        score = 100
        for phrase in STERILE_PHRASES:
            if phrase.lower() in content.lower():
                score -= 30
                issues.append(f"STERILE: Found forbidden phrase '{phrase}'")
        
        # 4. Content Length Check (Body only)
        if len(parts) >= 3:
            body = parts[2].strip()
            char_count = len(re.sub(r'\s+', '', body))
            if char_count < 1000:
                score -= 30
                issues.append(f"CONTENT: Text too short ({char_count}/1000 chars)")
            elif char_count > 4000:
                score -= 10
                issues.append(f"CONTENT: Text too long ({char_count}/4000 chars)")

        return max(0, score), issues
    except Exception as e:
        return 0, [f"FILE ERROR: {e}"]

def analyze_html(path):
    """Analyzes the rendered HTML for SEO and structure."""
    try:
        with open(path, 'r', encoding='utf-8') as f:
            html = f.read()
        
        soup = BeautifulSoup(html, 'html.parser')
        score = 100
        issues = []

        # SEO Basics
        if not soup.find('h1'):
            score -= 20
            issues.append("SEO: Missing H1")
        
        title = soup.title.string if soup.title else ""
        if len(title) < 30:
            score -= 10
            issues.append("SEO: Title too short")
            
        desc = soup.find('meta', attrs={'name': 'description'})
        if not desc or len(desc.get('content', '')) < 50:
            score -= 10
            issues.append("SEO: Description too short")

        if not soup.find('link', attrs={'rel': 'canonical'}):
            score -= 10
            issues.append("SEO: Missing canonical link")

        return max(0, score), issues
    except Exception as e:
        return 0, [f"FILE ERROR: {e}"]

def main():
    print(f"--- SomeTicket Sovereign Audit (v1.0) ---")
    
    # 1. Source Analysis (.md)
    print("\n[1/2] Analyzing source Markdown files...")
    md_files = glob.glob(f"{CONTENT_DIR}/**/*.md", recursive=True)
    md_results = []
    for path in md_files:
        res = analyze_markdown(path)
        if res:
            md_results.append((path, res[0], res[1]))
    
    # 2. Rendered Analysis (HTML in /public)
    print("[2/2] Analyzing rendered HTML in /public...")
    html_files = glob.glob(f"{PUBLIC_DIR}/**/*.html", recursive=True)
    html_results = []
    if not html_files:
        print("⚠️ No HTML files found in /public. Did you run 'hugo'?")
    else:
        for path in html_files:
            res = analyze_html(path)
            if res:
                html_results.append((path, res[0], res[1]))

    # Print Summary
    print("\n" + "="*50)
    print("Sovereign Audit Summary")
    print("="*50)
    
    if md_results:
        print(f"\nSource Files: {len(md_results)} scanned")
        failures = [r for r in md_results if r[1] < 100]
        if not failures:
            print("✅ ALL SOURCE FILES ARE SOVEREIGN")
        else:
            print(f"❌ {len(failures)} files need refinement:")
            for path, score, issues in failures[:10]: # Show first 10
                print(f"  {score}% | {os.path.basename(path)}")
                for issue in issues:
                    print(f"    - {issue}")
            if len(failures) > 10:
                print(f"  ... and {len(failures)-10} more.")

    if html_results:
        print(f"\nRendered Files: {len(html_results)} scanned")
        failures = [r for r in html_results if r[1] < 100]
        if not failures:
            print("✅ ALL RENDERED PAGES ARE SEO-PERFECT")
        else:
            print(f"❌ {len(failures)} pages have SEO issues")
            for path, score, issues in failures[:10]:
                print(f"  {score}% | {os.path.basename(path)}")
                for issue in issues:
                    print(f"    - {issue}")

    print("\n" + "="*50)

if __name__ == "__main__":
    main()
