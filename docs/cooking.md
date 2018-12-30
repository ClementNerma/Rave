# The Cooking Book

## Foreword

Welcome to _The Cooking Book_, an exhaustive tutorial for the toolchain of the Rave programming language. In order to understand this book, you should already have read [The Master Book](master.md), as well as knowing how to use the command-line program integrated to your operating system.

**WARNING:** Before starting to read this book, please remind that this is still a work in progress. This document is subject to major changes, and some features may be added / remade / removed at anytime. Besides, the language is not usable yet - it is not possible to compile or interpret it. This is only a preview document, presenting many of the language's aspects in order to get a global overview of its features.

**WARNING:** The toolchain does not work yet, and is not even installable at the moment this paragraph is redacted. All this book's content is only for demonstration purpose, and will not be testable for now. Besides, the website is not ready too and will lead to 404 errors.

## Installation

To run a Rave program, we need to use its _toolchain_, a suite of tools that analyzes, validates and turns the code into a runnable state - and more, as we will see through this book.

The program managing the toolchain is called Raven ; you can download it from [the official website](https://rave-lang.netlify.com/install). Download it, run the program and follow the instructions on your screen.

You should be asked weither you want the minimal, customized or full installation. Because we will explore all of the toolchain's capabilities in this book, we will need all of it, so select the full installation. It may take a bit of time as it will download and install many different softwares on your machine, so let's get a cup of coffee during the wait ;)

Once install finishes, in order to ensure Raven is installed correctly, open a terminal and type:

```shell
raven -v
```

If it displays a version number, then Raven is successfully installed on your system!

### The toolchain's point

Through this book, we will take a large example to understand all of the toolchain's points. We consider being a developer/society who wants to make a 2D MMORPG. In order to target a large audience, we want to make a desktop application which runs on Windows, Mac OS and Linux ; a mobile application for Android and iOS ; and finally a web application to run the game inside the browser, as it is lightweight.

Because of the game being an MMO, we will also have to make a web server.

If we decided to make this program without Rave, the simplest, viable solution would be to make desktop applications using Java (as it is cross-plaform). The Android application would also be written in Java, with major changes though, because the structure of an Android application is different from a desktop one. The iOS application would be made in Swift and the web application in either in JavaScript or TypeScript. This makes, at least, 3 different languages.

Add to it the fact that each platform has its own API to handle network connections, visuals, touchscreen, etc., and that quickly becomes hard to develop and maintain. Also, if we wish to add a feature to our game, we may have to update the 4 applications at once.

We will see in this book how Rave with Raven can help us with this complex situation. The last chapter will be about building such an application and deploying it.

## Building programs

Rave programs can be built using Raven. There are a few different build methods, though, so let's start by the simplest one.

In order to understand how these work, start by creating an empty folder and putting inside a `main.rv` file containing the following code:

```rave
println!('Hello world!');
```

### Interpretation

_Interpretation_ is the act of interpreting a program, which means we simply read it from the beginning to the end, analyze it to ensure it doesn't contain any error, and then run it. This is the simplest, fastest method to run a program.

Here is the command:

```shell
raven -i main.rv
```

The main downside of interpretation is the performances: though they are largely comfortable to make most programs, they aren't suitable for intensive computing like scientific calculation or 3D games. Also, interpreted programs may take a bit time to start, especially for large ones.

Note that it's possible to improve performances on most programs using the `-f` flag:

```shell
raven -i main.rv -f
```

The program may take a bit more time to start, but it will run faster - especially if it is a bit large.

### Compilation

_Compilation_ consists in turning a program into _machine code_, which is the only format of code understood by computers. When a program is interpreted, it is converted on-the-fly to machine code, which is why performances aren't great.

With compilation, we produce machine code and store it inside a file. Then, anyone can run this file, with no wait time, and most importantly with greater performances. Here is how we compile a program:

```shell
raven -c main.rv
```

You should see a new file in your folder, called `main.exe` on Windows and `main` on Linux. If you try to run this file, you should see the message we wrote displayed in your terminal:

