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

## Numbers and operators

### Integers

Numbers can be represented using several types. Each type can handle every number between two bounds. Here is the list:

|  Type   |            Minimum           |            Maximum           |
|---------|------------------------------|------------------------------|
| `i8`    | `-128`                       | `127`                        |
| `u8`    | `0`                          | `255`                        |
| `i16`   | `-32,768`                    | `32,767`                     |
| `u16`   | `0`                          | `65,535`                     |
| `i32`   | `−2,147,483,648`             | `2,147,483,647`              |
| `u32`   | `0`                          | `4,294,967,295`              |
| `i64`   | `-9,223,372,036,854,775,808` | `9,223,372,036,854,775,807`  |
| `u64`   | `0`                          | `18,446,744,073,709,551,615` |

All these type are _integer types_, which means they can only handle integers. By default, numbers are represented using the `int` type, which is an alias for `i32`. There is also an `uint` type, which is an alias for `u32`.

There is a type not shown in the table: the `usize` type, which is an `u16` on 16-bit processors, an `u32` on 32-bit processors, and an `u64` on 64-bit processors. It is mostly used to handle memory adresses and indexes, as it ensures to handle all these values.

The number indicated after either the `i`, the `u` or the `f` letter is the number of _bits_ values of this type take in memory. When you have to store a number, it is preferable to take the type that uses the smallest number of bits.

### Floating-point numbers

Floating-point numbers are handled by one of the two _floating-point types_:

* `f32` handles from `~ 1.2 * 10^-38` to `~ 3.4 * 10^+38` with a 6-decimal precision ;
* `f64` handles from `~ 2.3 * 10^-308` to `~ 1.7 * 10^+308` with a 15-decimal to 17-decimal precision.

As you can see, the floating-point types can handle huge ranges, but they don't have the same precision. For example, substracting `0.0000003` (7 decimals) to a `f32` will have no effect at all, but it will on a `f64`, which has the required precision.

In this book, we will abbreviate "floating-point numbers" by the "floats" term.

**NOTE:** Floats are represented according to the IEEE-754 standard. `f32` is a single-precision float, while `f64` has double precision.

### Numeric operators

There are several operators to manipulate numbers:

```sn
// addition
val sum = 6 + 2; // 8

// substraction
val difference = 6 - 2; // 4

// multiplication
val product = 6 * 2; // 12

// divison
val quotient = 6 / 2; // 3

// remainder
val remainder = 6 % 2; // 0

// pow
val pow = 6 ** 2; // 36
```

For integer types, results are truncated to zero, meaning `7 / 4` will result in `1`.

Numeric operators return a value of the same type than their left operand. For example, dividing an `f32` number by an `i8` value will result in an `f32`.

### Bitwise operators

Bitwise operators work on each bit of the number. They take two numbers to return another one:

