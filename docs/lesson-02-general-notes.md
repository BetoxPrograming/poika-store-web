# Lesson 02 — Layout Fragments, Tailwind CSS and Dynamic Languages

## Lesson goal

The goal of this lesson is to transform the basic Póika Store Web project into a more organized frontend application.

This lesson focuses on three main areas:

- Creating reusable layout fragments.
- Preparing the visual structure with Tailwind CSS.
- Configuring dynamic languages through an i18n system.

At the end of this lesson, the application should no longer be only a simple Vite page. It should have a reusable layout, a header, a footer, a home page and a language system that can change text dynamically.

* * *

## Main concept: components as fragments

In the Java store project, reusable page sections are commonly handled with Thymeleaf fragments.

A fragment is a section of a page that can be reused in different views.

Examples:

    Header
    Navbar
    Footer
    Layout

In React, the equivalent idea is a component.

A React component is a reusable piece of the user interface.

Instead of copying the same header or footer into every page, the project creates components and reuses them.

The flow is:

    App
        → AppLayout
            → AppHeader
            → Page content
            → AppFooter

This makes the project easier to maintain.

If the header changes, the developer only updates `AppHeader.tsx` instead of editing every page.

* * *

## ️ Java class equivalent

In the original Java store project, this lesson is related to cleaning the base page, creating reusable fragments and configuring message files for different languages.

In Java, the flow is similar to:

    Thymeleaf templates
        → fragments
        → messages.properties
        → language switching
        → dynamic text in views

In Póika Store Web, the equivalent flow is:

    React components
        → layout components
        → locale files
        → LanguageContext
        → dynamic text with translate()

The goal is the same:

    Avoid duplicated layout code
    Centralize text messages
    Allow the interface to change language dynamically

The implementation changes because Java and React solve the problem differently.

* * *

## Project structure created in this lesson

This lesson adds more organization inside the `src` folder.

The structure is similar to this:

    src/
    ├── components/
    │   └── layout/
    │       ├── AppFooter.tsx
    │       ├── AppHeader.tsx
    │       ├── AppLayout.tsx
    │       └── LanguageSwitcher.tsx
    ├── i18n/
    │   ├── locales/
    │   │   ├── en.ts
    │   │   ├── es.ts
    │   │   ├── fr.ts
    │   │   ├── ja.ts
    │   │   └── pt.ts
    │   ├── LanguageContext.tsx
    │   └── index.ts
    ├── pages/
    │   └── HomePage.tsx
    ├── App.tsx
    ├── index.css
    └── main.tsx

This structure separates responsibilities.

Layout components stay in `components/layout`.

Pages stay in `pages`.

Language configuration stays in `i18n`.

* * *

## Tailwind CSS

Tailwind CSS is a utility-first CSS framework.

Instead of writing many custom CSS classes in a separate file, Tailwind allows the developer to style elements directly with utility classes.

Example:

    <main className="mx-auto max-w-6xl px-6 py-10">

This means that visual decisions such as spacing, width, padding and layout can be written directly in the component.

The important idea is:

    Traditional CSS: create custom class names and write styles separately.
    Tailwind CSS: compose the design using existing utility classes.

Tailwind helps create a consistent design system without writing a lot of custom CSS.

* * *

## src/index.css

`index.css` is used for global styles.

In this lesson, it becomes the place where Tailwind is imported and where global page rules are defined.

Global styles are different from component styles because they affect the entire application.

Examples of global styles:

    box-sizing
    body margin
    root width
    font rendering
    background behavior

This file prepares the base visual behavior of the application.

* * *

## App.tsx

`App.tsx` becomes simpler in this lesson.

Instead of containing all the page structure directly, it delegates the layout and the page content to other components.

The idea is:

    App.tsx should organize the application.
    It should not contain every visual detail.

The flow becomes:

    App.tsx
        → AppLayout
            → HomePage

This is cleaner than placing the header, main content and footer all in one file.

* * *

## AppLayout.tsx

`AppLayout.tsx` is the main layout component.

A layout is a general page structure that wraps the content.

In this project, the layout includes:

    AppHeader
    main content
    AppFooter

