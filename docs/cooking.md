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

### Interpreting

### What is interpretation?

Another way to run programs is to _interpret_ them. This simply consists in running the program as it is, without creating any additional file. This also means there is no file to share with other people.

The point of interpretation is to test quickly the code. Also, as the program is checked and ran at once, testing a small program is faster than by compiling it and then running it.

A big downside of interpretation though is that performances are a big step below compiled ones. That's why the interpreter is mostly design for test purposes.

### How to interpret?

Interpretation is much simpler than compilation:

```shell
raven -i "main.rv"
```

That's as simple as this.

### The meta mode

The **meta mode** is a special mode usable to debug interpreted programs. It simply consists in giving access to a global object named `Meta`, which allows to manipulate the program.

This object is useful for debugging ; given the following code:

```rave
class Hello {
  private secret: string;

  public fn %new (@secret) {}

  public fn printSecret () {
    println!(@secret);
  }
}

val obj = new Hello('This is my secret');
```

We can debug it this way:

```rave
Meta.structOf!(obj);
```

This will print the entity's name, its type as well as the structure of the `Hello` class (including private members).

We can also display its content using the following flex:

```rave
Meta.print!(obj);
```

This will print the value of all members of the object, including `secret`.

We can also access private members:

```rave
println!(Mave.accessPrivate!(obj, 'secret')); // Prints: 'This is my secret'
```

And there is a lot of other useful stuff.

To enable it, we must provide the `--meta` flag to the interpreter:

```shell
raven -i "main.rv" --meta
```

### Transpiling

### What is transpiling?

Programs can also be _transpiled_, meaning we turn a valid Rave source code into another language's valid source code, for instance JavaScript.

This allows to write a Rave application and use it on the Web, for example. As JavaScript is the only language currently directly available in web pages and in all browsers, we can simply _transpile_ our Rave programs into a valid JavaScript source code.

### How to transpile?

Transpiling works the following way:

```shell
raven -t "main.rv" -l javascript
```

This will produce a `main.js` file containing equivalent JavaScript source code. If you run it using [Node.js](https://nodejs.org/) or directly in the browser, it will print "Hello world!" in the console.

Here is the list of supported target languages:

* C++, for fast and low-level applications (intensive 3D applications, drivers, ...);
* JavaScript, for web applications;
* Java, for Android applications;
* Swift, for iOS applications

Note that the target language's native library can be accessed using _frontend libraries_, a concept we will see a bit later in this book.

## Toolchain in depth

We told previously the toolchain was build upon several modules. In fact, when we compile a program, for instance, it runs the following modules:

* Command-Line Interface (CLI);
* Builder
* | Normalizer
* | Lexer
* | Parser
* | Static analyzer
* | Linter (optional)
* | Optimizer (optional)
* LLIC converter
* Compiler
* Output streamer

That's a huge amount of modules. Let's detail them!

### The CLI

The _CLI_, standing for _**C**ommand-**L**ine **I**nterface_, is the program which parses command-line arguments and guess what you want to do. For example, when we run the following command:

```shell
raven -c "main.rv"
```

The `raven` command calls the CLI, which sees we have a `-c` option, so it knows we want to compile a program. Then, it looks at the provided filename, `main.rv`. Without even checking if the file exists, it calls the builder and indicate it the program will be compiled and the source code file is called `main.rv`.

### The builder

The builder, on its side, is a set of sub-modules.

First, there is the _normalizer_, which reads the required file on the disk and use the line break symbol everywhere (the line break symbol is not the same on all operating systems), organizes folders, etc. It produces a _NSC_ (_**N**ormalized **S**ource **C**ode_), which is a simple string. If the source files are not found, it reports an error.

The _lexer_ will, from a NSC, analyze the program to detect keywords, literals, etc. It detect only a few syntax errors (like unterminated strings). If no error is detected, it produces a _LIT_ (_**L**exed **I**ntermediate **T**ree_).

The _parser_ takes this LIT and analyze it by looking for blocks, declaration statements, numeric operations, etc. It detects and reports all syntax errors. If no error is detected, it produces an _AST_ (_**A**bstract **S**yntax **T**ree_). An AST is guaranteed to represent a syntax error-free program.

The _static analyzer_, then, analyzes an AST's logic by verifying the right types are used, that there is not two entities with the same name, that child classes implement all the abstract methods described by their direct mother class, and so on. If no error is detected, it produces an RVT (_**R**ave **V**alid **T**ree_), which is guaranteed to represent a fully-valid program.

#### The linter

The builder then returns to the CLI. If the `--lint` flag was specified, the CLI will call the builder's _linter_, which simply checks for code conventions (for example, `let   hello: string;` will produce a warning because of there are more than one space between the `let` keyword and the mutable's name). Note that, at the opposite of the other modules, a linter will never report an error, only warnings.

#### The optimizer

The same goes for the optimizer, which is ran using the `--optimize` flag ; it analyzes a given RVT and optimizes it by applying a bunch of optimization rules on it. For example, the `let i = 2; i += 3;` code will be reduced to `let i = 5;`, because it does exactly the same thing.

Note that optimizing makes compilation slower, but increases greatly the program's execution speed.

### The LLIC converter

The _LLIC converter_ is a module that turns any RVT into an _LLIC_ (_**L**ow-**L**evel **I**ntermediary **C**ode_). This is a special programming language designed to simplify conversion from Rave to binary programs.

### The compiler

The _compiler_, on its side, will turn any LLIC into an _OFT_ (_**O**utput **F**iles **T**ree_), which is an object representing all the output files (usually, it will contain a single file).

This OFT contains the output program in binary format, which is the format understood by the target platform and architecture.

### The output streamer

The _output streamer_, finally, takes any OFT and turn in into files on your hard drive.