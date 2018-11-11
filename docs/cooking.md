# The Cooking Book

## Foreword

Welcome to _The Cooking Book_, an exhaustive tutorial for the toolchain of the Rave programming language. In order to understand this book, you should already have read [The Master Book](master.md), as well as knowing how to use the command-line program integrated to your operating system.

**WARNING:** Before starting to read this book, please remind that this is still a work in progress. This document is subject to major changes, and some features may be added / remade / removed at anytime. Besides, the language is not usable yet - it is not possible to compile or interpret it. This is only a preview document, presenting many of the language's aspects in order to get a global overview of its features.

**WARNING:** The toolchain does not work yet, and is not even installable at the moment this paragraph is redacted. All this book's content is only for demonstration purpose, and will not be testable for now. Besides, the website is not ready too and will lead to 404 errors.

## Installation

To run a Rave program, we need to use its _toolchain_, a suite of tools that analyzes, validates and turns the code into a runnable state - and more, as we will see through this book.

The program managing the toolchain is called Raven ; you can download it from [the official website](https://rave-lang.netlify.com/install). Download it, run the program and follow the instructions on your screen.

To ensure Raven is installed correctly, open a terminal and type:

```shell
raven -v
```

If it displays a version number, then Raven is successfully installed on your system!

All examples in this book will be given for the Linux platform, but they work the same way on Windows, Mac OS and other systems.