```shell
# Windows
./main.exe

# Linux
chmod +x main.rv # First time only - allows to run the program
./main
```

Note that programs can be optimized during compilation too. This will result in more performant programs but also in smaller output files.

### Transpiling

_Transpiling_ consists in turning a source from a language to another. In our example, it's converting Rave programs to other languages-programs.

This is especially useful when we want to build our application for the web. Currently, the only widely-supported programming language is JavaScript. The support of WebAssembly - a machine code-like format - is also increasing, but there's no support for real machine code.

It could be possible to interpret Rave programs on the web, but it would be incredibly slow, so we simply do transpiling.

This is also a good point when developing Android and iOS applications: as these platforms does not support real machine code, transpiling to their supported languages allow to make applications that will run on them.

Here is an example of transpiling, targetting JavaScript:

```shell
raven -t main.rv --lang js
```

For web applications, optimization is a good point as JavaScript applications do not have crazy performances:

```shell
raven -t main.rv --lang js -f
```

Transpiling to WebAssembly is a bit more difficult as we cannot run it directly in the browser - it requires at least a small JavaScript code that runs it. This can be done using the following command:

```shell
raven -t main.rv --lang wasm --wrapper webpage
```

The `--wrapper` argument with most transpiling targets ; it allows to create an output file that contains everything needed in order to run the program. You should now see a `main.html` file. If you try to run, and open the web developer console (in most browsers, this is done by pressing `Ctrl+Shift+J`), you should see a `Hello world!` message.

## Projects

A Raven project is simply a folder, following a specific structure, which contains Rave code. It allows to simplify development of applications by providing a direct way to manage assets, build, and a few more things.

To create a new project, simply write:

```shell
raven new my_project
```

You can replace `my_project` by any name (note that only lowercase letters, digits and underscores are allowed).

A you see a few questions. For now, press the `<Return>` key for each of them, to take the default value:

```plain
> Name of the project [my_project]:
> Description of the project []:
> Version of the project [0.1.0]:
> License of the project [MIT]:
> Author's name []:
> Author's email []:
> Create build rules now [no]:
> Default debug mode [interpret]:
> Default release mode [compile]:
> Import global registry [yes]:
```

**NOTE:** Existing folders can also be turned into projects:

```shell
raven new --here
```

The folder should now have this structure:

```plain
.
├── src/
│   ├── assets/
│   ├── target/
│   ├── tests/
│   └── main.rv
├── out/
│   ├── debug/
│   ├── release/
│   └── test/
├── packages/
├── project.toml
└── lockfile.toml
```

Here, the `src` folder contains our application's _source code_, which is made of Rave code, as well as its assets (in the `src/assets` folder), which are static data, like musics or images.

The `src/target` folder contains target-specific code. For instance, it may contain specific code for desktop applications.

The `src/test` folder contains test code, which is meant to ensure our application works as expected.

The `out` folder contains our built programs. Its `debug` sub-folder contains the "standard" builds, while `release` contains the fully-optimized, release-ready builds. Finally, `test` contains test builds - we will task about them later.

Finally, the `project.toml` file contains informations about our package - the ones we were asked about when creating the project.

We haven't talked about the `packages` folder and the `lockfile.toml` files yet ; we will see them in details later.

### Debug and release

By default, we can build our project using these two commands:

```shell
raven build debug # Debug build
raven build release # Release build
```

They create new files in the `out/debug` and the `out/release` directory, respectively. As you may expect, release builds take much time to build.

Builds can be ran just after creation by using the `--run` flag:

```shell
raven build debug --run # Hello world!
```

If you make a debug build of the program, you should not see any new file in `out/debug`. This is because, by default, the debug mode is set to "interpreted". And if you remember, the interpreter does not create any file before running our program.

If you make a release build, though, an executable file should be created in `out/release`, as the default release mode is set to "compiled".

### Build rules

