# yui

Reusable Angular UI components and an interactive component gallery, built with Angular 20.

The repository contains two Angular projects:

- **`yui`** — a reusable component library with typed APIs and bundled styles.
- **`uidocs`** — a live gallery with examples and documentation for the components.

## Contents

- [Features](#features)
- [Requirements](#requirements)
- [Run the component gallery](#run-the-component-gallery)
- [Build the library](#build-the-library)
- [Use the library](#use-the-library)
- [Theming](#theming)
- [Publish to GitHub Packages](#publish-to-github-packages)
- [Contributing](#contributing)
- [License](#license)

## Features

The library currently includes:

- Badges and buttons
- Form controls, including standard, searchable, and multi-select inputs
- Modal dialogs and modal forms
- Loading indicators and notifications
- Grid and multi-item views
- Page layouts, sections, and tool containers
- Timelines and nested tree navigation

The `uidocs` gallery provides example pages for these components. Searchable inputs and the grid use an in-memory mock API so the examples run without a backend service.

## Requirements

- Node.js 22 or newer
- npm
- Angular 20 compatible applications

## Run the component gallery

```bash
npm ci
npm run uidocs
```

Open [http://localhost:4300](http://localhost:4300) to browse the gallery.

To create a production build of the gallery:

```bash
npm run build:uidocs
```

The output is written to `dist/uidocs`.

## Build the library

```bash
npm run build
npm run pack:dry-run
```

The distributable package is generated in `dist/yui`. To install that build into another local Angular application:

```bash
npm install /path/to/AngularComponents/dist/yui
```

## Use the library

Import the modules required by your application. For example:

```ts
import { BadgeModule, ButtonModule, InputModule, ModalModule } from 'yui';

@NgModule({
  imports: [BadgeModule, ButtonModule, InputModule, ModalModule],
})
export class AppModule {}
```

Load the library stylesheet once in the consuming application's global stylesheet:

```css
@import 'yui/styles.css';
```

Searchable inputs and the pageable grid use Angular `HttpClient`. Configure `provideHttpClient()` or import `HttpClientModule` in the consuming application.

### Tree view

Provide a nested `TreeViewNode` array. Nodes can include icons, Angular routes, external URLs, child nodes, and disabled states. The component emits `nodeSelected` when a node is activated.

```ts
import { TreeViewModule, TreeViewNode } from 'yui';

readonly navigation: TreeViewNode[] = [
  {
    id: 'projects',
    label: 'Projects',
    icon: 'bx-folder',
    children: [
      { id: 'active', label: 'Active projects', routerLink: '/projects' },
    ],
  },
];
```

```html
<tasker-tree-view
  label="Main navigation"
  [items]="navigation"
  (nodeSelected)="onSelected($event)"
/>
```

Import `TreeViewModule` in the Angular module or standalone component that uses the tree view.

### Timeline

Timeline items support a title, optional description and date, an icon, and a `complete`, `current`, or `upcoming` status.

```ts
import { TimelineItem, TimelineModule } from 'yui';

readonly milestones: TimelineItem[] = [
  { title: 'Planning', date: 'Sep 18', status: 'complete' },
  { title: 'Implementation', description: 'Work is in progress.', status: 'current' },
  { title: 'Release', status: 'upcoming' },
];
```

```html
<tasker-timeline [items]="milestones" />
```

## Theming

The bundled stylesheet uses the light palette by default and includes a dark palette. Set `data-theme` on the root `<html>` element to change the theme:

```ts
document.documentElement.dataset.theme = 'dark'; // Set to 'light' to switch back.
```

## Publish to GitHub Packages

The repository includes a GitHub Actions workflow that builds and publishes the package to GitHub Packages when a `v*` tag is pushed. It can also be run manually from the Actions tab. The package is published under the repository owner's scope (`@yasinsadjadi/yui`).

To publish a release, create and push a version tag, for example:

```bash
git tag v0.1.0
git push origin v0.1.0
```

Consumers can install the package with:

```bash
npm install @yasinsadjadi/yui
```

GitHub Packages authentication and registry setup may be required in the consuming project.

## Contributing

Issues and pull requests are welcome. For changes, please describe the affected component and include a gallery example when it helps demonstrate the behavior. Ensure the library and, when relevant, the gallery build successfully before opening a pull request:

```bash
npm run build
npm run build:uidocs
```

## License

No `LICENSE` file is currently included. Until a license is added, the repository does not grant permission to reuse, modify, or redistribute its contents.


