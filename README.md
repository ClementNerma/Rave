# SilverNight

SilverNight is a statically-typed multi-platform language. It aims to provide a unique language to make desktop applications, websites, web applications, and so on.
It can be transpiled to JavaScript for the web, to Rust for thread-safe desktop applications and servers, to C++ for applications in need of speed, to Java for multi-platform software and to Swift for the iOS platform.

## Please note this language is not finished yet ; some features could and WILL be added, modified or removed at anytime. It's still a draft at this point and no feature or syntax is frozen.

## State of the project

Currently, the SilverNight programming language, as well as all its resources, including the books, tutorials, examples, build tools, toolchain, etc. are in a state of **draft**. This means no feature, part of the syntax, native resource or anything is frozen. The whole project can and will be modified without any delay, it is not suitable for everything else than an experimental use.

[The Hybrid Book](https://silvernight.netlify.com/docs/book/hybrid.html) as well as the build tools of the language were made to be maintanable and will certainly be re-used in the final version. Their purpose is to give a preview, while not finished, of what the language will be.

**Commit policy:** When an idea is added to the project, it is very shortly tested, then implemented in the repository, most of the time in The Hybrid Book. Sometimes it will simply be removed in a few hours or a few days because of a problem with it, like its unmaintanability in the long term. Major and breaking updates often occurs, as the language is not fully designed yet. Please keep this in mind.

## Release model

SilverNight is released using a system of **stages**:

### Stage 0 (name: _Scratch_) _(from Feb 19, 2018)_

**State:** Beginning of the language design

**Goal:** Design the language from scratch

* Breaking syntax and concept updates are frequent
* Redaction of [The Hybrid Book](https://silvernight.netlify.com/docs/book/hybrid.html) (first version)

### Stage 1 (name: _Alpha_)

**State:** The syntax is mostly finished

**Goal:** Improve the language by submitting it to professional and beginner developers

* Development of the native library
* The language is submitted to reviewers (profesional developers, beginners, ...)
* Redaction of [The Hybrid Book](https://silvernight.netlify.com/docs/book/hybrid.html) (final version)

### Stage 2 (name: _Beta_)

**State:** The syntax is mostly finished

**Goal:** Freeze the language

* Redaction of the [The Book of Concepts](https://silvernight.netlify.com/docs/book/concepts.html)
* Freeze the language definitely
* Freeze the native library definitely

### Stage 3 (name: _Stable_)

**State:** The language is frozen
**Goal:** Make the language usable

* Development of the language's builder (normalizer, lexer, parser, checker)

### Stage 4

**State:** The language is usable
**Goal:** Make the language usable in all its forms

* Development of an interpreter
* Development of a compiler
* Development of transpilers (JavaScript, Java, ...)

## Installation

The compiler isn't ready yet, so there is no way currently to install it.

Though, you can still clone this repository to access the documentation or the build tools, by doing:

```bash
git clone https://github.com/ClementNerma/SilverNight-draft.git # Download the repository
cd SilverNight # Go to the downloaded folder
yarn # Install dependencies
```

The repository's folder is now set up.

**Troubleshooting:** Due to known issues with some dependencies, you may have to install the build tools package in order to make the SilverNight build tools work, by running:

```bash
npm install --global --production windows-build-tools
```

In a terminal with `sudo` / Administrator rights.

### Build

Here are the build commands for the project (to run in the set-up repository folder):

```bash
yarn test           # Run the tests
yarn build-all      # Build everything
yarn build-test     # Run the tests for the build tools
yarn clean          # Clean build data
yarn build website  # Build the website locally
yarn build-dev-live # Build everything, watch for modifications, serve locally
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

To know how the toolchain works in a detailed view, and also get all the language's specifications, you can read [The Book of Concepts](https://silvernight.netlify.com/docs/book/concepts.html).

You can also get the book locally to read it at anytime by running `yarn read-book hybrid`. This way, you can read it without an access to the web.

## Syntax highlighting support

You can install an extension to grant support syntax highlighting to your favorite code editor.

*NOTE :* Only a few code editors are supported for now. You can list them with `yarn available-editors`.

Run the following commands in the repository's set up folder:

```bash
yarn install-extension atom    # For Atom
yarn install-extension vscode  # For Visual Studio Code
yarn install-extension sublime # For Sublime Text
```

And follow the instructions that appears in your terminal.

## Roadmap

* Finish redacting [The Hybrid Book](https://silvernight.netlify.com/docs/book/hybrid.html) (**active**)
* Re-write [The Hybrid Book](https://silvernight.netlify.com/docs/book/hybrid.html) in a better way
* Redact [The Book of Concepts](https://silvernight.netlify.com/docs/book/concepts.html)
* Make an explicit grammar of the language
* Make a parser
* ...

## Contribute

You can contribute by [submitting bugs](https://github.com/ClementNerma/SilverNight-draft/issues) and helping me tracking them or by [proposing some improvements](https://github.com/ClementNerma/SilverNight-draft/issues) for the language.

You can also [contact me by e-mail](mailto:clement.nerma@gmail.com) if you want to talk about something not covered here or for major changes to the language/compiler/doc.

## License

This project is released under the [Apache 2.0 license](LICENSE.md) terms.

## Disclaimer

The software is provided "as is" and the author disclaims all warranties with regard to this software including all implied warranties of merchantability and fitness. In no event shall the author be liable for any special, direct, indirect, or consequential damages or any damages whatsoever resulting from loss of use, data or profits, whether in an action of contract, negligence or other tortious action, arising out of or in connection with the use or performance of this software.

## Credits

Thanks to [Netlify](https://netlify.com) for hosting the official website.