# Adding a Widget to Widy Widgets

This guide explains how to add a new widget to the Widy Widgets repository.

## Prerequisites

To create a widget, you can optionally use the official widget creation tool, which uses React:

```bash
npm create widy-widget@latest
```

This will generate a new widget project with the proper structure and manifest. Alternatively, you can create your widget manually following the requirements below.

## Steps to Add a Widget

### 1. Fork the Repository

Fork the [Widy Widgets repository](https://github.com/widy/widy-widgets) to your GitHub account.

### 2. Clone Your Fork

Clone your forked repository locally:

```bash
git clone https://github.com/YOUR_USERNAME/widy-widgets.git
cd widy-widgets
```

### 3. Add Widget as a Submodule

Add your widget repository as a submodule in the `widgets/` folder:

```bash
git submodule add https://github.com/YOUR_USERNAME/YOUR_WIDGET_REPO.git widgets/YOUR_WIDGET_NAME
```

Replace `YOUR_USERNAME`, `YOUR_WIDGET_REPO`, and `YOUR_WIDGET_NAME` with the appropriate values.

### 4. Update widgets.json

Add an entry for your widget in the `widgets.json` file. The entry should follow this structure:

```json
{
    "YOUR_WIDGET_NAME": {
        "manifest_version": 1,
        "name": "YOUR_WIDGET_NAME",
        "id": "YOUR_WIDGET_NAME",
        "version": "1.0.0",
        "authors": ["YOUR_USERNAME"],
        "description": "Brief description of your widget",
        "repository": "https://github.com/YOUR_USERNAME/YOUR_WIDGET_REPO",
        "scopes": [
            // Add appropriate scopes from @widy/sdk WidgetScopes based on your widget's needs
        ],
        "connect_src": []
    }
}
```

Make sure to:
- Use the exact widget name as the key
- Include all required fields from your widget's manifest
- Set appropriate scopes for your widget's functionality

### 5. Commit and Push Changes

Commit your changes:

```bash
git add .
git commit -m "Add YOUR_WIDGET_NAME widget"
git push origin main
```

### 6. Create a Pull Request

Go to the original [Widy Widgets repository](https://github.com/widy/widy-widgets) and create a pull request from your fork.

## Widget Requirements

- Must have an `npm run build` script
- After running `npm run build`, there must be a `dist` folder containing:
  - Two folders: `view` and `control`, each with an `index.html` file
  - A `manifest.json` file with the correct schema
- Must have a valid manifest file
- Must follow the widget development guidelines
- Repository must be publicly accessible

## Widget License Requirements

Widget repositories must include a license. The following licenses are accepted:

- Apache 2.0
- BSD 2-Clause
- BSD 3-Clause
- CC BY 4.0
- GNU GPLv3
- GNU LGPLv3
- MIT
- Unlicense
- zlib

This allows us to distribute the resulting binary produced from your widget code to our users.

Your license file should be at the root of your widget repository. Any filename that has LICENCE or LICENSE as a prefix (case insensitive) will be inspected to ensure it matches one of the accepted licenses. See the license validation source code.

## Need Help?

If you have questions about widget development or the submission process, please contact Discord [Widy](https://discord.gg/UCdUBBrAA).