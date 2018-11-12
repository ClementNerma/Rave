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

### The toolchain's point

Through this book, we will take a large example to understand all of the toolchain's points. We consider being a developer/society who wants to make a 2D MMORPG. In order to target a large audience, we want to make a desktop application which runs on Windows, Mac OS and Linux ; a mobile application for Android and iOS ; and finally a web application to run the game inside the browser, as it is lightweight.

Because of the game being an MMO, we will also have to make a web server.

If we decided to make this program without Rave, the simplest, viable solution would be to make desktop applications using Java (as it is cross-plaform). The Android application would also be written in Java, with major changes though, because the structure of an Android application is different from a desktop one. The iOS application would be made in Swift and the web application in either in JavaScript or TypeScript. This makes, at least, 3 different languages.

Add to it the fact that each platform has its own API to handle network connections, visuals, touchscreen, etc., and that quickly becomes hard to develop and maintain. Also, if we wish to add a feature to our game, we may have to update the 4 applications at once.

We will see in this book how Rave with Raven can help us with this complex situation. The last chapter will be about building such an application and deploying it.

## Compiling

### What is compilation?

Before talking about the compiler itself, let's have a closer look on how the toolchain works.

The toolchain is split into several tools called _modules_. Each module has a specific purpose, and some are inter-connected. When we decide to build our program, we use the _builder_, which is itself a set of sub-modules.

When we decide to run our code, we have several options. One of them is to _compile_ the program, which means we turn the source code into a file we can run distinctly. Once it is done, we can remove the source files, share the program with other people, etc.

For desktop applications, we will compile our source code in order to make it work for Windows, Mac OS and Linux at once. This way, we can get great performances without installing any additional tools like the Java runtime or anything else.

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

During the development of our application, we will interpret it to ensure it works as expected, without getting bored by any compilation time.

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

We will use transpiling to build the web version of our game.

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

Note that optimizing makes compilation slower, but increases greatly the program's execution speed as well as the output program's size.

We will use it when our program will be working fine, in order to improve its performances.

### The LLIC converter

The _LLIC converter_ is a module that turns any RVT into an _LLIC_ (_**L**ow-**L**evel **I**ntermediary **C**ode_). This is a special programming language designed to simplify conversion from Rave to binary programs.

### The compiler

The _compiler_, on its side, will turn any LLIC into an _OFT_ (_**O**utput **F**iles **T**ree_), which is an object representing all the output files (usually, it will contain a single file).

This OFT contains the output program in binary format, which is the format understood by the target platform and architecture.

### The output streamer

The _output streamer_, finally, takes any OFT and turn in into files on your hard drive.

## Frontend libraries

A key-concept of the toolchain is the _frontend libraries_. These are toolchain's built-in Rave libraries we can use for our programs. They are organized into three categories:

The **Standard Frontend Libraries** (_SFL_) are libraries that are supported in every context. Weither we are compiling, interpreting and so on, we are guaranteed to have them availalable

The **Core Frontend Libraries** (_CFL_), on their side, may not be available when programs are transpiled - this will depend on the target language. For example, if we transpile to JavaScript, we will not be able to access low-level memory management, as JavaScript does not support this. Still, some CFL may not work on some operating systems, like the multimedia library.

The **Exclusive Frontend Libraries** (_EFL_) are reserved to specific contexts and may not be available to interpreted programs, too. For example, the touchscreen EFL will be available only for touchscreen devices.

When we use a frontend library while transpiling, the transpiler binds the API of the library we use to the target languages' ones.

The main goal of these libraries is to guarantee that, for any subject having a frontend library, we will use a single API cross all platforms and languages.

Now, let's detail these libraries a bit.

### SFL: Standard library

The `std` library, which stands for _**St**an**d**ard Library_, is the only SFL. It contains definitions such as the primitive types (`void`, `bool`, `i32`, ...) as well as basic types (`Promise<X, Y>`, `Map<K, V>`, `Iterator<T>`, ...). All entities shown in [The Master Book](master.md) are part of it.

That's also the only library to be imported automatically in all programs:

```rave
// Nothing to import here

val cst: bool = true; // Works fine
```

### CFL: Machine statistics

The `stats` library allows to get informations on the current machine: processor and memory usage, system's name, processor architecture, uptime, etc.

```rave
import cfl::stats;

println!('CPU usage = ' + stats::cpu.getUsage() + '%');

if stats::battery.check() as batteryStats {
  println!('Remaining battery = ' + batteryStats.getRemaining() + '%');
}
```

