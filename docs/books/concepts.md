# The Book of Concepts

## Introduction

Welcome to the SilverNight's _Book of Concepts_. This book aims to provide a detailed view of how the language works, as well as the tools coming with it, and act as a specification document. This document presents many technical aspects and is NOT designed to be a tutorial.

If you are looking for a tutorial or the detailed functioning of the language, you should read [The Hybrid Book](https://silvernight.netlify.com/docs/book/hybrid.html) instead.

**WARNING: This book is still a draft, some features could be added, changed or removed completely AT ANY MOMENT until the final version of the language. Please be careful about this.**

## The toolchain

The SilverNight programming language is based on a toolchain, which is the set of modules that, used together, are able to convert a SilverNight source code to a source code from another language or to a machine code.

### A global overview

The toolchain is split into several modules, each with its own task. Some of them (like the builder) are themselves split into sub-modules (sometimes even more).

When dealing with a SilverNight source code, the toolchain will first convert it to an AST (standing for _Abstract Syntax Tree_) using the _builder_, and then check this AST and make a SRT (standing for _SilverNight Runnable Tree_) using the _checker_. Finally, after being optionally passed to the _optimizer_ to eliminate dead code and optimize the program, it will be gave to one of the _converters_: the compiler, the interpreter, or a transpiler.

_NOTE :_ All across this book, we will often use the _trusted_ term (mostly on source code transformations).

* A _syntaxically-trusted_ resource is guaranteed to have a valid syntax (no missing semi-colons, parenthesis matching, etc.)
* A _functionally-trusted_ resource means that is guaranteed to work under the right circumstances (no missing dependencies, no error due to a bug of the operating system, etc.) thanks to many checks performed on it (checking that functions aren't declared twice, type compatibility, template constraints, etc.). To be functionally-trusted, a resource needs to be syntaxically-trusted first (because a program with syntax error scannot work) ;
* An _untrusted_ resource is a resource that is not syntaxically-trusted (and so not functionally-trusted).

### Converting the source folder to an SST

The first module of the toolchain to run is the _adapter_. It handles characters encoding (`utf-8`...), line breaks (`\r\n` on Windows, `\r` on some old Mac systems, `\n` on Linux). If the source code is not a string (for example, a compressed package like we'll see later), it runs the _package handler_ to manage dependencies, uncompress source code, resolve links, etc.

The goal of this package is to get a SST for SilverNight Source Tree, which is a folder-like representation of the source code, in a little more complex way. It can handle packages management (including binary resources like images our sounds that come with some packages) or code split across several files.

### Converting the SST to an AST

The _builder_ is the second module of the toolchain to run. It converts a source tree to an _Abstract Syntax Tree_ (AST), which is a representation of the source codes that clearly indicates additions, block usages, call to functions, declaration of variables, etc.

It takes as an input an untrusted SST and delivers a syntaxically-trusted AST.

#### The tokenizer: SST to TST

The very first sub-module to work here is the _tokenizer_. It basically turns each part of the source code from the source tree into an array of tokens. Its goal is to structure the code, to indicate that here there is an integer, here there is a string, here there is a `func` keyword, etc.

It does not perform any check on the syntax except:

* Groups matching: opened parenthesis that aren't closed anywhere will throw an error ;
* Groups order: `({)}` will throw an error because the opened brace is not closed before the end of the parenthesis group ;
* Literals: strings that aren't closed anywhere, two points in a number, etc.

It does not treat binary files.

Its output is an untrusted TST (for Tokenized Source Tree).

#### The AST builder: TST to AST

The AST builder simply converts a TST into an AST.

It fully checks the syntax. If a semicolon is missing, if the `for` loop does not get the right head, or if a constant is declared without a value, it will throw an error.

Its output is a syntaxically-trusted AST.

### Converting the AST to an SRT

The _checker_ comes right after the builder. It has several goals represented as tasks done in the following order:

* Give a good representation of an AST by clearly listing entities like functions or variables, usage of blocks, macros, etc. ;
* Perform the four inferences (inferred typing, IST, ICT, inferred templating) ;
* Guarantee the proper functioning of the code

It takes as an input a syntaxically-trusted AST and delivers a functionally-trusted SRT.
