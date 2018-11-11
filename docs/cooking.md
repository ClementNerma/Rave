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

## Compiling

### What is compilation?

Before talking about the compiler itself, let's have a closer look on how the toolchain works.

The toolchain is split into several tools called _modules_. Each module has a specific purpose, and some are inter-connected. When we decide to build our program, we use the _builder_, which is itself a set of sub-modules.

When we decide to run our code, we have several options. One of them is to _compile_ the program, which means we turn the source code into a file we can run distinctly. Once it is done, we can remove the source files, share the program with other people, etc.

### How to compile?

First, let's create a file where we will store our source code. For that, start by creating an empty folder and a `main.rv` file inside it. Write the following code in it:

```rave
println!('Hello world!');
```

To compile this program, simply run the following command in a terminal (located in the same folder your file is in):

```shell
raven -c "main.rv"
```

If everything went fine, you should see no message at all. If you're on Windows, this creates a `main.exe` file, while on Linux it's a `main` file - this varies depending on the platform. These are the standard executable formats, and so we can run it directly. Now, let's try it:

```shell
chmod +x main # Allow the program to be ran on Linux
./main
```

You should see a "Hello world!" message appear in your terminal. If you send this file to a friend, for example, and if he's using the same operating system and processor architecture (e.g. x86, x86_64, ARM, ...) this program should work the same way on his machine.

This is one of the high points of compiling. The other one is that compiled programs are fast, really fast. When creating a 3D application, for instance, it's likely you will compile your program - or   use another build mode we will see a bit later.

Note that we can also rename our the executable:

```shell
raven -c "main.rv" -o my_super_executable

chmod +x my_super_executable
./my_super_executable
```

### Compiling for other targets

If you plan to share your programs to people who don't use the same operating system / processor architecture than you, you must provide them a compatible version. For that, you can pass additional arguments to the compiler to indicate the program's _target_ platform:

```shell
# Windows, most Intel and AMD processors, 32 bits
raven -c "main.rv" -s win -p x86

# Windows, most Intel and AMD processors, 64 bits
raven -c "main.rv" -s win -p x86_64

# Linux, 64-bit ARM processor
raven -c "main.rv" -s linux -p arm64
```

The `-s` option is a shortcut for `--system`, and `-p` for `--proc-arch` (processor architecture).

This will create three outputs files, called `main_win_x64.exe`, `main_win_x86_64.exe` and `main_linux_arm64`.