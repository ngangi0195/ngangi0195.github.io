# Blog Writing Guide

## Creating a new post

1. Create a file in `content/blog/` named `your-post-slug.mdx`
2. The filename becomes the URL: `your-post-slug.mdx` → `/blog/your-post-slug`
3. Start every file with frontmatter (the `---` block below)

---

## Frontmatter

```yaml
---
title: "Your Post Title"
date: "2024-08-01"
excerpt: "One sentence that appears on the blog listing page."
tags: ["Robotics", "Python", "Math"]
---
```

---

## Basic Formatting

```markdown
**bold**     *italic*     ~~strikethrough~~

## Section heading
### Sub-section heading

- bullet list
- another item

1. numbered list
2. second item

[link text](https://example.com)

> blockquote

---   (horizontal divider)
```

---

## Code

Inline: `` `some_variable` ``

Block with syntax highlighting:
````markdown
```python title="my_script.py"
def hello():
    print("hello world")
```
````

Supported languages: `python`, `javascript`, `typescript`, `bash`, `yaml`, `json`, `cpp`, `rust`, and more.

---

## Math

Inline: `$E = mc^2$`

Block:
```
$$
\mathbf{x}_{t} = F \mathbf{x}_{t-1} + \mathbf{w}
$$
```

---

## Tables

```markdown
| Column A | Column B | Column C |
|----------|----------|----------|
| value 1  | value 2  | value 3  |
| value 4  | value 5  | value 6  |
```

---

## Custom Components

### Callout boxes

```mdx
<Callout type="info" title="Note">
This is a blue info box.
</Callout>

<Callout type="warning" title="Watch out">
This is a yellow warning box.
</Callout>

<Callout type="tip" title="Pro tip">
This is a green tip box.
</Callout>

<Callout type="danger" title="Don't do this">
This is a red danger box.
</Callout>
```

### Images with captions

Put your image in `public/blog/your-post-slug/` then reference it:

```mdx
<Diagram
  src="/blog/your-post-slug/my-image.png"
  alt="Description of the image"
  caption="Caption shown below the image"
/>
```

Leave out `src` to render a labeled placeholder while you're drafting:

```mdx
<Diagram alt="diagram of the control loop" caption="Figure 1: Control loop overview." />
```

### Before / After code comparison

```mdx
<CodeComparison
  lang="python"
  before={`# old approach
for i in range(len(items)):
    print(items[i])`}
  after={`# cleaner
for item in items:
    print(item)`}
/>
```

---

## Images Workflow

1. Drop your image into `public/blog/your-post-slug/filename.png`
2. Reference it in MDX as `/blog/your-post-slug/filename.png`

---

## Working with Claude

Just send me:
- Your raw notes, outline, or draft text
- Any image files (or descriptions of diagrams you want as placeholders)
- Code snippets you want formatted

I'll write the `.mdx` file with all the proper formatting and components.
