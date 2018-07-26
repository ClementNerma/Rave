# SilverNight

SilverNight is a statically-typed multi-platform language. It aims to provide a unique language to make desktop applications, websites, web applications, and so on.
It can be transpiled to JavaScript for the web, to Rust for thread-safe desktop applications and servers, to C++ for applications in need of speed, to Java for multi-platform software and to Swift for the iOS platform.

## Please note this language is not finished yet ; some features could and WILL be added, modified or removed without any warning and at anytime. This project is still a draft at this point and no feature or part of the syntax is frozen. For more informations, see the release model below.

## State of the project

Currently, the SilverNight programming language, as well as all its resources, including the books, tutorials, examples, build tools, toolchain, etc. are in a state of **draft**. This means no feature, part of the syntax, native resource or anything is frozen. The whole project can and will be modified without any delay, it is not suitable for everything else than an experimental use.

[The Hybrid Book](https://silvernight.netlify.com/docs/book/hybrid.html) as well as the build tools of the language were made to be maintanable and will certainly be re-used in the final version. Their purpose is to give a preview, while not finished, of what the language will be.

**Commit policy:** When an idea is added to the project, it is very shortly tested, then implemented in the repository, most of the time in The Hybrid Book. Sometimes it will simply be removed in a few hours or a few days because of a problem with it, like its unmaintanability in the long term. Major and breaking updates often occurs, as the language is not fully designed yet. Please keep this in mind.

## Release model

SilverNight is released using a system of **stages**:

| Stage no. | Release name | Version |                     Requirements for the next release                    |
|-----------|--------------|---------|--------------------------------------------------------------------------|
|     0     | Scratch      |    -    | First version of the syntax, redact The Hybrid Book                      |
|     1     | Alpha 1      |  0.1.0  | Second version of the syntax, redact again The Hybrid Book               |
|     2     | Alpha 2      |  0.2.0  | Redact the Specifications Book                                           |
|     3     | Alpha 3      |  0.3.0  | Submit the project to reviewers                                          |
|     3     | Beta         |  0.x.0  | Freeze the syntax, freeze the native library                             |
|     4     | Stable       |  1.0.0  | Make an analyzer (normalizer, lexer, parser, checker)                    |
|     5     | Analyzable   |  1.0.0  | Make a compiler, an interpreter, transpilers (JavaScript, ...)           |
|     6     | Prod-ready   |  1.0.0  |                                   -                                      |

Current stage is **Alpha 2**.

## Installation

The compiler isn't ready yet, so there is no way currently to install it.

Though, you can still clone this repository to access the documentation or the build tools, by doing:

```bash
git clone https://github.com/ClementNerma/SilverNight-draft.git # Download the repository
cd SilverNight # Go to the downloaded folder
yarn # Install dependencies
```

The repository's folder is now set up.

**Windows troubleshooting:** Due to known issues with some dependencies on Windows, you may have to install the build tools package in order to make the SilverNight build tools work, by running:

```bash
npm install --global --production windows-build-tools
```

In a terminal with Administrator privileges. Note that using `npm` is required because the package must be available globally.

### Build

Here are the build commands for the project (to run in the set-up repository folder):

```bash
yarn test           # Run the tests
yarn build-all      # Build everything
yarn build-test     # Run the tests for the build tools
yarn clean          # Clean build data
yarn build website  # Build the website locally
```

Some other commands are available in the [`package.json`](package.json) file, but these are the most common ones.

### Building live

To build some parts of the project each time a file changes in the folder, you can use the `build-dev-live` as follows:

```bash
yarn build-dev-live website
```

Where `website` can be replaced by any other module. If you want instead to build the whole project each time a file changes:

```bash
yarn build-dev-live
```

## Documentation

You can take a look at the language's syntax and its current state by reading [The Hybrid Book](https://silvernight.netlify.com/docs/book/hybrid.html).

To know how the toolchain works in a detailed view, and also get all the language's specifications, you can read [The Specifications Book](https://silvernight.netlify.com/docs/book/specs.html).

You can also get the book locally to read it at anytime by running `yarn read-book hybrid`. This way, you can read it without an access to the web.

## Syntax highlighting support

You can install an extension to grant support syntax highlighting to your favorite code editor.

*NOTE :* Only a few code editors are supported for now. You can list them with `yarn available-editors`.

*NOTE :* The current syntax highlighting file has been made for the _One Dark Pro_ theme, and may not work great on other themes. Still, a new version which solves this problem will be released soon.

Run the following commands in the repository's set up folder:

```bash
# First time only (must install with NPM)
[sudo] npm install --global vsce

# Install syntax highlighting support for a
yarn install-extension atom    # For Atom
yarn install-extension vscode  # For Visual Studio Code
yarn install-extension sublime # For Sublime Text
```

And follow the instructions that appears in your terminal.

## Contribute

You can contribute by [submitting bugs](https://github.com/ClementNerma/SilverNight-draft/issues) and helping me tracking them or by [proposing some improvements](https://github.com/ClementNerma/SilverNight-draft/issues) for the language.

You can also [contact me by e-mail](mailto:clement.nerma@gmail.com) if you want to talk about something not covered here or for major changes to the language/compiler/doc.

## License

This project is released under the [Apache 2.0 license](LICENSE.md) terms.

## Disclaimer

The software is provided "as is" and the author disclaims all warranties with regard to this software including all implied warranties of merchantability and fitness. In no event shall the author be liable for any special, direct, indirect, or consequential damages or any damages whatsoever resulting from loss of use, data or profits, whether in an action of contract, negligence or other tortious action, arising out of or in connection with the use or performance of this software.

## Credits

Thanks to [Netlify](https://netlify.com) for hosting the official website.