A _build rule_ is a rule that describes how our program should be built. They aim to allow simplier handling of complex builds. For instance, in our video game project, we will have six different targets:

* Windows (desktop)
* Mac OS (desktop)
* Linux (desktop)
* Browsers (web)
* Android (mobile)
* iOS (mobile)

For that, we will make six build rules. Let's open our `project.toml` file. It should currently contain the following content:

```toml
[project]
name = 'my_project'
description = ''
version = '0.1.0'
license = 'MIT'

[build.debug]
method = 'interpret'

[build.release]
method = 'compile'
optimize = true
```

We can there see the two build rules we already used. We will now create six new rules, for our six targets. Let's start with desktop ones:

```toml
[build.windows]
method = 'compile'
platform = 'windows'
arch = 'x86-64'

[build.macos]
method = 'compile'
platform = 'macos'
arch = 'x86-64'

[build.linux]
method = 'compile'
platform = 'linux'
arch = 'x86-64'
```

For desktop, we use compilation, as it guarantees the best performances and the smallest programs. We have one rule per platform, targetting 64-bit x86 processors. Note that we could also target 32-bit processors if we want to, by making additional build rules targetting this time the `x86-32` architecture.

Here is the build rule for the web:

```toml
[build.web]
method = 'transpile'
language = 'webassembly'
wrapper = 'webpage'
```

Our code will be transpiled to WebAssembly, as it is has far better performances than JavaScript. Still, because we need to load the WebAssembly code using JavaScript, itself loaded from within an HTML page, and we don't care about this stuff, we simply use enable the `wrapper` option.

Next, let's make the build rule for Android:

```toml
[build.android]
method = 'transpile'
language = 'java'
wrapper = 'android'
```

This one transpiles our application into Java code, and then use the Android wrapper to make a ready-to-go Android application that can be installed on smartphones or published on the Play Store.

```toml
[build.ios]
method = 'transpile'
language = 'swift'
wrapper = 'ios'
```

This last build rule is for iOS devices: it transpiles our application into Swift code, and then use the iOS wrapper to make an iOS application.

To trigger a build rule, simply write:

```shell
raven build web # Debug mode
raven build web --release # Release mode

raven build web --run # Build in debug mode and run
raven build web --release --run # Build in release mode and run
```

## Packages

### Dependencies

In Rave, a _package_ is a project that is meant to be re-distributed in order to be used in various projects. For example, we could imagine a package that contains functions to make complex scientific calculations. Once we make it and it works, we can make it public so other developers can use it without having to re-develop the whole program.

Packages are distributed other Rave's website. You can look for the list of existing packages [here](https://rave-lang.netlify.com/packages).

A _dependency_ is a package the project relies on. We can add a new dependency this way:

```shell
raven add hello_world
```

This adds the `hello_world` package dependency to our project, and downloads it. You should now see a `hello_world` folder inside the `packages` one, containing the package itself.

### Usage

Packages can be used very simply, by using the `import` keyword:

```rave
// src/main.rv
import hello_world;
```

When we import a package, it transparently creates a new namespace containing it:

```rave
hello_world::greetings(); // Prints: 'Hello world!'
```

If the package has namespaces itself, we can access them too:

```rave
hello_world::messages::greetings = 'Hello everybody!';

hello_world::greetings(); // Prints: 'Hello everybody!'
```

We can also import only a specific namespace from the package:

```rave
import hello_world::messages;

println!(messages::greetings); // Prints: 'Hello everybody!'
```

It's even possible to import a namespace in the global scope:

```rave
// Import in the current scope
scope import hello_world::messages;

println!(greetings); // Prints: 'Hello everbody!'

// Import locally and then extract in the scope
import hello_world;

using hello_world::messages;

println!(greetings); // Prints: 'Hello everybody!'
```

### Re-usability

When downloading a project from the web, it usually doesn't have a `packages` folder. Dependencies can so be downloaded using the following command:

```shell
raven install
```

