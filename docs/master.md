# The Master Book

## Foreword

Welcome to _The Master Book_, an exhaustive tutorial for the SilverNight programming language.

The SilverNight language has been created starting from a simple idea: today, if you want to write a low-level program, you have to develop it using a low-level language that will be complex. On a side, languages like C are easy to learn but hard to master, with many potential causes of errors at runtime ; while on the other side "safe" languages like Rust are more stable but heavier to use and even to learn. Besides, if you want to develop a web application, you will have to use JavaScript, which is a completely different language. And if you want to create an Android application, that's also another language. Mastering several rich languages like C, Java, JavaScript and Swift (for iOS) at once is difficult.

Besides, low-level languages have many downsides, like the requirement to type explicitly every single variable and constant. Also, they aren't safe, with many bugs being caused by their native features like the `NULL` pointer, references to any memory adress, or the very common undefined behavior. On Rust's side, we have a great safety that prevents such errors, but it's a lot more complicated to learn and master when you are not used to its specific concepts.

On the other side, higher-level languages such as JavaScript and Python allow a great flexibility. But they have many downsides too: variables can't be typed, so if a function wants to work with a string, it must manually perform a typecheck. Programs are far slower than with low-level languages. On JavaScript's side, there are other problems inherent to the fact it wasn't designed to be such a widely used language: the uncomfortable iteration methods, the symbols and objects properties checking using the `.hasOwnProperty` method to avoid encountering the native methods like `.__defineGetter__`, plus the many incompatibilities between browsers, lead to a language that is eventually complicated to handle.

This is where SilverNight comes. A given program can either be compiled to run natively on a given platform, turned into bytecode to run on any machine that already have the dedicated virtual machine installed, interpreted so there is no waiting time between the moment the source code is saved and its execution, transpiled to produce JavaScript code for the web or Swift code for iOS, and so it runs at the same time in a low-level context, in the browser, on mobile devices, on servers, and even on IoT platforms. In addition to this, its behavior is very clear and explicit, allowing to know exactly what happens when we use a specific feature. It is also designed to be as safe as possible, and most errors will be handled at compilation time. Even with runtime errors, it's far easier to debug errors than in most low-level languages, thanks to native error handling mechanisms.

Of course, the language has downsides itself: when being compiled, it isn't as fast as a well-written C program, isn't as safe as Rust when it comes to multi-threading or concurrency, isn't as flexible as dynamically-typed languages. But still, it has a simpler learning curve, is far faster to learn exhaustively, and can be used as a single language for many development contexts.

## Introduction

### An overview of the language

The SilverNight language is built around X key-concepts: safety, explicity, polyvalence, frontend libraries.

* _Safety_ because the language eliminates most errors at compilation time, so the risk of runtime errors are largely reduced ;
* _Explicity_ because when you use a concept, you always know exactly how it works and don't have surprises ;
* _Polyvalence_ because programs can either be compiled, ran in a VM, interpreted, or transpiled ;
* _Frontend libraries_ is a feature that allows to use context-dependant APIs, such as interacting with the touchscreen on mobile devices. It allows to use a single API whatever the platform is.

### Who is this language for?

Given the points above, the language is perfect for developers who want to:

* Unify applications development under a single programming language and API (thanks to frontend libraries) ;
* Get rid of low-level languages' complexitly/unsafety ;
* Get rid of high-level languages' lack of riguor ;
* Use a stable language with a very explicit behavior

Still, it may not be suited for:

* Very low-level programs - direct communication with hardware, direct memory management, drivers, ... ;
* Programs in which memory and threads safety is critical (not better than C or C++)

### Setting up environment

_This part will be achieved when the toolchain will be made available._

### Terminology

The _builder_ is the module that analyzes a source code to check if it's valid. It also makes a representation of the program before giving it to a _target module_ (compiler, transpiler, ...).

The _build time_ refers to the moment the source code is given to the builder. In a simplier way, it refers to the moment you compile, transpile etc. your code.

### Commenting your code

Programs can be commented using single-line comments:

```sn
// This is a single-line comment
```

For multi-lines comment, we use the following syntax:

```sn
/* This is
   a multi-line
   comment */
```

Comments can be written everywhere in a line and will simply be ignored at build time.