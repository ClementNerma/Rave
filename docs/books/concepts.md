# The Book of Concepts

## Introduction

Welcome to the SilverNight's _Book of Concepts_. This book aims to provide a detailed view of how the language works, as well as the tools coming with it, and act as a specification document. This document presents many technical aspects and is NOT designed to be a tutorial.

If you are looking for a tutorial or the detailed functioning of the language, you should read [The Hybrid Book](https://silvernight.netlify.com/docs/book/hybrid.html) instead.

**WARNING: This book is still a draft, some features could be added, changed or removed completely AT ANY MOMENT until the final version of the language. Please be careful about this.**

## The toolchain

The SilverNight programming language is based on a toolchain, which is the set of modules that, used together, are able to convert a SilverNight source code to a source code from another language or to a machine code.

_NOTE :_ In order to fully understand this part, you should already know how SilverNight works (especially for packages). Explanations on it can be found in [The Hybrid Book](https://silvernight.netlify.com/docs/book/hybrid.html).

### A global overview

The toolchain is split into several modules, each with its own task. Some of them (like the builder) are themselves split into sub-modules (sometimes even more).

When dealing with a SilverNight source code, the toolchain will first convert it to an AST (standing for _Abstract Syntax Tree_) using the _builder_, and then check this AST and make a SRT (standing for _SilverNight Runnable Tree_) using the _checker_. Finally, after being optionally passed to the _optimizer_ to eliminate dead code and optimize the program, it will be gave to one of the _converters_: the compiler, the interpreter, or a transpiler.

_NOTE :_ All across this book, we will often use the _trusted_ term (mostly on source code transformations).

* A _syntaxically-trusted_ resource is guaranteed to have a valid syntax (no missing semi-colons, parenthesis matching, etc.)
* A _functionally-trusted_ resource means that is guaranteed to work under the right circumstances (no missing dependencies, no error due to a bug of the operating system, etc.) thanks to many checks performed on it (checking that functions aren't declared twice, type compatibility, template constraints, etc.). To be functionally-trusted, a resource needs to be syntaxically-trusted first (because a program with syntax error scannot work) ;
* An _untrusted_ resource is a resource that is not syntaxically-trusted (and so not functionally-trusted).

### The adapter

The first module of the toolchain to run is the _adapter_. It handles characters encoding (`utf-8`...), line breaks (`\r\n` on Windows, `\r` on some old Mac systems, `\n` on Linux). If the source code is not a string (for example, a compressed package like we'll see later), it runs the _package handler_ to manage dependencies, uncompress source code, resolve links, etc.

The goal of this package is to get a SST for SilverNight Source Tree, which is a folder-like representation of the source code, in a little more complex way. It can handle packages management (including binary resources like images our sounds that come with some packages) or code split across several files.

**Reminder :** It takes as an input an unstrusted source folder and delivers an unstrusted SST.

### The builder

The _builder_ is the second module of the toolchain to run. It converts a source tree to an _Abstract Syntax Tree_ (AST), which is a representation of the source codes that clearly indicates additions, block usages, call to functions, declaration of variables, etc.

**Reminder :** It takes as an input an unstructed SST and delivers a syntaxically-trusted AST.

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

### The checker

The _checker_ comes right after the builder. It has several goals represented as tasks done in the following order:

* Give a good representation of an AST by clearly listing entities like functions or variables, usage of blocks, macros, etc. ;
* Perform the four inferences (inferred typing, IST, ICT, inferred templating) ;
* Guarantee the proper functioning of the code

**Reminder :** It takes as an input a syntaxically-trusted AST and delivers a functionally-trusted SRT.

### The compiler

The compiler first converst the SRT to LLIC (low-level intermediary code), which is a special representation of the SRT that is a lot simplifer for the machine but not human-friendly. For example, it does not implement the concept of class and does not support `for` loops.

The goal of LLIC is to make a low-level representation that can be converted to the assembly language, which is a translation of binary (which is our final machine code) that can be ran directly on the machine, with the best performances.

Altough, this step requires the compiled program to run on the operating system **and** platform it was compiled for. For example, a program compiled for Windows will not runnable on Linux. Also, a program compiled for x86 CPU on Linux won't work on ARM CPU like a Raspberry Pi, even if it runs Linux.

Hopefully, it's still possible to compile a program for Windows from a Linux system. And that's where LLIC is especially useful, not only for the persons who work on the compiler, but also for the final user: when compiling a program to, let's say, seven targets (x86 and x64 versions of Windows, Linux and Mac OS, plus ARM for Linux), the first part of the compilation, which is the most heavy (converting a SRT to LLIC) will be done only once. For each platform, the compiler will simply have to convert LLIC to a machine code designed for the target (like x64 Windows), so it saves a lot of times when deploying an heavy project on several platforms.

### The interpreter

**THIS IS A THEORICAL PART. The interpreter is not fully designed yet, and it could be completely re-designed (like interpreting SRT using a JIT compiler or some things). Also, the execution speed written in this part are predicted, as they _should_ be like precised here, but this is not a commitment.**

The interpreter simply runs the SRT without compiling it, and that on any platform. This does not require to wait for a compilation each time a modification is made on the source code, and removes platform-dependent problems, but comes with two important downsides.

First, interpreted SRTs are slow. They are not _extremly_ slow, but clearly slower than compiled programs. They are enough to run a multi-threaded web server, though. To get a comparison point, it runs faster than Node.js programs.

Secondly, the toolchain needs to be installed on the platform we run the SRT on (because the interpreter is, like all modules, dependent on the toolchain to convert for example the source code to a SRT). Even if the toolchain supports many platforms, even ARM processors, this can be a downside when deploying applications because the final user will need the SilverNight toolchain.

### The transpilers

A _transpiler_ is a toolchain's module that converts the SRT provided by the checker/optimizer to a source code in another language. For example, a transpiler could convert an SRT to a valid JavaScript source code.

Transpilers are a great tool to make multi-platform applications. For example, when designing a MMORPG game, we could imagine deploying on desktop thanks to the compiler targeting several platforms (x86, x64 and ARM versions of most known operating systems), to the web using JavaScript and WebAssembly transpilers (in order to get great performances), to Android devices thanks to a Java transpiler and to iOS devices with a Swift compiler.

This way, the application could be written in a single language, instead of five in our example (if we take C++ for desktops, JavaScript and WebAssembly on the web, Java on Android and Swift on iOS).

Another high point of transpiling is the libraries compatibility: you will always deal with the same, let's say, encryption or WebSockets API on all platforms, which is great.

The main downside of transpiling is that the SilverNight source code will, in most cases, need to be adapted to the target language's native library. Some are automatically done (`uint32` are automatically handled as `uint32_t` in C, etc.) but not everything. For example, SilverNight does not come with a manual memory management API like many low-level languages, except the `free!` macro. Because of that, the source code will need to adapt to the target language by importing the language-specific package provided by the transpiler, in order to use the language's native library.

This point is also true for libraries: if a library does not implement some important adaptations to the target language (like a WebSockets API that doesn't implement manual memory management for C), your program will encounter troubles. Libraries are in fact the very main downside of transpiling.

Note that there is a directive to run instructions for specific language targets without making a new file each time for each platform. This way, writing code blocks for C or Java only is very simple to do and keep the code clear and maintanable.

### Package archives

In SilverNight, packages are folders that come with at least a _package file_, named `package.toml`, and a main source file (written in SilverNight) that exports its data.

Packages can bundle dependencies to load other libraries, but not only: they can also include some binary resources, like imagines or sound. Packages made to act as dependencies (they are called _libraries_) usually don't come with it. But a package is not forced to act as a dependency, and so it can sometimes have to include binary files.

Let's take the example of a video game. The package is the folder that contains our game's source files, so it has a `package.toml` file. This file indicates it relies on some libraries (other packages), but also that it relies on locally-stored binary files (music, sprites, cinematics...).

A problem in such projects is when deploying the project to the web to be build by final users on their platform. This requires to download a whole folder, go into it from a terminal and run the build command, and build - which is long when building large projects.

That's where come two high points of packages: package archives, and pre-parsing.

Package archives are simply the concept of reducing a whole folder to a single file. This file contains the binary resources as well as the package's source code. The all is usually compressed to reduce its size, and contains a hash table to check the safety of each file. This last point is useful when sending a package archive of several hundreds megabytes, or even gigabytes, to another person, and a single file in the archive is corrupted while sending it. Thanks to the hash table, the corrupted file is detected, and so only this file will have to be retrieved by the receiver, instead of the whole archive. This way, when someone will get the package archive, it will simply have to open a terminal and type the build command. Uncompressing, hash checking, and other steps will be automatically performed.

Pre-parsing is another concept that consists in making an AST right from the source code and writing it to a file, it is usually triggered when making a package archive. In our video game example, when making the archive, each file will get its own AST representation. What's the point? When someone will build the project from its package archive, the parsing (which is the concept converting a source code to an AST) will not have to be performed, which saves a lot of time. Also, even when a single file is modified, this concept is still useful: because an AST is made for each individual file, only this one will need to have an AST made again. The toolchain automatically detects changes using the package archive's hash table, which lists the hash of each file - so it will change if the file is modified.

Also, pre-parsing allow to remove the source code from the package archive, in order to reduce its size even more. If a developer then gets the package archive, he will still be able to work on the source code because ASTs are reversable: the toolchain supports converting an AST to a source code (this also works for any SRT or TST).

## Basic concepts

### Entities

In SilverNight, an _entity_, also called _resource_, is either a _value_, a _descriptor_ or a _container_.

Values are representation of data. For example, plain numbers or strings are values, but arrays are too.
Descriptors are simply descriptors of a model of data, like interfaces, classes or structures.
Containers, they, are entities that contain a data, like variables or constants. They are also called _assignable entities_.

An _entity name_ is a suite of symbols that can be used to define the name of an entity. The regular expression that validates an entity name is `[a-zA-Z_\$][a-zA-Z0-9_\$]*`.

### Operators

Operators are special symbols that can't be part of an entity name, like `+` or `*`. There are several types of operators we will see later.

### Literals

Literals, also called plain values, are values that can be evaluated whatever the platform the program is running on. These are plain strings (`"Hello world"`), plain numbers (`28.5`), or plain booleans (`true`).

### Keywords

Keywords are single words that describes something in the code. They are reserved and can't be used as names for other entities.

## Mutability

### Mutables

There are four types of assignable entities: variables (also called mutables), constants, plain constants, and frozens.
Every assignable entity have a _type_, which describes the type of data it can be. A type can be any descriptor, but it mainly refers to classes.

They are defined using a keyword. Variables can either have a type, an initialization value, or both.

```sn
// Type only
let mutable: int;

// Initialization value only
let mutable = 5;

// Both
let mutable: int = 5;
```

Because assignable entities always have a type, the second line will use _type inference_ to guess the variable's type. Here, it will use the `int` type for the variable.

### Constants

Constants must have an initialization value, with an optional type thanks to type inference. Here is how they go:

```sn
// Initialization value only
val constant = 5;

// Both
val constant: int = 5;
```

Because constants can't have their value changing after their initialization, they must have one straight from when they are declared.

### Plain constants

Plain constants are like constants, but they only accept literals:

```sn
// Initialization value only
pln plain = 5;

// Both
pln plain: int = 5;

// ERROR
pln plain: int = constant;
```

They aim to provide a way to optimize the program at compilation time, because here `plain` will always be equivalent to the `5` literal, whatever happens.

### Plain constants

The last type of assignable entities is the frozen, which is basically a constant with deep freeze (we will see the concept later). They are defined the same way than constants:

```sn
// Initialization value only
frozen constant = 5;

// Both
frozen constant: int = 5;
```

### Expressions

An expression is a group of symbols that produces a result. For example, `2 + 8 * (7 / constant)` produces a result, so it's an expression.

## Literals

### Booleans

Literal booleans can either be `true` or `false`.

### Numbers

Literal numbers are a suite of digits from 0 to 9 as well as the `_` symbol which acts as a separator - it is simply ignored -. Only the first symbol must be a digit from 1 to 9.
They can eventually be followed by a point `(.)` and another number. In this last case, the literal number is considered as a _floating-point number_, else as an _integer number_. Integers automatically have the `int` type, and floating-point number the `double` type.

For example, `28` is considered as an integer.

#### Alternative bases

Literal numbers can also be expressed using alternative bases, using the `0` prefix.

| Syntax |       Base       | Decimal value |
|--------|------------------|---------------|
| `0b11` | 2 (binary)       | 3             |
| `0o75` | 8 (octal)        | 61            |
| `0d15` | 10 (decimal)     | 15            |
| `0xB5` | 16 (hexadecimal) | 181           |

#### Number types

Here is the list of **integer** types:

|    Type   |            Minimum           |            Maximum           |
|-----------|------------------------------|------------------------------|
| `int8`    | `-128`                       | `127`                        |
| `uint8`   | `0`                          | `255`                        |
| `int16`   | `-32,768`                    | `32,767`                     |
| `uint16`  | `0`                          | `65,535`                     |
| `int32`   | `−2,147,483,648`             | `2,147,483,647`              |
| `uint32`  | `0`                          | `4,294,967,295`              |
| `int64`*  | `-9,223,372,036,854,775,808` | `9,223,372,036,854,775,807`  |
| `uint64`* | `0`                          | `18,446,744,073,709,551,615` |

There are also two **floating-point** types:

* `float` handles from `~ 1.2 * 10^-38` to `~ 3.4 * 10^+38` with a 6-decimal precision ;
* `double` handles from `~ 2.3 * 10^-308` to `~ 1.7 * 10^+308` with a 15-decimal precision.

These last types work with a single integer digit, a decimal part and an exponent. For example, `12.8` will be represented in a `float` as `1.28 * 10^1`. This is why, when dealing with numbers that have a large amount of digits, some may be lost because of the limited precision of these types.

#### Overflow and underflow

When an operation exceeds the type's capacity, it _overflows_ and goes back to its minimum value to continue the operation. When the value goes below the type's minimum value, it _underflows_ and goes back to its maximum to continue.

For instance, adding `1` to a `int16` equal to `32767` will give `0`, because it overflow. At the opposite, substracting `1` to a `uint8` equal to `0` will give `255`, because it underflows.

**NOTE :** Overflows and underflows don't stop operation. Adding `5` to a `int16` equal to `125` will give `-126` and not `-128`.

### Strings

Literal strings are delimited by simple `(')` or double `(")` quotes. They are single-line and can use the `(\)` symbol to escape any character. They are usually represented in memory as a list of bytes.

#### Templated strings

Templated strings are special strings delimited by backquotes ``(`)`` and can use string templates using `${...}` where `...` is an expression. The result of the expression is automatically converted to a string and put as a replacement for the template. For example, ```2 + 2 = ${2 + 2}``` will be evaluated as ```2 + 2 = 4``` because the result of the `2 + 2` expression, which is `4`, can natively be converted to a string.

**NOTE :** If the expression cannot be converted to a string, or it's not an expression (like `2 +` is not an expression), an error will be thrown.