### CFL: Filesystem

The `fs` library, standing for _**F**ile**s**ystem_, allows to access the computer's disk and manage files on it. It allows to create, edit, remove files, folders, symbolic links and so on.

To use a frontend library, we simply need to use an `import` statement in our program. Libraries are organized as namespaces, so we use them the same way:

```rave
import cfl::fs;

try? fs::writeFile('hello.txt', 'Hello world!', 'utf8');
```

### CFL: Network

The `net` library, standing for _**Net**work_, manages network access such as accessing web pages, communicating with other computers, and so on.

```rave
import cfl::net;

if try net::fetch('https://www.google.fr') as buffer {
  try? fs::writeFile('hello.txt', buffer);
}
```

### CFL: Screen

The `screen` library manages access to the screen in order to display images, draw some figures, get the cursor's position, go fullscreen, etc.

```rave
import cfl::screen;

screen::on(screen::CURSOR_MOVE, e => {
  println!('Mouse cursor moved: x = ${e.x} ; y = ${e.y}');
});
```

### CFL: Sound

The `sound` library allows to play sound on the system.

```rave
import cfl::fs;
import cfl::sound;

if try fs::readFile('music.mp3') as music {
  val player = new sound::MediaPlayer(music);
  player.play();

  sync player.promiseEnd();
}
```

### CFL: Cryptography

The `crypto` library allows to encrypt and decrypt data, as well as handling encryption keys:

```rave
import cfl::crypto;

if try fs::readFile('pub.key') as pubKeyBuff {
  val pubKey = crypto::keyFrom(pubKeyBuff, crypto::RSA);
  val encrypted = crypto::encrypt(new Buffer('Hello world!'), pubKey);

  println!(encrypted.toString('utf8'));
}
```

### CFL: Processes

The `pc` library, which stands for _**P**ro**c**esses_, allows to manage the processes. A process is basically a program running on the machine. The goal of having several processes is to improve performances by running some tasks in parallel as well as running other programs.

```rave
import cfl::pc;

val child = pc::spawn('echo', [ 'salut' ]);

child.stdout.on('data', data => println!('Child process printed: ' + data));

child.stderr.on('data', data => println!('Child process printed error: ' + data));

child.on('close', code => println!('Child process exited with code ${code}.'));
```

### CFL: Threads

The `threads` library allows to manage our program's threads. A threads is, to simplify, several parts of the program that runs in parallel. This allows to improve greatly performances when it is well-performed, but also creates problems such as _data races_. We will study threads in a dedicated chapter.

Here is an example to compute the sum of an array using threads:

```rave
import cfl::threads;

async fn sum<T impl Computable> (arr: T[], fromIndex: keyof arr, toIndex: keyof arr) : T {
  let sum = arr[0];

  for i = 1; i < toIndex.length; i ++ {
    sum += arr[i];
  }

  return sum;
}

val nums = (3u for i -> 0..1000000);
val pool = threads::createPool(4);

for i in 0..4 {
  pool.add(i, threads::createThread(() => nums(
    i as uint * 250000,
    (i as uint + 1) * 250000 - 1
  );
}

if try sync pool.promise() is results {
  // results: uint[]
  println!(results.sum()); // Prints: '3000000'
}
```

### CFL: Console

The `console` library allows to print messages in the console, supports colored output, user inputs, etc.

```rave
import cfl::console;

if try console::readInt('Input an integer: ') as input {
  console::println('${input} * 2 = ${input * 2}', console::Color.Cyan);
}
```

### CFL: Big numbers

The `bignums` library, which stands for _**Big** **Num**ber**s**_, allows to manipulate very large numbers with a high precision.

Indeed, native number types such as `u16` or `f32` has limited bounds as well as, for floating-point types, limited precision. Big numbers allow to get rid of these problems as we can specify arbitrary bounds and precision.

In addition to this, big numbers operations are inter-compatible, which means any big numbers can be added, substracted, divided by etc. another big number, without any precision lost.

The only downside to this is that operations on big numbers are far slower than on native number types, that's why they should be reserved to parts of applications where precision is really required.

Also, big number support operation with any native number type as the right operand, meaning it's possible to add, substract, etc. any number value to an existing big number.

```rave
import cfl::bignums;

val PRECISION   = 2S;
val LOWER_BOUND = new bignums::BigNumbers('-200000000000000');
val UPPER_BOUND = new bignums::BigNumbers('+200000000000000');

val num = new bignums::BigNumber('10.22', PRECISION, LOWER_BOUND, UPPER_BOUND);

println!(num); // Prints: '10.2'

num += 10; // Works fine

println!(num); // Prints: '20.2'

num += num; // Works fine

println!(num); // Prints: '40.4'
```