* `&` (bit-by-bit and)
* `|` (bit-by-bit or)
* `^` (bit-by-bit exclusive or)
* `<<` (binary left shift operator)
* `>>` (binary right shift operator)
* `~` (one's complement) - takes a single number

```sn
pln a = 60; // a : 0011 1100
pln b = 13; // b : 0000 1101

a & b;  // 0000 1100 : 12
a | b;  // 0011 1101 : 61
a ^ b;  // 0011 0001 : 49
a << 2; // 1111 0000 : 240
a >> 2; // 0000 1111 : 15
~ a;    // 1100 0100 : -60 (for signed integers - two's complement form)
```

### Numeric suffix

It's possible to write a number of another type than `int` without specifying the variable's type, by using a _numeric suffix_, which indicates explicitly the number's type:

```sn
2b; // i8
2B; // u8
2s; // i16
2S; // u16
2;  // i32
2u; // u32
2l; // i64
2L; // u64
2p; // usize
```

We can then assign these values to an entity:

```sn
val num = 2b; // 'num' is typed as a 'i8'
```

### Overflow and underflow

Overflow occurs when we exceed a number type's maximum bound, and leads it to returning to its minimum bound before continuing the operation:

```sn
val num = 127b; // i8 (-128 to 127)

println!(num + 1); // Prints: '-128'
```

The `println!` statement allows to display a value in the console. Here, where we expect it to display `128`, it shows `-128`. This is because our number _overflowed_: because it can't handle numbers higher than `128`, it goes back to its minimum bound (`-128`). The operation is not stopped, though:

```sn
val num = 127b;

println!(num + 3); // Prints: '-126'
```

Underflow is the exact opposite concept: it occurs when we exceed the number's minimum bound, which makes it go to its maximum bound:

```sn
val num = -128b;

println!(num - 3); // Prints: '125'
```

### Separator and alternative bases

Plain numbers accept a _separator_, which is the underscore symbol (`_`) to make them more readable:

```sn
val num = 1_000_000;
// Equivalent to:
val num = 1000000;
```

Underscores are simply ignored in the number. Note that you can't start or end a plain number by an underscore symbol.

It's also possible to write numbers in alternative bases, such as hexadecimal, by starting the number with `0` and a base symbol: `d` for decimal (base 10, the default one), `b` for binary (base 2), `o` for octal (base 8), and `x` for hexadecimal (base 16).

```sn
val dec1 =    92; // Decimal (92)
val dec2 = 0d192; // Decimal (192)

val bin = 0b110; // Binary (6)
val oct = 0o675; // Octal (445)
val hex = 0xFFA; // Hexadecimal (4090)
```

### Numeric typecasting

Number types are incompatible with them, for the most part. This means we cannot assign an `u16` number in an `u8` entity, for example. This avoids many overflow and underflow problems when converting implicitly a number type to another one. Let's take an example:

```sn
let num8: u8 = 3B;
let num16: u16 = 4328S;

num8 = num16; // ERROR
```

This code results in an error, because we can't assign an `u16` to an `u8`. If this code was valid, this would have lead us to `num` containing `232`, which is not the result we expected at all.

Still, if we are sure we want to convert a number to another type, we can use manual _typecasting_:

```sn
let num8: u8 = 3B;
let num16: u16 = 8S;

num8 = num16 as u8; // Works fine

println!(num8); // Prints: '8'
```

There is also an automatic typecasting feature that automatically typecasting a given number type to any of its signed and unsigned counterpart with a higher number of bits. To be more explicit, here the full list of automatic typecasts:

* `i8` to either `i16`, `u16`, `i32`, `u32`, `i64`, `u64` ;
* `u8` to either `i16`, `u16`, `i32`, `u32`, `i64`, `u64` ;
* `i16` to either `i32`, `u32`, `i64`, `u64` ;
* `u16` to either `i32`, `u32`, `i64`, `u64` ;
* `i32` to either `i64`, `u64` ;
* `u32` to either `i64`, `u64` ;
* `usize` to `u64` ;
* `f32` to `f64`

Showcase:

```sn
let num8: u8 = 2B;
let num16: i16 = num8; // Works fine

println!(num16); // Prints: '2'
```

These typecasts are performed automatically because they can't lead to an overflow or an underflow when being converted. For example, an `u8` handles numbers from `0` to `255`, so it can be converted to an `u16` (`0` to `65_536`), to an `i16` (`-32_768` to `-32_767`) or to number types with higher capacity.

Also, as the `usize` type is, at maximum, an `u64` value, it can be converted to this type.

The only exception is for float types: integers cannot be automatically converted to floats, as the precision could result in inexact rounds.

### Assignment operators

Assignments operators are numeric operators applied on the assignment operator (`=`). They allow for example to add a value to an entity without writing its name twice. Here is the syntax:

```sn
let num = 2;

// Short syntax
num += 3;
// Equivalent to:
num = num + 3;
```

All numeric operators can be used:

```sn
let num = 2;

num **= 3;

println!(num); // Prints: '8'
```

### Logical operators

Let's first introduce the concept of _nil values_: a nil value is either `null`, `false`, `0` (in any number type) or `''`.

Logical operators allow to perform a logical computation, for example comparing two values. They always return a boolean.

Here is the list of operators, taking two operands: `a` on their left, `b` on their right:

| Symbol |           Name           |            Returns `true` if...          |
|--------|--------------------------|------------------------------------------|
|  `&&`  | and                      | `a` and `b` are not nil values           |
|  `||`  | or                       | `a`, `b` or both are not nil values      |
|  `==`  | equal to                 | `a` is equal to `b`                      |
|  `!=`  | different than           | `a` is different than `b`                |
|  `>`   | greater than             |  `a` is greater than `b`                 |
|  `<`   | lower than               | `a` is lower than `b`                    |
|  `>=`  | greater than or equal to | `a` is greater than or equal to `b`      |
|  `<=`  | lower than or equal to   | `a` is lower than or equal to `b`        |
| `nand` | not and                  | `a`, `b` or both are nil values          |
|  `nor` | not or                   | `a` and `b` are both nil value           |
| `xor`  | exclusive or             | `a` or `b` is a nil value (but not both) |

There is an additional operator, `!` (not) which returns `true` if its single operand (on its right) is a nil value.

```sn
pln N1 = 10;
pln N2 = 5;

N1 && N2; // true
N1 || N2; // true
N1 == N2; // false
N1 != N2; // true
N1 > N2; // true
N1 < N2; // false
N1 >= N2; // true
N1 <= N2; // false

N1 nand N2; // false
N1 nor N2; // false
N1 xor N2; // false

! N1; // false
```

### String concatenation

The _concatenation operator_ takes two strings and returns the resulting one:

```sn
println!('Hello ' + 'world!'); // Prints: 'Hello world!'
```

### String expressions

This operator is a little bit special because it only works inside multi-line strings, which are delimited by backquotes:

```sn
val str = `this
is a
multi-line
string`;
```

The operator allows to evaluate an expression inside the string and is replaced by its result:

```sn
val a = 4;
val b = 2;

println!(`4 ** 2 = ${a ** b}`); // Prints: '4 ** 2 = 16'
```