This behavior also allows to send the project to any collaborator without transmitting him the whole folder (which can be very large for some projects) ; he will simply have to run this command on its own machine and all dependencies will be downloaded at once.

### Versioning

Raven packages use [Semantic Versioning](https://semver.org/). Each package has its own version - remember when we were asked our project's version? It's all the same - the project's version _is_ the package's one.

Versions follow the `x.y.z`, where `x` is the major version, `y` the minor one, and `z` the patch one. To be simple, when `x` increases, the package is not backward-compatible with the previous `x` version. This means that, if you were relying on a given function for instance, it may not be available in this new major version.

Increasing `y` results in a new minor version, which adds new features without breaking backward-compatibility. Finally, increasing `z` creates a new patch version, which only fixes various problems like bugs.

By default, our project has the `0.1.0` version. The `0` major version is a one where minor versions are allowed to break backward-compatibility, but they are not allowed to be released as packages.

When adding or updating a dependency, an entry is added in `project.toml` describing the requested version. If you open it, you should now see a new section:

```toml
[dependencies]
hello_world = "^1.1.0"
```

Note that the version number may vary. Here, this indicates our project uses any version compatible with the `1.1.0` one, which means it allows both minor and patch updates, but not major ones.

Requested dependency versions can be one of the following:

* `1.1.0`: exactly the `1.1.0` version
* `>1.1.0`: any version strictly greater to `1.1.0`
* `>=1.1.0`: any version since `1.1.0`
* `<1.1.0`: any version strictly lower than `1.1.0`
* `<=1.1.0`: any version up to `1.1.0`
* `1.1.0 || 1.0.3`: either the `1.0.0` or the `1.0.3` version
* `latest`: only the latest version

Note that these rules can be mixed together, so it's possible to write `>1.0.0 <=1.0.4` for instance.

They are also a few convenient aliases:

* `^1.1.0`: allow minor and patch updates (any `1.y.z` version) ; equivalent to `>=1.1.0 <2.0.0`
* `~1.1.0`: allow patch updates (any `1.1.z` version) ; equivalent to `>=1.1.0 <1.2.0`
* `*`: allow any version ; equivalent to `>=1.0.0`

### Managing dependencies

Here is the list of commands to manage dependencies:

```shell
# Add a new dependency
raven add package1

# Add several dependencies at once
raven add package1 package2 package3

# Remove a dependency
raven del package1

# Remove several dependencies at once
raven del package1 package2 package3

# Update a dependency
raven update package1

# Update several dependencies at once
raven update package1 package2 package3

# Update all dependencies
raven update
```

### The lockfile

When adding a new dependency, the requested package's version is checked and written inside a _lockfile_, which is the `lockfile.toml` file at the project's root. If you open it, it may look like this:

```toml
[_registry]
url = "https://rave-lang.netlify.com/packages"
index = "index"
updated_versions = "versions/${package}/from/${version}"
list_versions = "versions/${package}/all"
last_version = "versions/${package}/last"
download = "${package}/${package}-${version}.tgz"

[hello_world."^1.1.0"]
version = "1.1.0"
hash = "90022d6d567912b80112a4e9cbc56832"
```

The first section contains the project's _registry_, which is basically a web platform that stores a set of packages. When we created our project, we were asked about importing the global registry, and the default option was `yes` - that's why this section is here.

When we added our package, it creates a new section, called `hello_world."^1.1.0"`. It contains description about the dependency: the downloaded version (as they may be various versions accepted by `^1.1.0`), as well as the dependency's hash, which is a string that allows to ensure the downloaded dependency hasn't been corrupted.

Now, you may ask: what is the purpose of this lockfile? Well, let's imagine we add a new dependency in version `1.3.4`, registered as any `^1.3.4` version. Then, we send the project to another collaborator a few days later. He performs a `raven install` which downloads this time the `1.3.5` version - a patch version has been released since we performed our own install. Problem, this new version introduce a bug that prevents the project from working correctly.

In such situations, it can be difficult to find the problem, and even when we will have found it, we will have to take care of changing our dependencies' versions to prevent the installation of this latest version.

The lockfile wipes these problems out: because it registers the installed versions, each collaborator is guaranteed to use the exact same versions as ours. If one wants, it's still possible to update dependencies to their latest version ; but then if a bug is introduced inside a dependency's new version, we will immediatly know from where it comes. Also, it will update the lockfile, and so it can be sent to other collaborators with the guarantee these updated dependencies work fine in our project.

## Frontend libraries

### The concept

Let's consider again our video game project: even though we will use a single language to deploy the application on all targeted platforms, we will still have to deal with the target languages' APIs - Java and Swift don't use the same APIs to communicate with the network, for instance.

This problem can be got rid of using _frontend libraries_. A frontend library is simply a package built inside Raven, which grants access to several features.

There are divided into three categories :

* The _Standard Frontend Libraries_ (SFL)
* The _Common Frontend Libraries_ (CFL)
* The _Exclusive Frontend Libraries_ (EFL)
* The _Language Frontend Libraries_ (LFL)

A frontend library, like its name indicates, is a library that exposes an API and transparently performs a linkage behind it. For instance, if we want to manipulate network connections, we can use the `network` CFL. The high point is that, weither we compile, interpret, or transpile our program, we will still use the exact same API. This allows to use a really single code for every platform!

### Standard Frontend Libraries

There is only one SFL: the standard library, also called STD. It contains basic types like `int` or `bool`, as well as native functions and flexs, and is automatically imported in every Rave program.

Whatever the build mode is, all programs are guaranteed to have a full access to all SFL.

### Common Frontend Libraries

The CFL are available for all compiled and interpreted programs, but may not be availabled when for transpiled one - it depends on the target language. For example, the `webpage` CFL, which allows to manipulate web pages, is not available in Swift because it isn't ran inside a web page. It's available on JavaScript, though, because JavaScript programs (usually) run on web pages.

Below is the list of all CFL.

#### Library: Random

The `random` is pretty simple: it allows to generate random values:

```rave
import random;

println!('10 random numbers:');

for n in 0..10 {
  print!(' ' + random::integer());
}
```

#### Library: Mathematics

The `maths` library exposes many types and functions useful for mathematics:

```rave
import maths;

// Create a linear system of equations
val matrix = new maths::Matrix(
  [  2, -1,  0 ],
  [ -1,  2, -1 ],
  [  0,  -1, 2 ]
);

// Solve it using the Gauss-Jordan elimination algorithm
println!(maths::solvers::gaussJordan(matrix).printable());
// [
//   [ 1, 0, 0 ],
//   [ 0, 1, 0 ],
//   [ 0, 0, 1 ]
// ]
```

#### Library: Assets

The `assets` library allows to access the program's asset - a concept we will see soon.

#### Library: Machine statistics

The `stats` library allows to get informations on the current machine: processor and memory usage, system's name, processor architecture, uptime, etc.

```rave
import stats;

println!('CPU usage = ' + stats::cpu.getUsage() + '%');

if stats::battery.check() as batteryStats {
  println!('Remaining battery = ' + batteryStats.getRemaining() + '%');
}
```

#### Library: Filesystem

The `fs` library, standing for _**F**ile**s**ystem_, allows to access the computer's disk and manage files on it. It allows to create, edit, remove files, folders, symbolic links and so on.

```rave
import fs;

try? fs::writeFile('hello.txt', 'Hello world!', 'utf8');
```

#### Library: Network

The `net` library, standing for _**Net**work_, manages network access such as accessing web pages, communicating with other computers, and so on.

```rave
import net;

if try net::fetch('https://www.google.fr') as buffer {
  try? fs::writeFile('hello.txt', buffer);
}
```

#### Library: Screen

The `screen` library manages access to the screen in order to display images, draw some figures, get the cursor's position, go fullscreen, etc.

```rave
import screen;

screen::on(screen::CURSOR_MOVE) { e ->
  println!('Mouse cursor moved: x = ${e.x} ; y = ${e.y}');
}
```

#### Library: Sound

The `sound` library allows to play sound on the system.

```rave
import fs;
import sound;

if try? fs::readFile('music.mp3') some music {
  val player = new sound::MediaPlayer(music);
  player.play();

  sync player.promiseEnd();
}
```

#### Library: Cryptography

The `crypto` library allows to encrypt and decrypt data, as well as handling encryption keys:

```rave
import crypto;

if try? fs::readFile('pub.key') some pubKeyBuff {
  val pubKey = crypto::keyFrom(pubKeyBuff, crypto::RSA);
  val encrypted = crypto::encrypt(new Buffer('Hello world!'), pubKey);

  println!(encrypted.toString('utf8'));
}
```

#### Library: Processes

The `pc` library, which stands for _**P**ro**c**esses_, allows to manage the processes. A process is basically a program running on the machine. The goal of having several processes is to improve performances by running some tasks in parallel as well as running other programs.

```rave
import pc;

val child = pc::spawn('echo', [ 'salut' ]);

child.stdout.on('data') { data ->
  println!('Child process printed: ' + data);
}

child.stderr.on('data') { data ->
  println!('Child process printed error: ' + data);
}

child.on('close') { code ->
  println!('Child process exited with code ${code}.');
}
```

#### Library: Threads

The `threads` library allows to manage our program's threads. A threads is, to simplify, several parts of the program that runs in parallel. This allows to improve greatly performances when it is well-performed, but also creates problems such as _data races_. We will study threads in a dedicated chapter.

Here is an example to compute the sum of an array using threads:

```rave
import threads;

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

if sync? pool.promise() some results {
  // results: uint[]
  println!(results.sum()); // Prints: '3000000'
}
```

#### Library: Console

The `console` library allows to print messages in the console, supports colored output, user inputs, etc.

```rave
import console;

if try? console::readInt('Input an integer: ') some input {
  console::println('${input} * 2 = ${input * 2}', console::Color.Cyan);
}
```

#### Library: Big numbers

The `bignums` library, which stands for _**Big** **Num**ber**s**_, allows to manipulate very large numbers with a high precision.

Indeed, native number types such as `u16` or `f32` has limited bounds as well as, for floating-point types, limited precision. Big numbers allow to get rid of these problems as we can specify arbitrary bounds and precision.

In addition to this, big numbers operations are inter-compatible, which means any big numbers can be added, substracted, divided by etc. another big number, without any precision lost.

The only downside to this is that operations on big numbers are far slower than on native number types, that's why they should be reserved to parts of applications where precision is really required.

Also, big number support operation with any native number type as the right operand, meaning it's possible to add, substract, etc. any number value to an existing big number.

```rave
import bignums;

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

#### Library: Shared libraries

The `sharedlibs` library allows to access external library files stored on the disk, such as `.dll` files on Windows and `.so` files on Linux:

```rave
import fs;
import sharedlibs;

// Describe the library's content
interface TheSharedLibrary {
  fn soMagicStuff (num: int) : int;
}

// Import it
if try? fs::readFile('my_super_shared_lib.dll') some sharedLibBuffer {
  if try? sharedlibs::instanciate<TheSharedLibrary>(sharedLibBuffer) some sharedLib {
    println!(sharedLib.soMagicStuff(2)); // Will print a number
  }
}
```

#### Library: Regular expressions

The `regexp` library, which stands for _**Reg**ular **Exp**ressions_, allow to manipulate PCRE regular expressions.

Note that the language contains a syntax sugar to build regular expressions:

```rave
import regexp;

// Traditional syntax
val expr = regexp::create("My name is ([a-zA-Z]+)\\!");
// Syntax sugar
val expr = /My name is ([a-zA-Z]+)\!/;

if 'My name is Jack'.match(expr) some vars {
  println!(vars[0]); // Prints: 'Jack'
}
```

#### Library: Times

The `times` library allows to manipulate date and time objects, as well as getting informations about system's time.

```rave
import times;

println!('Current date is: ' + times::clock.toString('m-d-y'));

val date = clone times::clock;
date.addDays(7);

println!('Date in a week is: ' + date.toString('m-d-y'));
```

It also grants some timing tools:

```rave
import times;

println!('Next message will appear in two seconds.');

sync times::promiseAfter(times::Second * 2u);

println!('Hello world!');
```

#### Library: System

The `system` library allows to make the computer sleep, hibernate, to power it off, etc.

```rave
import times;
import system;

println!('Your machine will be powered off in 60 seconds.');
println!('To cancel, stop this program now.');

times::runAfter(times::Minute * 60u) {
  println!('Turning your computer off...');
  system::powerOff();
}
```

#### Library: Notify

The `notify` library allows to create and manage simple and complex notification bubbles.

```rave
import times;
import notify;

val remaining = times::Second * 10u;
val notif = notify::create('Remaining time: 10 second(s)');

times::each(times::Second) { timer ->
  notif.setContent('Remaining time: ${-- remaining} second(s)');

  if not remaining {
    timer.cancel();
    notif.destroy();
  }
}
```

#### Library: XML

The `xml` library allows to parse XML strings and converts serializable values to XML:

```rave
import xml;

xml::serialize({
  name: 'Hello',
  hp: 100u
}); // Returns a string containing a valid XML document
```

#### Library: JSON

The `json` library allows to parse JSON strings and converts serializable values to JSON:

```rave
import json;

json::serialize({
  name: 'Hello',
  hp: 100u
}); // {name:'Hello',hp:100}
```

#### Library: YAML

The `json` library allows to parse JSON strings and converts serializable values to JSON:

```rave
import json;

json::serialize({
  name: 'Hello',
  hp: 100u
});
// name: 'Hello'
// hp: 100
```

#### Library: Zlib

The `zlib` library allows to manipulate GZip data:

```rave
import zlib;

if try? fs::readFileSync('archive.gz') some archiveBuffer {
  if try? gzip::inflateSync(archiveBuffer) some archive {
    println!('List of files:');

    for entry in archive.entries() {
      println!(entry) if entry.type == gzip::ItemType.File;
    }
  } else catch e {
    println!('Failed to uncompress the archive: ' + e.message);
  }
}
```

#### Library: Input

The `input` library allows to handle user inputs:

```rave
import input;

if input::getMouse() some mouse {
  mouse.on('click') { e ->
    println!('Mouse clicked at (x = ${e.x}, y = ${e.y}!');
  }
}

if input::getKeyboard() some keyboard {
  keyboard.on('keydown') { e ->
    println!('A key was pressed: ${e.keyName}');
  }
}
```

It can also be used to manage a touchscreen, if there is one:

```rave
if input::getTouchScreen() some touchScreen {
  touchScreen.on('press') { e ->
    println!('Finger 0 clicked at: x = ${e.fingers[0].x} ;' +
           'y = ${e.fingers[0].y} ; fingers = ${e.fingers}');
  }
}
```

### Exclusive Frontend Libraries

The _exclusive_ frontend libraries are libraries that are available only in specific build modes with specific parameters.

#### Library: DOM

The `dom` library, which stands for _**D**ocument **O**bject **M**odel_, allows to interact with JavaScript's DOM - this library when transpiling to JavaScript:

```rave
import dom;

if try? dom::document.querySelector('h1') some mainTitle {
  mainTitle.innerHTML = 'New title';
}
```

It is only available for programs transpiled to JavaScript either with the `webpage` option turned on, or with the `webpage` wrapper.

### Language Frontend Libraries

The _language_ frontend libraries are only available when transpiling to a specific language. There is one LFL per transpiling target language, which allows to access the language's native API.

Note that programs which use an LFL can only be transpiled to the provided language. This also means it's not possible to use two different LFL in the same program.

An example is the JavaScript LFL:

```rave
import javascript;

println!(javascript::Math.abs(-2)); // Prints in the console: '2'
```