### CFL: Shared libraries

The `sharedlibs` library allows to access external library files stored on the disk, such as `.dll` files on Windows and `.so` files on Linux:

```rave
import cfl::fs;
import cfl::sharedlibs;

// Describe the library's content
interface TheSharedLibrary {
  fn soMagicStuff (num: int) : int;
}

// Import it
if try fs::readFile('my_super_shared_lib.dll') as sharedLibBuffer {
  if try sharedlibs::instanciate<TheSharedLibrary>(sharedLibBuffer) as sharedLib {
    println!(sharedLib.soMagicStuff(2)); // Will print a number
  }
}
```

### CFL: Regular expressions

The `regexp` library, which stands for _**Reg**ular **Exp**ressions_, allow to manipulate PCRE regular expressions.

Note that the language contains a syntax sugar to build regular expressions:

```rave
import cfl::regexp;

// Traditional syntax
val expr = regexp::create("My name is ([a-zA-Z]+)\\!");
// Syntax sugar
val expr = /My name is ([a-zA-Z]+)\!/;

if 'My name is Jack'.match(expr) as vars {
  println!(vars[0]); // Prints: 'Jack'
}
```

### CFL: Times

The `times` library allows to manipulate date and time objects, as well as getting informations about system's time.

```rave
import cfl::times;

println!('Current date is: ' + times::clock.toString('m-d-y'));

val date = clone times::clock;
date.addDays(7);

println!('Date in a week is: ' + date.toString('m-d-y'));
```

It also grants some timing tools:

```rave
import cfl::times;

println!('Next message will appear in two seconds.');

sync times::promiseAfter(times::Second * 2u);

println!('Hello world!');
```

### CFL: System

The `system` library allows to make the computer sleep, hibernate, to power it off, etc.

```rave
import cfl::times;
import cfl::system;

println!('Your machine will be powered off in 60 seconds.');
println!('To cancel, stop this program now.');

times::runAfter(times::Minute * 60u, () => {
  println!('Turning your computer off...');
  system::powerOff();
});
```

### CFL: Notify

The `notify` library allows to create and manage simple and complex notification bubbles.

```rave
import cfl::times;
import cfl::notify;

val remaining = times::Second * 10u;
val notif = notify::create('Remaining time: 10 second(s)');

times::each(times::Second, timer => {
  notif.setContent('Remaining time: ${-- remaining} second(s)');

  if not remaining {
    timer.cancel();
    notif.destroy();
  }
});
```

### CFL: XML

The `xml` library allows to parse XML strings and converts serializable values to XML:

```rave
import cfl::xml;

xml::serialize({
  name: 'Hello',
  hp: 100u
}); // Returns a string containing a valid XML document
```

### CFL: JSON

The `json` library allows to parse JSON strings and converts serializable values to JSON:

```rave
import cfl::json;

json::serialize({
  name: 'Hello',
  hp: 100u
}); // {name:'Hello',hp:100}
```

### CFL: YAML

The `json` library allows to parse JSON strings and converts serializable values to JSON:

```rave
import cfl::json;

json::serialize({
  name: 'Hello',
  hp: 100u
});
// name: 'Hello'
// hp: 100
```

### CFL: Zlib

The `zlib` library allows to manipulate GZip data:

```rave
import cfl::zlib;

if try fs::readFileSync('archive.gz') as archiveBuffer {
  if try gzip::inflateSync(archiveBuffer) as archive {
    println!('List of files:');

    for entry in archive.entries() {
      println!(entry) if entry.type == gzip::ItemType.File;
    }
  } else catch e {
    println!('Failed to uncompress the archive: ' + e.message);
  }
}
```

### EFL: Touch

The `touch` library allows to get input from touch screens:

```rave
import efl::touch;

touch::handle(e =>
  println!('Finger 0 clicked at: x = ${e.fingers[0].x} ;' +
           'y = ${e.fingers[0].y} ; fingers = ${e.fingers}')
);
```

### EFL: DOM

The `dom` library, which stands for _**D**ocument **O**bject **M**odel_, allows to interact with JavaScript's DOM - this library when transpiling to JavaScript:

```rave
import efl::dom;

if try dom::document.body?.querySelector('h1')? as mainTitle {
  mainTitle.innerHTML = 'New title';
}
```