The layout receives content through `children`.

This allows the same layout to be reused with different pages.

Conceptually:

    <AppLayout>
      <HomePage />
    </AppLayout>

The layout does not need to know exactly which page is inside. It only needs to render the shared structure around it.

* * *

## children and ReactNode

In React, `children` means the content placed inside a component.

Example:

    <AppLayout>
      <HomePage />
    </AppLayout>

In this example, `HomePage` is the child of `AppLayout`.

TypeScript needs to know what type of value `children` is.

That is why `ReactNode` is used.

`ReactNode` means that the component can receive valid React content, such as:

    Text
    JSX
    Components
    Fragments

This is important because TypeScript checks that the layout receives valid content.

* * *

## AppHeader.tsx

`AppHeader.tsx` represents the top section of the application.

The header usually contains the identity and navigation elements of a web application.

In Póika Store Web, the header contains:

    Store title
    Store subtitle
    Language switcher

The title and subtitle are not hardcoded directly. They are obtained through the translation system.

This means the header can change language dynamically.

Instead of writing:

    Póika Store

The component uses:

    translate('aplicacion.titulo')

That key is resolved using the current selected language.

* * *

## AppFooter.tsx

`AppFooter.tsx` represents the bottom section of the application.

The footer is also a reusable fragment.

It uses the translation system to display text dynamically.

This keeps the footer consistent with the selected language.

If the user changes the language, the footer text changes too.

* * *

## HomePage.tsx

`HomePage.tsx` represents the first page of the application.

A page component is different from a layout component.

A layout component defines shared structure.

A page component defines specific content for one screen.

In this lesson, `HomePage` displays the initial content of Póika Store Web.

It also uses the translation system for page text.

This creates the habit of not hardcoding user-facing text directly into the interface.

* * *

## i18n

`i18n` means internationalization.

Internationalization is the process of preparing an application so it can support multiple languages.

The word is written as `i18n` because there are 18 letters between the first `i` and the last `n` in “internationalization”.

In this project, i18n is implemented with TypeScript files.

Each language has its own file:

    es.ts
    en.ts
    fr.ts
    pt.ts
    ja.ts

Each file exports an object with message keys and translated values.

* * *

## Locale files

A locale file stores the text for one language.

Example concept:

    aplicacion.titulo → Póika Store
    plantilla.suTienda → Your online store
    index.nuestrosProductos → Our products

The key stays the same.

The value changes depending on the language.

This allows components to request a message by key instead of writing the final text directly.

The advantage is that the interface becomes easier to translate and maintain.

* * *

## Message keys

A message key is an identifier used to find a translated text.

Example:

    aplicacion.titulo

The component does not need to know the actual text in every language.

It only asks for the key.

Then the language system returns the correct value.

This creates a clear separation:

    Components control structure.
    Locale files control text.

This separation is important because a frontend application should not mix layout logic with translation content.

* * *

## src/i18n/index.ts

`index.ts` centralizes the language exports.

Instead of importing every locale file from many places, the project imports and organizes them in one file.

This file defines the available locales and exports useful TypeScript types.

Important concepts from this file:

    locales
    LocaleCode
    MessageKey
    Messages

`LocaleCode` represents the valid language codes.

Examples:

    es
    en
    fr
    pt
    ja

`MessageKey` represents the valid translation keys.

This is useful because TypeScript can help prevent using a translation key that does not exist.

* * *

## LanguageContext.tsx

`LanguageContext.tsx` controls the current language of the application.

React Context is a way to share information across many components without passing props manually through every level.

Without context, the language would need to be passed like this:

    App
        → AppLayout
            → AppHeader
                → LanguageSwitcher

With context, any component inside the provider can access the current language directly.

The context provides:

    locale
    setLocale
    translate

`locale` stores the current language.

`setLocale` changes the current language.

`translate` receives a message key and returns the translated text.

* * *

## LanguageProvider

`LanguageProvider` wraps the application and makes the language system available to all components inside it.

The provider is placed near the root of the application.

The flow is:

    main.tsx
        → LanguageProvider
            → App

