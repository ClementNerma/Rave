# The Master Book

## Foreword

Welcome to _The Master Book_, an exhaustive tutorial for the SilverNight programming language.

The SilverNight language has been created starting from a simple idea: today, if you want to write a low-level program, you have to develop it using a low-level language that will be complex. On a side, languages like C are easy to learn but hard to master, with many potential causes of errors at runtime ; while on the other side "safe" languages like Rust are more stable but heavier to use and even to learn. Besides, if you want to develop a web application, you will have to use JavaScript, which is a completely different language. And if you want to create an Android application, that's also another language. Mastering several rich languages like C, Java, JavaScript and Swift (for iOS) at once is difficult.

Besides, low-level languages have many downsides, like the requirement to type explicitly every single entity and constant. Also, they aren't safe, with many bugs being caused by their native features like the `NULL` pointer, references to any memory adress, or the very common undefined behavior. On Rust's side, we have a great safety that prevents such errors, but it's a lot more complicated to learn and master when you are not used to its specific concepts.

On the other side, higher-level languages such as JavaScript and Python allow a great flexibility. But they have many downsides too: entities can't be typed, so if a function wants to work with a string, it must manually perform a typecheck. Programs are far slower than with low-level languages. On JavaScript's side, there are other problems inherent to the fact it wasn't designed to be such a widely used language: the uncomfortable iteration methods, the symbols and objects properties checking using the `.hasOwnProperty` method to avoid encountering the native methods like `.__defineGetter__`, plus the many incompatibilities between browsers, lead to a language that is eventually complicated to handle.

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

## Entities and types

To illustrate what an entity is, think it as crate. The crate contains something, whatever it is, and has a label to indicate its owner. In our case, the entity is the crate, the thing it contains is its value, and the crate's label is its name. In addition to this, an entity has a _type_ which indicates what type of values it can store.

### Mutables

There are several types of entities: the first ones are mutables. Their value may change during program execution. They are defined using the `let` keyword:

```sn
let mutable = 2;
```

Here, our entity is _initialized_ with value `2`, which means it will contain this value as soon as it is declared. The action to set the entity's content is called an _assignment_ (we _assign_ a value to the entity).

You may notice we haven't written the entity's type. In fact, the builder _infers_ its type, meaning it guesses it from the value we assign. `2` is an `int` value, so the entity will be of type `int` too.

We can also indicate the entity's type explicitly:

```sn
let mutable: int = 2;
```

We can then change its value by assigning another:

```sn
let mutable: int = 2;

mutable = 3;
```

Note that, after an entity is declared, its type is fixed and won't change. It also won't accept values that are not of the same type. For example, assigning a `string` value to an `int` entity results in an error.

```sn
let mutable: int = 2;

mutable = 'Hello'; // ERROR
```

It is also possible to declare an entity without an initialization value, but its type will be required:

```sn
let mutable: int;
```

This syntax is only to use in specific cases we'll see later. Indeed, not initializing an entity results in an error if we try to access it before it is initialized.

### Constants

Constants are another type of entity. They work like mutables, except their value can't change after their declaration. This requires them to be initialized at declaration time.

Constants use the `val` keyword:

```sn
// Inferred type
val constant = 2;

// Explicit type
val constant: int = 8;

// Initialization is required
val constant: int; // ERROR
```

Always prefer writing a constant than a mutable ; this will prevent accidentally modifying its content. Plus, in some languages like JavaScript, it makes the program a bit faster.

### Plain constants

Plain constants are constants that only accept _plain values_, which are values we can predict before the program begins to run, and whatever the platform/context is. In some other programming languages, plain values are called _literals_.

A plain constant is declared using the `pln` keyword:

```sn
// Inferred type
pln PLAIN = 2;

// Explicit type
pln PLAIN: int = 8;

// Initialization is required
pln PLAIN: int; // ERROR

// Non-plain values are not accepted
pln PLAIN = mutable1; // ERROR
```

Note that, by convention, the name of plain constants is written using only uppercase characters, digits and underscores (`_`).

### Primitive types

There are two categories of types: primitives, which we will see now, and objects, which are any type that is not a primitive.

#### Voids

Voids use the `void` type and can only take a single value: `null`.

```sn
val value: void = null;
```

#### Booleans

Booleans use the `bool` type and can take either the `true` or the `false` value.

```sn
val value_1: bool = true;
val value_2: bool = false;
```

#### Numbers

Numbers are by default represented by the `int` type ; we will see more about them in the next chapter.

#### Strings

Strings use the `string` type and are made of a suite of characters.

```sn
val name: string = 'Hello world!';
```

They can be delimited using single quotes (`'`) or double quotes (`"`).