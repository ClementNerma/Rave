# SilverNight

SilverNight is a statically-typed multi-platform language. It aims to provide a unique language to make desktop applications, websites, web applications, and so on.
It can be transpiled to JavaScript for the web, to Rust for thread-safe desktop applications and servers, to C++ for applications in need of speed, to Java for multi-platform software and to Swift for the iOS platform.

**Please note this language is not finished yet ; some features could be added, modified or removed at anytime. Be careful about this.**

## Installation

The compiler isn't ready yet, so there is no way currently to install it.

Though, you can still clone this repository to access the documentation or the build tools, by doing:

```bash
git clone https://github.com/ClementNerma/SilverNight.git # Download the repository
cd SilverNight # Go to the downloaded folder
yarn # Install dependencies
```

The repository's folder is now set up.

**NOTE :** Due to known issues with some dependencies, you may have to install the build tools package in order to make the SilverNight build tools work, by running:

```bash
npm install --global --production windows-build-tools
```

In a terminal with `sudo` / Administrator rights.

## Documentation

You can take a look at the language's syntax and its current state by reading [The Hybrid Book](https://silvernight.herokuapp.com/docs/book/hybrid.html).

You can also get the book locally to read it at anytime by running `yarn read-book hybrid`. This way, you can read it without an access to the web.

## Syntax highlighting support

You can install an extension to grant support syntax highlighting to your favorite code editor.

*NOTE :* Only a few code editors are supported for now. You can list them with `yarn available-editors`.

Run the following commands in the repository's set up folder:

```bash
yarn install-extension <editor>
```

And follow the instructions that appears in your terminal.

## Contribute

You can contribute by [submitting bugs](https://github.com/ClementNerma/SilverNight/issues) and helping me tracking them or by [proposing some improvements](https://github.com/ClementNerma/SilverNight/issues) for the language.

You can also [contact me by e-mail](mailto:clement.nerma@gmail.com) if you want to talk about something not covered here or for major changes to the language/compiler/doc.

## License

This project is released under the [Apache 2.0 license](LICENSE.md) terms.

## Disclaimer

The software is provided "as is" and the author disclaims all warranties with regard to this software including all implied warranties of merchantability and fitness. In no event shall the author be liable for any special, direct, indirect, or consequential damages or any damages whatsoever resulting from loss of use, data or profits, whether in an action of contract, negligence or other tortious action, arising out of or in connection with the use or performance of this software.