This is important because `App`, `AppLayout`, `AppHeader`, `AppFooter`, `HomePage` and `LanguageSwitcher` can all access the language context.

* * *

## localStorage

`localStorage` is used to remember the selected language.

Without `localStorage`, the language would reset every time the user refreshes the page.

With `localStorage`, the application can save the selected language in the browser.

The flow is:

    User selects a language
        → setLocale updates the state
        → localStorage saves the selected value
        → page reload keeps the same language

This improves the user experience because the application remembers the user's preference.

* * *

## Browser language detection

The language system can also check the browser's preferred language.

For example, if the browser is configured in Spanish, the application can start in Spanish.

If the browser language is not supported, the application can use a fallback language.

In this project, the fallback language is Spanish.

The idea is:

    Use saved language if it exists.
    If not, use browser language if supported.
    If not, use Spanish.

This makes the application more flexible.

* * *

## useLanguage hook

`useLanguage` is a custom hook.

A custom hook is a reusable function that gives components access to shared logic.

In this project, `useLanguage` gives components access to:

    locale
    setLocale
    translate

This avoids repeating context logic in every component.

Instead of manually using the context every time, components can simply write:

    const { translate } = useLanguage()

This makes the code cleaner.

* * *

## LanguageSwitcher.tsx

`LanguageSwitcher.tsx` is the component that allows the user to change the language.

It displays the available languages and updates the selected locale when the user chooses a different option.

The language options include:

    Spanish
    English
    French
    Portuguese
    Japanese

The component uses the language context to read the current language and update it.

The flow is:

    User opens the language selector
        → User chooses a language
        → setLocale changes the locale
        → Context updates
        → Components render again
        → translate() returns text in the selected language

* * *

## Headless UI

Headless UI is used to create accessible interface components without forcing a specific visual design.

In this project, it is used for the language selector.

The important idea is:

    Headless UI provides behavior.
    Tailwind CSS provides styling.

This allows the project to create a custom-looking language selector while still using an accessible component structure.

* * *

## Heroicons

Heroicons provides SVG icons that work well with Tailwind CSS.

In this lesson, icons are used in the language switcher.

Icons help users understand the interface visually, but they should not replace text completely.

The language selector still shows language names, while icons support the interaction.

* * *

## Dynamic translation flow

The complete translation flow is:

    main.tsx
        → wraps App with LanguageProvider

    LanguageProvider
        → stores the selected locale
        → exposes translate()

    Component
        → calls translate('message.key')

    Locale file
        → returns the text for the current language

    User changes language
        → setLocale updates the state
        → React re-renders the interface
        → Text changes dynamically

This is the central concept of this lesson.

The interface is no longer static. It reacts to the selected language.

* * *

## Why this matters

This lesson creates the frontend foundation for a scalable application.

Without layout components, the project would duplicate header and footer code.

Without i18n, every text would be hardcoded in one language.

Without context, the selected language would be difficult to share across the application.

Without Tailwind, visual structure would require more custom CSS from the beginning.

The lesson teaches that frontend development is not only about what appears on screen.

It is also about organizing code so the application can grow.

* * *

## Useful commands

Install dependencies:

    npm install

Run the project locally:

    npm run dev

Build the project:

    npm run build

Run lint:

    npm run lint

Check Git status:

    git status

Add changes:

    git add .

Create a commit:

    git commit -m "feat: add layout fragments and dynamic language support"

Push changes:

    git push

* * *

## Commits from this lesson

The commits from this lesson should represent the creation of the layout and language system.

Possible commit ideas:

    chore: configure Tailwind CSS
    feat: add reusable layout components
    feat: add i18n language context
    feat: add dynamic language switcher

The exact commit names can vary, but the important part is that the work is separated clearly.

* * *

## Final summary

In this lesson, Póika Store Web moved from a basic React application to a more structured frontend project.

Reusable layout components were created to represent the header, footer and general page structure.

Tailwind CSS was configured and used to style the application through utility classes.

The project also added an i18n system with locale files, typed message keys, a language context, localStorage persistence and a dynamic language switcher.

This lesson prepares the frontend for future pages, categories, products and communication with the backend API.
