---
description: Guidelines for using Prismic MCP server tools for slice development
globs: src/slices/**/*.{tsx,ts,json}
---
# Prismic MCP Server Usage

How to use Prismic MCP server tools for slice modeling, mocking, and coding in this project.

## Prismic MCP Server Overview

The Prismic MCP server is connected and provides specialized tools for:
- **Modeling slices**: Define slice structure and fields
- **Creating mocks**: Generate test data for slices
- **Coding components**: Implement slice React components
- **Managing slices**: Save slice data and register with custom types

## Project Configuration

The project uses:
- **Repository**: `jonathanwillisdesign`
- **Adapter**: `@slicemachine/adapter-next`
- **Slice library**: `./src/slices`
- **Config file**: `slicemachine.config.json` (absolute path required: `/Users/jonnywillis/Sites/portfolio/jonathanwillisdesign/slicemachine.config.json`)

## When to Use MCP Tools

### 1. Modeling Slices (`how_to_model_slice`)
Use when:
- Creating a new slice from scratch
- Adding fields to existing slices
- Restructuring slice models
- Defining field types and configurations

Example workflow:
```
User: "Create a hero slice with title, description, and CTA button"
-> Use how_to_model_slice to get modeling instructions
-> Follow the step-by-step guide
```

### 2. Creating Mocks (`how_to_mock_slice`)
Use when:
- Generating test data for development
- Creating multiple variations of slice content
- Setting up slice previews

Example:
```
Use how_to_mock_slice with:
- sliceMachineConfigAbsolutePath: /Users/jonnywillis/Sites/portfolio/jonathanwillisdesign/slicemachine.config.json
- sliceDirectoryAbsolutePath: /Users/jonnywillis/Sites/portfolio/jonathanwillisdesign/src/slices/SliceName
- userIntent: "Create variations with different content tones"
```

### 3. Coding Components (`how_to_code_slice`)
Use when:
- Implementing React components for slices
- Working with Prismic field types in TypeScript/React
- Following framework-specific patterns (Next.js)

Example:
```
Use how_to_code_slice with:
- sliceMachineConfigAbsolutePath: /Users/jonnywillis/Sites/portfolio/jonathanwillisdesign/slicemachine.config.json
- projectFramework: "next"
- stylingSystem: "stylex"
- modelAbsolutePath: /Users/jonnywillis/Sites/portfolio/jonathanwillisdesign/src/slices/SliceName/model.json
- fieldsUsed: ["prismic.TitleField", "prismic.RichTextField", ...]
```

### 4. Saving Slice Data (`save_slice_data`)
Use when:
- Updating slice models programmatically
- Bulk updating mocks
- Validating slice structure before pushing to Prismic

### 5. Adding to Custom Types (`add_slice_to_custom_type`)
Use when:
- Registering a new slice with a page custom type
- Making slices available in Prismic editor
- Automating slice registration workflow

## Path Requirements

**Always use absolute paths** for MCP tool parameters:

```typescript
// Good - absolute paths
sliceMachineConfigAbsolutePath: "/Users/jonnywillis/Sites/portfolio/jonathanwillisdesign/slicemachine.config.json"
sliceDirectoryAbsolutePath: "/Users/jonnywillis/Sites/portfolio/jonathanwillisdesign/src/slices/RichText"
modelAbsolutePath: "/Users/jonnywillis/Sites/portfolio/jonathanwillisdesign/src/slices/RichText/model.json"

// Bad - relative paths
sliceMachineConfigAbsolutePath: "./slicemachine.config.json"
sliceDirectoryAbsolutePath: "./src/slices/RichText"
```

## Framework and Styling Detection

- **Framework**: Always use `"next"` for this Next.js project
- **Styling**: This project uses StyleX (`@stylexjs/stylex`)
- **Fields**: Read from `model.json` or `prismicio-types.d.ts` to determine field types used

## Best Practices

1. **Always check slice structure first**: Read existing `model.json` files before making changes
2. **Use MCP tools in order**: Model -> Mock -> Code (if creating new slice)
3. **Validate paths**: Ensure all absolute paths exist before calling tools
4. **Follow Prismic conventions**: Use PascalCase for slice names, follow field naming guidelines
5. **Test locally**: Verify slices work in Slice Simulator before pushing to Prismic

## Example: Complete Slice Creation Workflow

1. **Model the slice**:
   ```
   Use how_to_model_slice to get instructions
   Follow modeling guide to create model.json
   ```

2. **Generate mocks**:
   ```
   Use how_to_mock_slice to create test data
   Review generated mocks.json
   ```

3. **Implement component**:
   ```
   Use how_to_code_slice to get component structure
   Implement following Next.js patterns
   ```

4. **Register with custom type**:
   ```
   Use add_slice_to_custom_type to make it available
   ```

## Common Field Types

When working with Prismic fields, reference these common types:
- `prismic.TitleField` - Page titles and headings
- `prismic.RichTextField` - Rich text content
- `prismic.ImageField` - Images and media
- `prismic.LinkField` - Internal/external links
- `prismic.ContentRelationshipField` - Links to other documents
- `prismic.SelectField` - Dropdown selections
- `prismic.BooleanField` - Toggle fields
- `prismic.ColorField` - Color picker fields
