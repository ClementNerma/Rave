# The Master Book

## Foreword

Welcome to _The Master Book_, an exhaustive tutorial for the SilverNight programming language.

**WARNING:** Before starting to read this book, please remind that this is still a work in progress. This document is subject to major changes, and some features may be added / remade / removed at anytime. Besides, the language is not usable yet - it is not possible to compile or interpret it. This is only a preview document, presenting many of the language's aspects in order to get a global overview of its features.

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
* Get rid of low-level languages' complexity/unsafety ;
* Get rid of high-level languages' lack of riguor ;
* Use a stable language with a very explicit behavior

Still, it may not be suited for:

* Very low-level programs - direct communication with hardware, direct memory management, drivers, ... ;
* Programs in which memory and threads safety is critical (not better than C or C++)

### Setting up environment

_real part will be achieved when the toolchain will be made available._

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

### Constants

Constants are another type of entity. They work like mutables, except their value can't change after their declaration. They use the `val` keyword:

```sn
// Inferred type
val constant = 2;

// Explicit type
val constant: int = 8;

// Initialization is required
val constant: int; // ERROR
```

Always prefer writing a constant to a mutable ; this will prevent accidentally modifying its content. Plus, in some languages like JavaScript, it makes the program a bit faster.

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
val value1: bool = true;
val value2: bool = false;
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

### Arithmetic operators

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

#### Bitwise operators

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

### Numeric suffixes

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
2f; // f32
2d; // f64
```

We can then assign these values to an entity:

```sn
val num = 2b; // 'num' is typed as a 'i8'
```

Note that, when a decimal part is found after a number, it is automatically considered as an `f32`, even if it's zero:

```sn
val float = 2.0; // f32
```

### Overflow and underflow

Overflow occurs when we exceed a number type's maximum bound, and leads it to returning to its minimum bound before continuing the operation:

```sn
val num = 127b; // i8 (-128 to 127)

println!(num + 1); // Prints: '-128'
```

The `println!` statement allows to display a value in the console. `println!` is a flex - a special function we will deal with later -. Here, where we expect it to display `128`, it shows `-128`. This is because our number _overflowed_: because it can't handle numbers higher than `128`, it goes back to its minimum bound (`-128`). The operation is not stopped, though:

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

**NOTE:** Operations are permitted between different number types. For example, dividing an unsigned number by a signed one is accepted and will return a number of the same type than the left operand.

### Assignment operators

Assignments operators are numeric operators applied on the assignment operator (`=`). They allow for example to add a value to an entity without writing its name twice. Here is the syntax:

```sn
let num = 2;

// Short syntax
num += 3;
// Equivalent to:
num = num + 3;
```

All numeric operators (including bitwise ones) can be used:

```sn
let num = 2;

num **= 3;

println!(num); // Prints: '8'
```

There are four additional operators for assignment, which all return a number:

* `++ variable`: pre-incremental operator, it increments the variable and return the new value ;
* `variable ++`: post-incremental operator, it increments the variable and return its previous value ;
* `-- variable`: pre-decremental operator, it decrements the variable and return the new value ;
* `variable --`: post-decremental operator, it decrements the variable and return its previous value

```sn
let i = 0;

if ++ i == 1 {
  println!('OK'); // Prints: 'OK'
}
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

Note that all operators that work on numbers will work on two different number types. For example, comparing an `u16` to an `i8` will work perfectly, the smallest number type being compared to the highest one to avoid overflows:

```sn
let num8: u16 = 2S;
let num16: i8 = 2b;

if num8 == num16 {
  println!('OK'); // Prints: 'OK'
}
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

## Data structures

We saw previously there were two categories of types : primitives and objects. In this chapter, we're going to study these last ones.

### Vectors

Vectors provide a way to represent chain of datas. There are divided in two types: arrays, which are chains with a fixed length, and lists, which have a dynamic length, meaning we can add and remove elements from it.

#### Arrays

Arrays are defined this way:

```sn
val array: int[3] = [ 2, 3, 4 ];
```

As you can see, the type for arrays is `T[LENGTH]`, where `T` is the type of value the array contains and `LENGTH` its length. Note that, as inferred typing also works on arrays, we can omit the array type:

```sn
val array = [ 2, 3, 4 ]; // int[3]
```

When we want to accept any array of a given type, whatever their length are, we can omit the size:

```sn
let arr1: int[3] = [ 2, 3, 4 ];
arr1 = [ 2, 3, 4, 5 ]; // ERROR (size mismatch)

let arr2: int[] = [ 2, 3, 4 ];
arr2 = [ 2, 3, 4, 5 ]; // Works fine
```

### Ranges

Ranges are a shortened syntax to make arrays that go from a given integer to another. For example, if we want to make an array containing all integers from `10` to `19`, we can just write:

```sn
val arr = 10...19;

println!(arr[0]); // Prints: '10'
println!(arr[9]); // Prints: '19'
```

One of the main points that make ranges interesting, aside not having to write all numbers manually, is that they take near-to-zero memory space. Even a range of 1000 billion numbers (let's say, `0..1_000_000_000_000`) will take only a few bytes in memory, while its hand-written version would take much more memory than your computer can handle (about 4096 gigabytes of RAM).

#### Lists

Lists, on their size, are defined using the `List<T>` type, where `T` is the same as for arrays:

```sn
val list: int[#] = [ # 2, 3, 4 ];
```

Notice the `#` symbol at the beginning of the list? It indicates we are not writing an array, but a list of elements. If we omit this symbol, we try to assign an array to a list, which is forbidden.

As for arrays, lists support inferred typing, so we can simply write:

```sn
val list = [ # 2, 3, 4 ];
```

To make empty lists, we can use an alternate syntax:

```sn
// Empty list of strings
val list1 = string:[#];

// Empty list of integers
val list2 = int:[#];
```

Don't forget the `:` symbol between the type name and the opening bracket: it indicates we are not writing a type name (`int[#]` refers to a list of integers) but an _empty list_ of the given type.

#### Dealing with vectors

We can grab any element from a vector using the following syntax:

```sn
val arr = [ 2, 3, 4 ];

println!(arr[0]); // Prints: '2'
println!(arr[1]); // Prints: '3'
println!(arr[2]); // Prints: '4'
```

The number written between brackets is called the _index_. As in many other programming languages, indexes start at `0`. The index must be an `usize` value, meaning we can't write `arr[-1]` for example.

Note that trying to access an out-of-bounds index will panic the program, meaning it will suddenly stop with an error message:

```sn
val arr = [ 2, 3, 4 ];
val index = 3p;

arr[index]; // ERROR (index out of bounds)
```

We can get the number of elements contained in a vector (array or list) using `.size`:

```sn
val arr = [ 2, 3, 4 ];
val list = [ # 5, 6, 7 ];

println!(arr.length == list.length); // Prints: 'true'
```

Vectors support an additional operator: the inclusion operator. It takes two operators, a value and a vector, and returns `true` if the vector contains the provided value:

```sn
val arr = [ 2, 3, 4 ];

println!(2 in arr); // Prints: 'true'
```

For lists, we can add an element using the following syntax:

```sn
val list = [ # 2, 3, 4 ];

// Short way
list[] = 5;

// Long way
list.push(5);
```

We can remove the last element using `.pop`:

```sn
val list = [ # 2, 3, 4 ];

println!(list[2]); // Prints: '4'

// Remove the last element
list.pop();

println!(list[2]); // ERROR (index out of bounds)
```

### Structures

Structures link fields (which are entity names) to values. They allow to represent data in a more intuitive way than arrays.

Let's say we want to represent a hero. It has health points (HP), attack points (ATK) and experience (EXP). With arrays, we could do like this:

```sn
val hero = [ 100u /* HP */, 20u /* ATK */, 0u /* EXP */ ];
```

But this is not very readable, and not intuitive to manipulate: modifying the experience will be achieved using `hero[2]`, which isn't obvious to be the experience number.

Another problem is that we can't, for example, give a name to our hero, because arrays must contain a single type of values. This would lead us to storing the name in another entity, which is not convenient.

A way to represent this more easily is to use structures. Our example would go like this:

```sn
// Define the structure (it's a type)
struct Hero {
  name: string;
  hp: uint;
  atk: uint;
  exp: uint;
}
```

We now have an `Hero` type. This introduces a new notation concept: primitive types always start with a lowercase letter (and are in fact only written with lowercase letters and digits), while object types always start with an uppercase letter. This allows to distinguish them easily.

To represent data using our new type, we need to _instanciate_ it using the following syntax:

```sn
val jack = Hero {
  name: 'Jack',
  hp: 100u,
  atk: 20u,
  exp: 0u
};
```

This produces an _object_, which is an instance of our `Hero` structure. Here, `name`, `hp`, `atk` and `exp` are called the structure's _fields_.

Still, by default, fields are constant. This means we cannot modify our hero's experience, for instance. If we want to, we simply have to mark the field as mutable, using the `mut` keyword:

```sn
struct Hero {
  name: string;
  hp: uint;
  atk: uint;
  mut exp: uint;
}
```

The instanciation keeps the same syntax. We can now increase our hero's experience:

```sn
// Given our hero just defeated an ennemy
jack.exp += 100u;

println!(jack.exp); // Prints: '100'
```

For specific situations we will see later, we can also force a field to only store a plain value, using the `pln` keyword:

```sn
struct Hero {
  pln NAME: string;
  hp: uint;
  atk: uint;
  mut exp: uint;
}

val jack = Hero {
  NAME: 'Jack', // A variable wouldn't have been accepted here
  hp: 100u,
  atk: 20u,
  exp: 0u
};

jack.NAME = 'Jack the Hero'; // Works fine
jack.NAME = someVariable; // ERROR
```

We can even put optional fields, by giving them a default value:

```sn
struct Hero {
  name: string;
  hp = 100u; // Inferred typing is supported
  atk = 20u;
  exp = 0u;
}

val jack = {
  name: 'Jack'
};

val john = {
  name: 'John',
  atk: 10u
};

println!(jack.atk); // Prints: '20'
println!(john.atk); // Prints: '10'
```

Also, as you can see, even if we store the instance in a constant, that doesn't make the object constant itself. Always be aware of this!

### Enumerations

Enumerations allow to use a set of identifiers, linked to automatically-generated values. Values using the enumeration's type can be one of the enumeration's identifiers. Here is the syntax:

```sn
// Declare an enumeration
enum Color {
  RED,
  GREEN,
  BLUE
};

// Use it
val red = Color.RED;
val green = Color.GREEN;
val blue = Color.BLUE;
```

By default, the first identifier of the enumeration is an `u8` value starting at `0`. The second is equal to `1`, the third is equal to `2`, etc. Though, it's possible to set a specific number:

```sn
enum Color1 {
  RED = 5, // 5
  GREEN, // 6
  BLUE // 7
};

enum Color2 {
  RED, // 0
  GREEN = 8, // 8
  BLUE // 9
};
```

### Tuples

Tuples are a mix between structures and arrays. Their indexes are plain `usize` values, but each value can have a different type:

```sn
val tuple: (int, f32, string) = (2, 4.8, 'Hello');

tuple[0]; // int
tuple[1]; // f32
tuple[2]; // string
```

Note that, as indexes must be plain values, we can't use a variable here:

```sn
val tuple: (int) = (2);
val num = 0p;

tuple[num]; // ERROR

pln NUM = 0p;

tuple[NUM]; // Works ('NUM' is a plain constant)
```

Inferred typing also works on tuples:

```sn
val tuple = (2, 'Hello'); // (int, string)
```

As for structures, a tuple's values are constants by default. We can use the `mut` and `pln` keyword to change their state:

```sn
val tuple: (mut int, string) = (2, 'Hello');

tuple[0] = 8; // Works fine
tuple[1] = 'World'; // ERROR
```

As for vectors, we can use the inclusion operator on tuples:

```sn
val tuple = (2, 'Hello');

2 in tuple; // true
'Hello' in tuple; // true
```

### Dictionaries

Dictionaries work like vectors which could have any index type. The most common dictionary type is `Map<K, V>`, where `K` is the key type (`usize` in a vector) and `V` the type of values. It goes like this:

```sn
// Declare a map (which is the most common type of dictionary)
val age: Map<string, int> = new Map<string, int>; // Variable's type is omittable

// Associate a value (24) to a field ('Jack')
age['Jack'] = 24;

// Grab a value using its key
println!(age['Jack']); // Prints: '24'

println!(age['John']); // ERROR (key not found)
```

In fact, vectors are a specific type of dictionaries, with `usize` keys. Also, keys must be consecutive, meaning we can't use the `3` key if the `2` doesn't exist in the case of a list (for example).

We can also delete a key (and its value) using the `delete` keyword:

```sn
// Delete the key and its value
delete age['Jack'];

// Try to read it
println!(age['Jack']); // ERROR (key not found)
```

Note that, on vectors, this operation will result in an error as we cannot remove an element (lists can, but only using specific methods).

The inclusion operator also works here, as well as the _key-of_ operator, which checks if a key exists in the dictionary:

```sn
val age = new Map<int, string>;

age['Jack'] = 24;

// Key-of operator
println!('Jack' of age); // Prints: 'true'

// Inclusion operator
println!(24 in age); // Prints: 'true'
```

As for vectors, we can get the number of key/value pairs using `.size`:

```sn
val age = new Map<int, string>;

age['Jack'] = 24;
age['John'] = 26;

println!(age.size); // Prints: '2'
```

### Inferred Structured Typing

_Inferred Structured Typing_, abbreviated _IST_, allows to deduce the structure behind an _implicit object_.

An implicit object is an object that is defined without a structure name, like this:

```sn
val jack = {
  name: 'Jack',
  hp: 100u,
  atk: 20u,
  exp: 0u
};
```

This code is perfectly valid, and we can access our hero's fields just like we would have do with the `Hero` structure. Still, we haven't declared any structure here, so the object doesn't use any. This is why it is called an _implicit_ object: the builder deduces (infers) the structure behind the object. This means the builder will, in reality, turn the example above into this one:

```sn
struct ImplicitStruct1 {
  pln name: string;
  pln hp: uint;
  pln atk: uint;
  pln exp: uint;
}

val jack = Hero {
  name: 'Jack',
  hp: 100u,
  atk: 20u,
  exp: 0u
};
```

This is called Inferred Structured Typing, as it infers not the type of a primitive value, but the structure behind a whole object. The fields were all inferred as plain here, because we provided plain values. If we used variables instead, they wouldn't have been marked as plain, of course.

Also, as you can see here, all fields are constant. We can use the `mut` keyword inside the implicit object to make them mutable:

```sn
val jack = {
  name: 'Jack',
  hp: 100u,
  atk: 20u,
  mut exp: 0u
};
```

You may now wonder why to use structures, if we can use IST instead. Well, structures allow to ensure its instances contain all the required fields, with the good type. It avoids forgetting a single field when writing our object.

In fact, structures are useful since you have at least two objects of the same type. If you have only one, this is pointless, and that's why implicit objects exist. But if you have to deal with several heroes, for example, it's better to go with a structure and explicitly indicate we are instanciating the structure.

Note that we already saw IST before. Inferred typing on arrays and lists use IST, as these are not primitives. We simply write the object, and the builder infers their type.

There is a last syntax for IST, which uses dictionaries:

```sn
let ages = { #
  Jack: 24u,
  John: 26u
};
```

Here, `ages` is a `Map<string, uint>`. We can use to shorten this type its alias, `Collection<uint>` - a `Collection<T>` simply being a `Map<string, T>`. Note that all values must be of the same type.

It's also possible to use non-string keys too, by wrapping them between parenthesis:

```sn
let ages = { #
  (true): 'Yeah',
  (false): 'So bad'
}; // Map<bool, string>
```

Below is a summary of all IST's syntaxes:

* `[ a, b, c ]` produces an array (`T[SIZE]`) ;
* `[ # a, b, c ]` produces a list (`List<T>`) ;
* `{ a, b, c }` produces an implicit object (implicit structure type) ;
* `{ # a, b, c }` produces a map (`Collection<T>`)

### Destructuring assignments

Structures and dictionaries allow to perform multiple assignments at once by _destructuring_ an object. Let's consider the following (implicit) object:

```sn
val hero = {
  name: 'John',
  age: 20u,
  warrior: true
};
```

We want to store its properties in three constants, `name`, `age` and `warrior`. The most intuitive way would be to write:

```sn
val name = hero.name;
val age = hero.age;
val warrior = hero.warrior;
```

But that's a bit long, so we can perform multiple assignments at once to shorten this in a single line:

```sn
val { name, age, warrior } = hero;
```

We "extracted" some properties of `hero` and stored them into constants of the same name. The list of the constants to assign values to is also the list of fields to get the values from.

The opposite is also possible: we can make an object from a group of entities:

```sn
// Standard way
val copy = {
  name: name,
  age: age,
  warrior: warrior
};

// Multiple assignments
val copy = { name, age, warrior };
```

This syntax can also be mixed with other properties:

```sn
val newHero = {
  name, // Implicit value
  age, // Implicit value
  warrior: false // Explicit value
};
```

There is a similar syntax for vectors:

```sn
// Make a sample array
val arr = [ 2, 5, 8, 9 ];

// Extract from the array
val [ n1, n2, n3, n4 ] = arr;
// Equivalent to:
val n1 = arr[0],
    n2 = arr[1],
    n3 = arr[2],
    n4 = arr[3];

// Left slice
val [ ...first, n4 ] = arr;
// Equivalent to:
val first = [ arr[0], arr[1], arr[2] ],
    n4 = arr[3];

// Right slice
val [ n1, ...last ] = arr;
// Equivalent to:
val n1 = arr[0],
    last = [ arr[1], arr[2], arr[3] ];

// Middle slice
val [ n1, ...middle, n4 ] = arr;
// Equivalent to:
val n1 = arr[0],
    middle = [ arr[1], arr[2] ],
    n4 = arr[3];
```

Note that we can simply ignore some values in a vector by using the `...` symbol alone:

```sn
// Middle slice
val [ n1, ..., n4 ] = arr;
// Equivalent to:
val n1 = arr[0],
    n4 = arr[3];
```

This avoids making a useless entity to store the middle values.

Here is a last syntax, for tuples:

```sn
val tuple = (1, 2);

// Extract from tuple
val (one, two) = tuple;
// Equivalent to:
val one = tuple[0],
    two = tuple[1];

println!(one); // Prints: '1'
println!(two); // Prints: '2'
```

#### Slices

The slicing syntax allows to get a specific part of a dictionary. Considering the following one:

```sn
val personsCity = { #
  Jack: 'New York',
  John: 'Washington',
  Marc: 'Paris'
};
```

We can _slice_ it to get only a part of it:

```sn
val slice = personsCity[['Jack', 'John']];

println!(slice[0]); // 'Jack'
println!(slice[1]); // 'John'
```

The `slice` constant is an `int[2]` which contains the values retrieved from `personsCity['Jack']` and `personsCity['John']`.

By giving a tuple of indexes between the brackets, we get an array containing the values related to these indexes. We can get as many indexes as we want - it even works with one or zero index.

We can also use a little trick for vectors. Considering the following array:

```sn
val numbers = [ 'A', 'B', 'C', 'D', 'E' ];
```

If we want to take for example values from index 1 to index 3, we can first use the usual slice syntax:

```sn
val slice = numbers[[1, 2, 3]];
```

But we can also use a number range for this:

```sn
val slice = numbers[1..4];

// Equivalent to:
val slice = numbers[1...3];
```

## Blocks

Blocks provide ways to control the program's execution to omit or repeat groups of instructions depending on conditions, or to simply writing some heavy blocks of codes.

### Conditional blocks

Conditionial blocks run a set of instructions only if a condition is met. The most common conditional block uses the `if` keyword and runs the provided instructions if the condition we write in it is not a nil value. Here is an example:

```sn
if 2 + 2 == 4 {
  println!('OK');
}
```

This code displays `'OK'` because `2 + 2 == 4` returns `true`, which is not a nil value. If we had written `2 + 3 == 4`, this would have resulted in `false`, which is a nil value, so the message wouldn't have been displayed.

The part between the block's keyword (`if`) and the opening brace is called the block's head ; here, it's a condition. The content between the opening and the closing braces is called the block's body - its set of instructions.

We can also use the `unless` block, which is the exact opposite of `if`: it runs the instruction if the condition results in a nil value.

```sn
unless 2 + 3 == 4 {
  println!('OK');
}
```

This code displays `'OK'`.

Because we may want to do something if the instructions are not ran, we can use the `else` blocks, which takes no head and run the instructions only if the previous block has not ran its own ones:

```sn
if 2 + 3 == 4 {
  println!('Strange...');
} else {
  println!('OK');
}
```

This code displays `'OK'`.

We can also use the `elsif` block, which acts as an `else` block but using another condition:

```sn
if 1 + 1 == 4 {
  println!('Strange...');
} elsif 1 + 1 == 3 {
  println!('Strange...');
} else {
  println!('OK');
}
```

As soon as a block runs its set of instructions, the next one in the chain are ignored. Also, note that the `else` block must be placed at the very end of the chain.

### Repetition blocks

There are two main blocks to repeat a set of instructions: the incremental repetition block (`for`), and the conditional repetition block (`while`). They are called _loop blocks_.

The first one has a specific head syntax: its first takes an _initialization instruction_, which is ran when the loop is met ; a _break condition_, which is evaluated each time the set of instructions is going to be ran, and exits the loop if it's a nil value ; and finally an _iteration instruction_, which is executed just before evaluating the break condition. Showcase:

```sn
for i = 0; i < 5; i ++ {
  println!(i);
}
```

This code will print `0`, then `1`, `2`, `3` and finally `4`. Just after this last value, the iteration instruction is ran, so `i` is equal to `5`. The break condition is then evaluated, and returns `false`, which is a nil value, so the loop exits.

Conventionally, in the above example, `i` is called the loop's _iterator_. It is automatically declared at the beginning of the loop. But it's optional ; the following code is perfectly valid as well:

```sn
for null; true ; null {
  println!('Hello');
}
```

This will print `'Hello'` endlessly.

Note that our first loop example can be shortened using an iterator - we'll see what it is later:

```sn
for i in 0..5 {
  println!(i);
}
```

This will print values from `0` to `4`. If we want to go up to the end value, we simply add a third point:

```sn
for i in 0...5 {
  println!(i);
}
```

For more complex conditions, we can use the `while` block. Its head is evaluated each time the set of instructions is going to be ran ; if it's a nil value, the loop stops.

```sn
let i = 0;

while i < 5 {
  println!(i);
  i ++;
}
```

This will print values from `0` to `4`.

If we want to evaluate the condition at the end of the loop (which also means the instructions will be ran at least once), we can use the `do`...`while` block:

```sn
let i = 0;

do {
  println!(i);
  i ++;
} while i != 0;
```

This code will print `0` - nothing would have been printed with a simple `while` loop.

These two blocks also have variants: `until` and `do`..`until`, which simply revert the condition (like `unless` does for `if`).

```sn
let i = 0;

// until
until i == 5 {
  println!(i);
  i ++;
}

// do...until
do {
  println!(i);
  i ++;
} until i == 5;
```

There is a last repetition block, which repeats its instructions endlessly: `loop`.

```sn
loop {
  println!('Hello');
}
```

This loop acts like a `while true`, but its point is to clearly indicate we are doing an infinite loop, and allow a better optimization of the code.

### Breaking and continuing

Loops can be broken (stopped) at anytime using the `break` instruction:

```sn
for i in 0..5 {
  println!(i);

  if i == 2 {
    break ;
  }
}
```

This code will print `0`, `1` and `2`, then break.

This instruction is also the only way to exit a `loop` block.

On the other side, the `continue` instruction goes to the next iteration of the loop, ignoring the instructions above it:

```sn
for i in 0..5 {
  if i == 2 {
    continue ;
  }

  println!(i);
}
```

This code will print `0`, `1`, `3` and `4` - the `println!` call for `2` has been ignored because of the `continue` instruction above it.

### Matches

The `match` keyword allow to run a set of instructions depending on a value. Let's consider we have a color taken from a `Color` enumeration and we want to print a message depending on it. A first idea could be to write:

```sn
if color == Color.RED {
  println!('Color is red');
} elsif color == Color.GREEN {
  println!('Color is green');
} elsif color == Color.BLUE {
  println!('Color is blue');
} else {
  println!('Unknown color');
}
```

This is a bit heavy, and can be replaced by a match:

```sn
match color {
  Color.RED   -> println!('Color is red');
  Color.GREEN -> println!('Color is green');
  Color.BLUE  -> println!('Color is blue');
  default     -> println!('Unknown color');
}
```

Which is a lot more readable. The `default` keyword runs its related set of instructions if none of the other values matched the provided one.

It's also possible to provide conditions for matches, by wrapping them between brackets:

```sn
val age = 24;
let str = '';

match age {
  [_ < 12] -> str = 'Child';
  [_ < 18] -> str = 'Teenager';
  default  -> str = 'Adult';
}
```

The `_` entity refers to the provided value.

### Ternary conditions

Ternary conditions allow to write short conditions more easily:

```sn
val str = age < 18 ? 'Not adult' : 'Adult';
```

The value after the `?` symbol is taken if the condition is not a nil value. If it's a nil a value, the value written after the `:` symbol is taken instead.

### Inline blocks

Inline blocks are variants of the blocks we saw previously. They are written after an instruction and consider this one as their body. Showcase:

```sn
val age = 24;

println!('You are an adult') if age >= 18;
println!('You are an adult') unless age < 18;
```

This works for absolutely any instruction and block:

```sn
println!(i) for i in 0...5;
```

This code will print numbers from `0` to `5`.

### Inline generation

Inline generation allows to generate a list of values from an expression. The syntax is the following:

```plain
([expression] [inline loop]);
```

The parenthesis wrapping is required in order to perform inline generation, else it will simply repeat the instruction, like it does in our example with an inline `for` loop.

```sn
val cubes = (i * i * i for i in 0..5); // int[#]

println!(cube) for cube in cubes;
```

This code will print `0`, `1`, `8`, `27` and `64`.

Because we may want an array instead of a list, we can use an alternative syntax using the `gen` keyword that produces an array:

```sn
val cubes = (i * i * i for i -> 0..5) // int[5];
```

This specific `for` syntax is only allowed for inline generation.

### Scoping

A _scope_ is a part of the source code that isolate resources such as variables or constants. By default, a scope begins at each opening brace and ends at the matching closing brace.

When declaring an entity, this one is binded to the current scope, meaning we can access it from within the current scope but not from the sub-scopes (called the _children scopes_).

```sn
// Scope 0
let i = 0; // Binded to scope 0

// Create a scope
{
  // Scope 1

  let i = 0; // Binded to scope 1
}
```

Scope 1 is called a _child scope_ of scope 0, which is its _parent scope_ (the parent scope, as well as its own parents, etc. are called the _ancestor scopes_). As you can see, it's possible to declare entities in a child scope that has the same name than another in a ancestor scope. They are completely distinct, though.

A given scope can access:

* Every entity declared in itself ;
* Every entity declared in any ancestor scope

But not an entity declared in a child scope. Showcase:

```sn
// Scope 0
let i = 0;

{
  // Scope 1
  let j = 0;

  {
    // Scope 2
    let k = 0;

    // Available: 'k', 'j', 'i'
  }

  // Available: 'j', 'i'
}

// Available: 'i'
println!(j); // ERROR (undefined entity)
```

**NOTE:** Scope 0, which is implicit as it is not wrapped between braces, is called the _main scope_.

Blocks are a special case: their scope includes their head, meaning it starts right after the block's keyword:

```sn
if /* Scope begins */ 2 + 2 == 4 {
  println!('Hello world!');
/* Scope ends */ }
```

Inline blocks implicitly create a scope for the whole instruction (including their head).

```sn
val cubes = /* Scope begins */ i * i * i for i in 0..5 /* Scope ends */;
```

## Functions

Functions are a specific type of blocks that allow to manually run a set of instructions as many times as we need, from anywhere in the scope.

### Declaration

Let's imagine we want to calculate the area of a trapezoid and display a message if it exceeds 100. This is very simple and can be written like this:

```sn
if (base + top) * height / 2 > 100 {
  println!('Area exceeds 100');
}
```

But now, let's imagine we have to deal with several trapezoids in different places of our program. This would leads us to rewriting this code many times, which is not very convenient. Plus, if we want to change the message, we have to track all the occurences of this code - and we may forgot some of them. This problem is even more true with biggest piece of codes, of course.

A solution is to use a function. It goes like this:

```sn
fn area (base: f32, top: f32, height: f32) {
  if (base + top) * height / 2 > 100 {
    println!('Area exceeds 100');
  }
}
```

Let's detail this code. First, we indicate we are declaring a function by using the `fn` keyword (which is an abbrevation for "function").

We then specify the function's name, `area`, followed by its _arguments_. These are entities that are part of the function's body (starting at the opening brace) which are provided when we call the function. Each argument has a name and a type (like for any entity). We then provide the function's body, which has its own scope.

This first line is called the function's _signature_.

Now, we can call our function:

```sn
area(10.0, 5.0, 80.0); // Prints the message
```

Each time we will have to compute the area, we will simply have to call the function, which is a lot more easier, readable and maintanable than re-writing the whole code each time. If we want to change anything in the computation, we simply have to change it in a single place.

**NOTE:** As functions use braces, they of course have their own scopes. Furthermore, as functions declaration are blocks, their head is part of the scope too, which is how we can access its arguments.

### Returning values

We may want to get the trapezoid's area after (optionally) displaying the message. For that, the function must _return_ the area, which requires us to change it a little bit:

```sn
fn area (base: f32, top: f32, height: f32) : f32 {
  // Compute the area
  val result = (base + top) * height / 2;

  // Print the message
  if result > 100 {
    println!('Area exceeds 100');
  }

  // Return the result
  return result;
}
```

Putting apart comments and the fact we now use a `result` constant, two things have changed in our function.

First, we gave it a _return type_, written after the double point symbol just before the opening brace. It indicates what kind of value our function will return.

The second change is the `return` statement at the end of the function. The value on its right is returned by the function, which can be used afterward:

```sn
val trapezoidArea = area(1.0, 2.0, 3.0));
```

### Arguments mutability

By default, a function's arguments are constants. They can be made mutable or plain using the same keywords than in structures:

```sn
fn test (mut mutable: bool, constant: bool, pln plain: bool) {
  mutable = true; // Works fine
  constant = true; // ERROR
  plain = true; // ERROR

  pln p1 = mutable; // ERROR
  pln p2 = constant; // ERROR
  pln p3 = plain; // Works fine
}
```

### Optional arguments

Like we did with structures, we can make some arguments optional by giving them a default value. Though, such arguments must be placed at the very end of the arguments list.

```sn
fn sayHello (name: string, repeat: uint = 1u) {
  println!(name) for i in 0..repeat;
}

sayHello('Jack');    // Prints: 'Jack'
sayHello('Jack', 1); // Prints: 'Jack'
sayHello('Jack', 2); // Prints: 'Jack' (twice)
```

Note that default values can also be an expression, that will be evaluated when the function will be called.

As default values indicate the argument's type, we can omit it from the declaration:

```sn
fn sayHello (name: string, repeat = 1u) {
  // ...
```

### Endless arguments

Endless arguments are prefixed with the `...` symbol, and accept from zero to an infinity of arguments:

```sn
fn sumOf (...nums: int[]) : int {
  let sum = 0;

  sum += n for n in sums;

  return sum;
}

sumOf(1, 2, 3); // Works fine
sumOf(1, 2, 3, 4); // Works fine
sumOf(); // Works fine
```

They are typed as arrays with an unknown length ; here, `nums` is an `int[]`.

It's possible to provide multiple endless arguments, the only rule it that we can't write two consecutive endless arguments with the same type:

```sn
fn sumOf (...ints: int[], ...floats: f32[]) : f32 {
  let sum = 0.0;

  for n in ints {
    sum += n as f32;
  }

  sum += n for f in floats;

  return sum;
}

sumOf(1, 2, 3.0); // Works fine
sumOf(1, 2); // Works fine
sumOf(3.0); // Works fine
sumOf(); // Works fine
```

### Vector and tuples expansion

It's also possible to use a vector in the place of an endless arguments, using the `...` _expansion operator_:

```sn
val nums = [ 2, 3, 4 ];

sumOf(...nums, 5.0);
// Equivalent to:
sumOf(2, 3, 4, 5.0);
```

The same goes with tuples, allowing to use values of different types.

```sn
fn sayHello (name: string, amount: uint) {
  println!(`Hello ${name}!`) for i in 0..amount;
}

val args = ('Jack', 5u);

sayHello(...args); // Prints: 'Hello Jack!' 5 times
```

### Operator functions

Operators functions act like traditional operators: they take one or two arguments, called their _operands_, and return a result. Their point is to keep a clean syntax in the program. For example, if we want to make a function that adds two numbers, we can go with a standard function:

```sn
fn add (left: int, right: int) : int {
  return left + right;
}

// Use it
add(2, 5);
add(3, 8);
```

This works fine. But what if we imbricate several additions?

```sn
add(add(2, add(5, 7)), add(3, 4));
```

This quickly becomes unreadable, and that's why we use operator functions:

```sn
op fn add (left: int, right: int) : int {
  return left + right;
}

// Standard syntax
add(2, 5);

// Operator syntax
2 add 5;
```

Our previous example becomes like this:

```sn
// Standard syntax
add(add(2, add(5, 7)), add(3, 4));

// Operator syntax
(2 add (5 add 7)) add (3 add 4);
```

Which is a lot more readable.

### Polymorphism

_Polymorphism_ allow to declare the same function several times. Each declaration, though, must use different arguments - this can be an additional argument, one less argument, or an existing argument that gets a new type:

```sn
fn add (a: int, b: int) : int {
  println!('Add: int');
  return a + b;
}

fn add (a: uint, b: uint) : uint {
  println!('Add: uint');
  return a + b;
}
```

When we call it, the right function is chosen depending on the provided arguments and their type:

```sn
add(2, 5); // Prints: 'Add: int'
add(2.0, 5.0); // Prints: 'Add: uint'
```

There is a risk of ambiguity at build time if the function uses endless arguments and we don't provide any (which is allowed):

```sn
fn sumOf (...nums: int[]) : int { /* ... */ }
fn sumOf (...nums: f32[]) : f32 { /* ... */ }

sumOf(); // ERROR (ambiguity)

// The compiler doesn't know what declaration to use
// We must tell it explicitly by using a vector of elements

val vec = int:[#];
sumOf(vec...); // Works fine
```

### Lambdas

_Lambdas_, also called _anonymous functions_, are single values that can be used as callbacks. Here is an example:

```sn
// The .filter function takes a function as an argument
// It runs it for each element of the list
// If the callback returns `false`, the value is dropped
// Then, a new list is returned

val list = [ # 2, 3, 4 ];

val filtered = list.filter((value: int) : bool {
  return value > 2;
});
```

The `filtered` list now contains the `3` and `4` values. As you can see, the lambda has no name - this is where the _anonymous_ term comes from.

It's possible to represent functions as a type:

```sn
fn runLambda (func: fn (value: int) : bool) {
  if func(5) {
    println!('Returned: true');
  } else {
    println!('Returned: false');
  }
}

runLambda((value: int) : bool => {
  return true;
}); // Prints: 'Returned: true'
```

This time, the type uses the `fn` keyword, because we may give an existing function and not a lambda.

As functions are simple values, we can store it in entities, and even use inferred typing to omit their type:

```sn
let sum = (a: int, b: int) : int => {
  return a + b;
};

println!(sum(2, 5)); // Prints: '7'
```

For lambdas only made of a `return` instruction, we can use the _inline syntax_ to shorten their writing:

```sn
let sum = (a: int, b: int) : int => a + b;

println!(sum(2, 5)); // Prints: '7'
```

The expression written after the arrow is evaluated when the function is called, and then returned.

### Inferred Callback Typing

A function is called a _callback_ when it is provided as a function's argument. Callbacks can be written in a shorter way than lambdas, thanks to a featured called _Inferred Callback Typing_ (abbreviated _ICT_) that infers the type of its arguments, as well as its return type:

```sn
// Lambda syntax
list.filter((value: int) : bool => value > 2);

// ICT
list.filter((value) => value > 2);
```

This syntax doesn't work with non-callback lambdas (e.g. lambdas that are assigned to an entity before being used). Indeed, ICT works because the builder exactly knows what are the type of the callback's arguments, as well as its return type.

When the callback has a single argument, its wrapping parenthesis can be omitted:

```sn
list.filter(value => value > 2);
```

To provide multiple instructions, braces can be used after the arrow:

```sn
list.filter(value => {
  println!(`Filtering value ${value}...`);
  return value > 2;
});
```

## Classes

Classes are kind of extended structures. The main difference is they can have methods, which are functions that can't change through the different instances, and private members, which are entities that are not visible from the outside. There are plenty of other differences, but here are the major ones.

### Declaration and members

Let's go back to a previous problem: representing a hero. The first option we saw was to use an array, but that was way too unreadable and restricted all the values to be of the same type. Then, we used a structure, which was a lot more convenient. It resulted in the following:

```sn
struct Hero {
  name: string;
  hp: uint;
  atk: uint;
  mut exp: uint;
}
```

BUt now, let's imagine we want to allow our hero to fight another one. This action would result in both the heroes to lose health points, depending on their ennemy's attack points. Still, we don't want anyone to modify these health points. That's impossible, because the `hp` field can either be mutable - but then anyone can change it - or constant - but then we're not able to update the health points anymore -. Besides, if we have to make a `fight` function that is separated from the structure, which is not convenient. And if we use many structures, it quickly becomes unmaintanable.

The solution to this problem is to use a class:

```sn
class Hero {
  public readonly name: string;
  public readonly hp: uint;
  public readonly atk: uint;
  public readonly exp: uint;
}
```

A class is made of _members_, which are either _attributes_ - entities - like we defined just above or methods - immutable functions linked to the class -.

Through this book, we will often talk about the _inside_ of the class, which refers to anything in the class' scope, and to the _outside_ of the class, which is anything outside this scope.

Here, all attributes are marked as public using the `public` keyword, meaning they can be accessed from the outside, but they are also marked as read-only using the `readonly` keyword. This is different than `val` in the way it prevents these attributes from being written from the outside, but not from the inside - where they stay mutable.

Like structures, classes can be instanciated. But for that, they need a _constructor_, which is a special method called when the class is created:

```sn
class Hero {
  public readonly name: string;
  public readonly hp: uint;
  public readonly atk: uint;
  public readonly exp: uint;

  public fn %new (name: string, hp: uint, atk: uint, exp: uint) {
    this.name = name;
    this.hp = hp;
    this.atk = atk;
    this.exp = exp;
  }
}
```

Inside the class, `this` refers to the current class. We can access all the class' attributes (even private ones) using it.

We can now instanciate the class using the `new` keyword:

```sn
val jack = new Hero('Jack', 100u, 20u, 0u);
```

Note that the constructor's arguments are required:

```sn
val jack = new Hero; // ERROR (4 arguments missing)
```

Also note that parenthesis are optional after the class' name if the constructor takes no argument.

We can get its name, health points, attack points or experience by using the dedicated properties, just like we would do with a structure.

Let's write a method to fight another ennemy:

```sn
class Hero {
  // ...
  public fn fight (ennemy: Hero) {
    if this.hp == 0 {
      println!(`${this.name} cannot fight because he's dead.`);
      return ;
    }

    if ennemy.hp == 0 {
      println!(`${ennemy.hp} cannot fight because he's dead.`);
      return ;
    }

    println!(`${this.name} is fighting ${ennemy.name}!`);

    if this.atk > ennemy.hp {
      // Won the fight
      ennemy.hp = 0;

      // Win some experience
      this.exp += 100u;
    } else {
      ennemy.hp -= this.atk;
    }

    // It's ennemy turn!
    ennemy.fight(this);
  }
}
```

As you can see, a class can read the private members of any other instance of itself. We can now make two ennemies fight against each other:

```sn
val jack = new Hero('Jack', 100u, 20u, 0u);
val john = new Hero('John', 100u, 10u, 0u);

jack.fight(john); // Prints: 'Jack is fighting John!'
                  // Prints: 'John is fighting Jack!'

println!(jack.hp); // Prints: '90'
println!(john.hp); // Prints: '80'
```

Here is the whole code for reference:

```sn
class Hero {
  public readonly name: string;
  public readonly hp: uint;
  public readonly atk: uint;
  public readonly exp: uint;

  public fn %new (name: string, hp: uint, atk: uint, exp: uint) {
    this.name = name;
    this.hp = hp;
    this.atk = atk;
    this.exp = exp;
  }

  public fn fight (ennemy: Hero) {
    if this.hp == 0 {
      println!(`${this.name} cannot fight because he's dead.`);
      return ;
    }

    if ennemy.hp == 0 {
      println!(`${ennemy.hp} cannot fight because he's dead.`);
      return ;
    }

    println!(`${this.name} is fighting ${ennemy.name}!`);

    if this.atk > ennemy.hp {
      // Won the fight
      ennemy.hp = 0;

      // Win some experience
      this.exp += 100u;
    } else {
      ennemy.hp -= this.atk;
    }

    // It's ennemy turn!
    ennemy.fight(this);
  }
}

// Test the class
val jack = new Hero('Jack', 100u, 20u, 0u);
val john = new Hero('John', 100u, 10u, 0u);

jack.fight(john); // Prints: 'Jack is fighting John!'
                  // Prints: 'John is fighting Jack!'

println!(jack.hp); // Prints: '90'
println!(john.hp); // Prints: '80'
```

### Members in depth

Members can either be public with `public`, so they can be accessed from the outside, or private with `private`, so they are only readable from the inside of the class:

```sn
class Example {
  public known: string;
  private secret: string;

  public fn %new () {
    this.known = 'Public data';
    this.secret = 'Secret data';
  }
}

let obj = new Example;

obj.known; // Works fine
obj.secret; // ERROR (private member)
```

This also works for methods: they can be public or private to be available - or not - from the outside. The `this` keyword can be replaced by the `@` symbol, too:

```sn
class Example {
  public known: string;
  private secret: string;

  public fn %new () {
    @known = 'Public data';
    @secret = 'Secret data';
  }
}
```

We can provide a default value for attributes, so we don't have to assign them in the constructor:

```sn
class Example {
  public known = 'Public data';
  private secret = 'Secret data';

  public fn %new () {}
}
```

Also, as attributes are entities, they can be marked as constant using `val`, or as plain using `pln`. By default, they are implicitly mutable.

```sn
class Example {
  public pln KNOWN = 'Public data';
  private val secret = 'Secret data';
}
```

Another keyword for members is `static`, which makes the member accessible statically, meaning we have to refer to the class itself instead of referring to instance:

```sn
class Example {
  public static name = 'Hello';
}

println!(Example.name); // Prints: 'Hello'
println!((new Example).name); // ERROR (static member)
```

Static attributes must have an initialization value. Classes can access their static members using the `self` keyword:

```sn
class Example {
  public static name = 'Hello';

  public static fn printName () {
    println!(self.name);
  }
}

Example.printName(); // Prints: 'Hello'
```

### Data structure members

Data structures can also be members of classes ; they then become a local type of the class:

```sn
class Example {
  public struct Hero {
    name: string;
    hp: uint;
    atk: uint;
    mut exp: uint;
  }

  public val hero = Hero {
    name: 'Jack',
    hp: 100u,
    atk: 20u,
    exp: 0u
  };
}
```

### Practice: a RPG map

Let's conclude this chapter with a little exercice. We want to represent a RPG map and a player moving on it using a class. A map is a grid of cells, each cell being either an empty cell we can walk on, a rock we can't go through, or a trap that prevents our player from moving.

We can specify the player's start coordinate when instanciating the class, and move it using the class' methods. The player can only move from a case to an adjacent one.

It must be possible to check anytime if the player has been trapped, and to get its X and Y coordinates on the map.

The problem may appear to be complex but it is in fact very simple. Read the solution below when you're done. If you can't solve it, try to read again what we saw before and think about the structure of the class. If you're still stuck, read the first part of the solution, then try to make the class again.

#### Part 1: Representing the cells

To represent the cells, we will use a simple enumeration. Because it is specific to our class, it will be a member of it:

```sn
class Map {
  public enum Cell { EMPTY, ROCK, TRAP };
```

#### Part 2: The constructor

We told the constructor must accept the player's start position. We can simply take two coordinates, X and Y, both of `usize` type. But we also have to take the map's cells, which in our case will be a matrix (an array of arrays) made of `Cell` values. Because we are dealing with array, it's easier to deal with coordinates of the same type than the array's indexes.

Here is our constructor's signature:

```sn
  public fn %new (map: Cell[][], x: usize, y: usize) {
```

#### Part 3: The attributes

We have to store our map, as well as the current player's coordinates. So we have three attributes:

```sn
  public readonly map: Cell[][];
  public readonly x: usize;
  public readonly y: usize;
```

But it's easier to also have an attribute to check if the player is trapped, so let's add a fourth one:

```sn
  // ...
  public readonly trapped: bool = false;
```

Thanks to the attributes being public, we can check at anytime the player's coordinates with `.x` and `.y`, as well as if it's trapped or not using `.trapped`.

#### Part 4: Writing the constructor's body

Let's initialize our attributes:

```sn
  // ...
  public fn %new (map: Cell[][], x: usize, y: size) {
    @map = map;
    @x = x;
    @y = y;
  }
```

#### Part 5: Declaring simple methods

Because our player can only move on adjacent cells, the easiest solution is to make height methods (up-left, up, up-right left, right, down-left, down, down-right). But because we will have to check, at each move, if the player is running into a rock or is being trapped, we will use a dedicated method in them:

```sn
  // ...
  public fn moveUpLeft    () { @move(x - 1, y - 1); }
  public fn moveUp        () { @move(x, y - 1); }
  public fn moveUpRight   () { @move(x + 1, y - 1); }
  public fn moveLeft      () { @move(x - 1, y); }
  public fn moveRight     () { @move(x + 1, y); }
  public fn moveDownLeft  () { @move(x - 1, y + 1); }
  public fn moveDown      () { @move(x, y + 1); }
  public fn moveDownRight () { @move(x + 1, y + 1); }

```

#### Part 6: The `move` method

Let's make our `move` method. First, its signature:

```sn
  // ...
  public fn move (x: usize, y: usize) {
```

We have to check that are moving to an adjacent case:

```sn
    // Moves are only allowed to adjacent cells
    if (@x - x).abs() > 1 || (@y - y).abs() > 1 {
      println!('Cannot move on a non-adjacent cell');
    }
```

Also, the player cannot move if it's already trapped:

```sn
  // Moves are forbidden when the player is trapped
  elsif @trapped {
    println!('Cannot move because the player is trapped');
  }
```

We can't run into a rock:

```sn
  // Can't run into a rock
  elsif @map[y][x] == Cell.ROCK {
    println!('Cannot run into a rock');
  }
```

Else, we can move:

```sn
  // Move fine
  else {
    @x = x;
    @y = y;
  }
```

But if we ran into a trap cell, we are now trapped:

```sn
  // Move fine
  else {
    @x = x;
    @y = y;

    if @map[y][x] == Cell.TRAP {
      println!('You just felt in a trap!');
      @trapped = true;
    }
  }
```

#### Complete solution

Here is the full solution:

```sn
class Map {
  public enum Cell { EMPTY, ROCK, TRAP };

  public readonly map: Cell[][];
  public readonly x: usize;
  public readonly y: usize;
  public readonly trapped: bool = false;

  public fn %new (map: Cell[][], x: usize, y: size) {
    @map = map;
    @x = x;
    @y = y;
  }

  public fn moveUpLeft    () { @move(x - 1, y - 1); }
  public fn moveUp        () { @move(x, y - 1); }
  public fn moveUpRight   () { @move(x + 1, y - 1); }
  public fn moveLeft      () { @move(x - 1, y); }
  public fn moveRight     () { @move(x + 1, y); }
  public fn moveDownLeft  () { @move(x - 1, y + 1); }
  public fn moveDown      () { @move(x, y + 1); }
  public fn moveDownRight () { @move(x + 1, y + 1); }

  public fn move (x: usize, y: usize) {
    // Moves are only allowed to adjacent cells
    if (@x - x).abs() > 1 || (@y - y).abs() > 1 {
      println!('Cannot move on a non-adjacent cell');
    }

    // Moves are forbidden when the player is trapped
    elsif @trapped {
      println!('Cannot move because the player is trapped');
    }

    // Can't run into a rock
    elsif @map[y][x] == Cell.ROCK {
      println!('Cannot run into a rock');
    }

    // Move fine
    else {
      @x = x;
      @y = y;

      if @map[y][x] == Cell.TRAP {
        println!('You just felt in a trap!');
        @trapped = true;
      }
    }
  }
}
```

This code can still be improved, for example by checking if the player's position is valid in the constructor. If it's not, what about searching the first empty cell of the map?

Also, be aware of the map: its cells can be modified anytime. Indeed, though map cannot be written from the outside, its values can, as it is a vector.

## Advanced classes

Classes have other features we will see in this chapter.

### Values dropping

First, let's introduce the concept of _overload_: an overload is a class method, starting with a purcent symbol `%`. It is called like this because it _overloads_ a behavior of the language: the constructor overloads the behavior of instanciation.

Let's now consider the following code, representing users:

```sn
class User { /* ... */ }

let value = new User;
value = new User;
```

The first `A` instance is dropped when the second assignment occurs, because no entity uses it anymore. When a value is dropped, the memory it uses is _freed_, so we can't use the value anymore (which is not a problem because we don't refer to it). Also, when we reach the end of a scope, all entities that have no reference outside of this scope are dropped.

Still, we could want to notify some of the code the user is going to be dropped. For that, we can use the _destructor_, which is called just before the instance is dropped.

```sn
class User {
  private static counter = 0u;
  private id: uint;

  public fn %new () {
    self.counter ++;
    @id = self.counter;
    println!(`User ${@id} has been created`);
  }

  public fn %drop () {
    println!(`User ${@id} will be dropped`);
  }
}

let value = new User;
value = new User;
```

This code will first print `User 1 has been created`, then `User 2 has been created`, `User 1 will be dropped` and then `User 2 will be dropped`.

Let's see the timeline of events:

* A first user is instanciated (`User 1 has been created`) ;
* It is assigned to `value` ;
* A second user is instanciated (`User 2 has been created`) ;
* It is assigned to `value` ;
* The first user is dropped because there are no reference to it anymore (`User 1 will be dropped`) ;
* We reach the end of the scope, the second user is dropped (`User 2 will be dropped`)

As you can see, the dropping occurs only just before the new instance is assigned to the entity, and not when it is created. Also, note that, when the destructor returns, the instance is definitely freed.

### Cloning

Cloning allows to get a new instance of a class that is equivalent to an existing, given instance. This feature is an answer to the following problem:

```sn
fn squareList (array: int[]) : int[] {
  for i = 0p; i < array.length; i ++ {
    array[i] *= array[i];
  }

  return array;
}

val array = [ 2, 7, 8 ];
val squares = squareList(array);

println!(squares[1]); // Prints: '49'
println!(array[1]); // Prints: '49'
```

The explanation is simple: when we gave our array to the `squareList` function, it kept a reference to the original `array`, which means any modification on its value is reflected on the original one. Then, the function returned the modified array, which is still a reference to the original one. The result is assigned to `squares`, which results in all values of `squares` being linked to `array`'s ones.

This behavior is specific to objects and is their key difference with primitives: when modifying an existing primitive value, a whole new primitive is created, with no link to the original one. That's not the case for objects, as it would be way too costly and result in unwanted behaviors in specific cases.

The solution to our problem is to clone the array:

```sn
fn squareList (array: int[]) : int[] {
  for i = 0p; i < array.length; i ++ {
    array[i] *= array[i];
  }

  return array;
}

val array = [ 2, 7, 8 ];
val squares = squareList(clone array);

println!(squares[1]); // Prints: '49'
println!(array[1]); // Prints: '7'
```

By default, objects are not clonable. Vectors simply implement a cloning method. As you can see, we can call any class overload like a standard method, simply prefixing it with its `%` symbol. The only limitation is that we cannot call the constructor or the destructor manually from the outside of the class, as they are triggerred in specific situations - but the inside of the class can still call them if needed.

The cloning overload is a method that takes no argument and returns an instance of the current class. When we try to clone an instance, this overload is called and its return result is the returned clone:

```sn
class Example {
  public readonly name: string;

  public fn %new (name: string) {
    @name = name;
  }

  public fn setName (newName: string) {
    @name = newName;
  }

  public fn %clone () : self {
    println!('Instance has been cloned.');
    return new Example(@name);
  }
}

let a = new Example('A');

let b = a;
let c = clone a;

b.setName('B');
c.setName('C');

println!(a); // Prints: 'B'
println!(b); // Prints: 'B'
println!(c); // Prints: 'C'
```

### Serialization

Serialization allows to save an object as a string, in order to restore it later. It goes through two steps: serialization, with turns the instance into a string, and unserialization, which turns a string into an instance.

The serialization overload takes no argument and returns a string. In our `Example` class, where we simply have to save a name, the string could simply be the name itself.

```sn
  // ...
  public fn %serialize () {
    return @name;
  }
```

The unserialization overload takes a string argument and returns an instance of the current class. It goes like this (we wil see what the `throws` part mean later):

```sn
  // ...
  public static fn %unserialize (serialized) throws UnserializationError {
    return new Example(@name);
  }
```

When we have several fields, it becomes a bit more complicated, as we have to deal with specific representation of the data. In this case, we can use the _lazy overload_:

```sn
  // ...
  public pln %lazy_serial_fields = ('name');
```

This plain tuple contains the list of the attributes to serialize. The specified attributes must be serializable themselves.

With the lazy overload, the program will automatically handle serialization and unserialization, as well as checking if the serialized content is valid or not.

If you want to be ensure the serialized content is valid, it's possible to make the program computing a checksum that it'll join to the serialized content. At unserialization time, the checksum will be checked again to ensure data haven't been corrupted. To enable this feature, simply add a `WITH_CHECKSUM` item at the end of the tuple:

```sn
  // ...
  public pln %lazy_serial_fields = ('name', WITH_CHECKSUM);
```

The big advantage of checksum is that it highly reduces the risks to get invalid values, but the downside is that both serialization and unserialization will be considerably slower.

### Arithmetic overloads

Some arithmetic operators can be overloaded in a class, allowing to use them on the class' instances:

```sn
class MyInt {
  public readonly value: int;

  public fn %new (value: int) {
    @value = value;
  }

  public fn %add (another: self) {
    return new MyInt(@value + another);
  }
}

val one = new MyInt(1);
val two = new MyInt(2);

val three = one + two;

println!(three.value); // Prints: '3'
```

If we don't provide types, operator overloads take an instance of the current class as an argument and return another. This behavior can be changed, though:

```sn
class MyInt {
  public readonly value: int;

  public fn %new (value: int) {
    @value = value;
  }

  public fn %add (another: MyInt) : int {
    return @value + another.value;
  }
}

val one = new MyInt(1);
val two = new MyInt(2);

println!(one + two); // Prints: '3'
```

Here is the list of overloadable arithmetic operators:

* `%add` for `+` ;
* `%sub` for `-` ;
* `%mul` for `*` ;
* `%div` for `/` ;
* `%mod` for `%` ;
* `%pow` for `**`

### Comparison overloads

As for arithmetic operators, comparison operators can be overloaded in classes.

```sn
class Hero {
  public readonly name: string;

  public fn %new (name: string) {
    @name = name;
  }

  public fn %equal (another: self) : bool {
    return @name == another.name;
  }
}

println!(new Hero('Jack') == new Hero('Jack')); // Prints: 'true'
println!(new Hero('Jack') == new Hero('John')); // Prints: 'false'

println!(new Hero('Jack') != new Hero('Jack')); // Prints: 'false'
println!(new Hero('Jack') != new Hero('John')); // Prints: 'true'
```

The `%equal` overload returns `true` if the compared entity is equal to itself, `false` else. The inequality operator (`!=`) is automatically supported as the opposite (returns `true` if `%equal` returns `false`).

Classes implementing this overload implement the `EqualityChecking<T>` interface, where `T` is the type of the argument specified in the overload (here, `Hero`).

There is also a more advanced overload to compare values in a more advanced way:

```sn
class BankAccount {
  public readonly amount: uint;

  public fn %new (amount: uint) {
    @amount = amount;
  }

  public fn %compare (another: self) : Comparison {
    if @amount > another.amount {
      return Comparison.GREATER;
    } elsif @amount < another.amount {
      return Comparison.SMALLER;
    } else {
      return Comparison.EQUAL;
    }
  }
}

println!(new BankAccount(2000u) == new BankAccount(2000u)); // Prints: 'true'
println!(new BankAccount(2000u) != new BankAccount(1000u)); // Prints: 'true'

println!(new BankAccount(2000u) > new BankAccount(1000u)); // Prints: 'true'
println!(new BankAccount(2000u) < new BankAccount(1000u)); // Prints: 'false'
```

The `%compare` overload returns one of the `Comparison` enumeration's values: either `GREATER` to indicate the current instance is greater than the one it compares too, either `SMALLER` to indicate its smaller, or finally `EQUAL` to indicate they are both equal.

Implementing `%compare` automatically implements `%equal`. To avoid duplicate and useless code, they cannot be put together in the same class. Also, all classes implementing this overload implement the `ComparableTo<T>` overload, where `T` is the type of the argument specified in the overload.

### Friends

A class' _friend_ is a function or a whole class that is allowed to access the class' instances' private members:

```sn
class Example {
  // Declare a function as a friend
  friend fn function (obj: Example);

  // Declare a class' method (static or not) as a friend
  friend fn AnotherClass.method (obj: Example);

  // Declare a whole class as a friend
  friend class AnotherClass (obj: Example);
}
```

Classes are always friend of themselves, this is why they can access their own private members using `this` or `self`, why it's not possible from the outside by default.

### Extensions

Extensions are the only way to add a method to a class after the end of its declaration. For example, let's say we want to create a `.countA` function that couts the number of `A` letters in a string. Because the class was already declared before, we cannot add it a public method called `countA` ; so we use an _extension_:

```sn
extension<string> fn countA () : uint {
  let counter = 0u;

  for i in 0..this.length {
    counter ++ if this.charAt(i) === 'a';
  }

  return counter;
}

println!('Hello Jack!'.countA()); // Prints: 1
```

Extensions don't really add a member to the class, they simply allow to use a function on any instance of a given type.

## Cross-typing

_Cross-typing_ is the concept of either converting a value to another type, or to use a type of value when another is expected. This is a key feature of the language, as many concepts are built upon it.

### Inheritance

Let's say we have a `Hero` class. We want to represent both a warrior and a wizard with it. Our warrior would have a rage counter  that increases each time it fights, which will increase its own attack, while the wizard would have magic points to launch fireballs.

The simpliest way to achieve this is the following:

```sn
class Hero {
  public readonly wizard: bool;
  public readonly name: string;
  public readonly hp: uint;
  public readonly atk: uint;
  public readonly exp: uint;
  public readonly rage: uint;
  public readonly mp: uint;

  public fn %new (wizard: bool, name: string, hp: uint,
                  atk: uint, exp: uint, rage: uint, mp: uint) {
    @wizard = wizard;
    @name = name;
    @hp = hp;
    @atk = atk;
    @exp = exp;
    @rage = rage;
    @mp = mp;
  }

  // ...
}
```

We would then have to implement a `.fight()` containing a special treatment for warriors, as well as a `.fireball()` method that prints an error message if the hero is not a wizard.

There are many problems here: we are mixing independant pieces of code (the code for warriors and the one for wizards), our constructor is a lot heavier because it also takes informations about the type our hero hasn't, and the `.fireball()` method may fail because we are not use the hero is a warrior.

A solution to this is to use _inheritance_. It simply consists in creating a base class, called the _mother class_, which describes attributes and methods common to all types of heroes. Then, we create a _child class_ that inherits all its members and define its own. In our example, it goes like this:

```sn
open class Hero {
  public readonly name: string;
  public readonly hp: uint;
  public readonly atk: uint;
  public readonly exp: uint;

  public fn %new (name: string, hp: uint, atk: uint, exp: uint) {
    @name = name;
    @hp = hp;
    @atk = atk;
    @exp = exp;
  }

  // Returns 'true' if the fight has been done successfully
  public fn fight (ennemy: Hero) : bool {
    if @hp == 0 {
      println!(`${@name} cannot fight because he's dead.`);
      return false;
    }

    if ennemy.hp == 0 {
      println!(`${ennemy.hp} cannot fight because he's dead.`);
      return false;
    }

    println!(`${@name} is fighting ${ennemy.name}!`);

    if @atk > ennemy.hp {
      // Won the fight
      ennemy.hp = 0;

      // Win some experience
      @exp += 100u;
    } else {
      ennemy.hp -= @atk;
    }

    // It's ennemy turn!
    ennemy.fight(this);
    return true;
  }
}
```

This is our mother class. It defines attributes that are common to all type of heroes (name, health points, attack points, experience), as well as a fight method.

The `open` keyword indicates the class can be inherited, which is not allowed by default.

You may wonder why we define one as the warrior fights a different way. That's because our child class will implement its own fight method that will take in consideration the warrior's rage and then call its mother's fight method:

```sn
class Warrior extends Hero {
  public readonly rage: uint;

  public fn %new (name: string, hp: uint, atk: uint, exp: uint, rage: uint) {
    @name = name;
    @hp = hp;
    @atk = atk;
    @exp = exp;
    @rage = rage;
  }

  public fn fight (ennemy: Hero) {
    // Call mother's fight method
    // If it succeeds, win rage points (limited to 20)
    if super.fight(ennemy) && @rage < 20 {
      @rage += 10;
      @attack += 10;
    }
  }
}
```

Child classes can redefine a method that already exists in their mother. It's called _overriding_.

The `extends` keyword indicates the current class (on its left) is inheriting from another (on its right).

The `super` object refers to the mother class as an instance, meaning we can use its original methods, applied on the current class. Here, this allows to affect our warrior's hp.

Also, constructors are not inherited by child classes. This is to avoid specialization problems: if we inherited from `Hero`'s constructor in `Warrior`, we would have been able to create a warrior that doesn't have an initial rage amount, which is a big problem. In order to avoid this, constructors are not inherited by default.

Let's write our wizard class:

```sn
class Wizard extends Hero {
  public readonly mp: uint;

  public fn %new (name: string, hp: uint, atk: uint, exp: uint, mp: uint) {
    super(name, hp, atk, exp);
    @mp = mp;
  }

  public fn fireball (ennemy: Hero) {
    if @hp == 0 {
      println!('Cannot launch a fireball while being dead');
      return ;
    }

    if @mp < 10 {
      println!('At least 10 MP are required to launch a fireball');
      return ;
    }

    // Temporarily increase the attack to launch the fireball
    @atk *= 2;

    println!(`${@name} is launching a fireball!`);

    @fight(ennemy);

    // Go back to a normal attack
    @atk *= 2;
  }
}
```

We shortened the child class' constructor by calling the mother's one using `super(...)`. This instruction calls the constructor of the mother class. It can also be used with `this(...)` if we want to call another constructor from an existing one, for example.

#### Protected members

The specificity of private members is that they cannot be accessed from the outside of the class, not even by the child classes. In order to make members that are not available from the outside of the class but still from its child classes, we can mark them as protected using the `protected` keyword:

```sn
class Mother {
  public public = 1;
  protected protected = 2;
  private private = 3;

  // Available here: 'public', 'protected', 'private'
}

class Child extends Mother {
  // Available here: 'public', 'protected', but not 'private'
}

new Child; // Available here: 'public', but not 'protected' and 'private'
```

### Introducing sub-typing

In classes, every child class of a given one are considered as its _sub-types_. This means that both `Warrior` and `Wizard` are sub-types of `Hero`.

When a value of a given type is expected (for example in a function's argument), it's possible to give instead a value of any of its sub-types:

```sn
val jack: Hero = new Warrior('Jack', 100u, 20u, 0u, 0u);
```

The above code works, because `Warrior` is considered as being a `Hero` value. This is the main point of cross-typing. Note that, if we call `.fight` on it, it will call the overriden method, not the original one. The only limitation though is that we cannot access members that are directly declared in `Hero`, like `.fireball` for `Wizard`:

```sn
val jack: Hero = new Warrior('Jack', 100u, 20u, 0u, 0u);
val john: Hero = new Wizard('John', 100u, 10u, 0u, 0u);

jack.fight(john); // Works ('fight' exists in 'Hero')
john.fireball(jack); // ERROR ('fireball' does not exist in 'Hero')
```

Conceptually, sub-typing allows to use any sub-type's value instead of the expected type's value.

#### Resolution keywords

There are four _resolution keywords_:

* `this`, which refers to the instance we are manipulating ;
* `self`, which refers to the current class ;
* `super`, which refers to the current class' mother (if there is one, else it is simply not defined) ;
* `_real`, which refers to the real class of the instance we are manipulating

This last keyword is a bit special. For example, in our `Hero` class, `self` will always refer to `Hero`, but `_real` may refer either to `Hero`, `Warrior` or `Wizard`. In our `jack` object, it would refer to `Warrior`, and to `Wizard` for `john`. This may not appear very useful, but we will see some useful applications of it later.

To simplify, `_real` is the type of `this`, so it is always a sub-type of `self`.

### Constructor inheritance

As we saw, constructors are not inherited by child classes. But we can force inheritance by indicating manually the constructors we want to inherit:

```sn
open class Mother {
  public fn %new (name: string) {
    println!(name);
  }

  public fn %new (name: string[]) {
    println!(name.join(' '));
  }
}

class Child extends Mother {
  super(name: string);
}
```

Our `Child` class will inherit only the first constructor. It's also possible to inherit all constructors at once:

```sn
open class Mother {
  public fn %new (name: string) {
    println!(name);
  }

  public fn %new (name: string[]) {
    println!(name.join(' '));
  }
}

class Child extends Mother {
  super(...);
}
```

### Stated classes

#### Opened and sealed classes

We already saw a first _class state_: `open`. It allows a class to be inherited as it's not possible by default (in this case, the class is _sealed_):

```sn
class MotherA {}
open class MotherB {}

class ChildA extends MotherA {} // ERROR
class ChildB extends MotherB {} // Works fine
```

#### Virtual classes

Classes can also be prefixed with the `virtual` state: it indicates the class cannot be instanciated. The only way to instanciate such a class is to create a child class of it and instanciate this last one. Virtual classes are automatically opened.

```sn
virtual class Mother {}
class Child extends Mother {}

new Mother(); // ERROR
new Child(); // Works fine
```

#### Static classes

The `static` state indicates the class only contains static members, and so it cannot be instanciated. Also, static classes cannot be inherited, which makes this state act like a virtual state but without opening.

```sn
static class Mother {}

class Child extends Mother {} // ERROR
new Mother(); // ERROR
```

#### Summary

|  Keyword  | Instanciable? | Inheritable? |
|-----------|---------------|--------------|
|  `open`   |      Yes      |      Yes     |
| _nothing_ |      Yes      |      No      |
| `virtual` |      No       |      Yes     |
| `static`  |      No       |      No      |

### Stated methods

#### Virtual methods

Methods can be stated, too. We already saw static methods, but they can also be virtual, meaning they must be defined in child classes. Such methods don't have a body in the original class, and so require the class itself to be virtual:

```sn
virtual class Mother {
  virtual public fn sayHello ();
}

class ChildA extends Mother {
  // ERROR: 'sayHello' is not declared
}

class ChildB extends Mother {
  public fn sayHello () {
    println!('Hello world!');
  }
}
```

Note that, if the child class is virtual itself, it doesn't have to re-declare the same methods ; they are implicitly virtual and will have to be declared in its own child class.

#### Abstract methods

Abstract methods, on their side, are virtual methods declared with a body. This allows to call the method from the original class, and it is not forced to be virtual itself:

```sn
class Mother {
  abstract public fn sayHello () {
    println!('Hello from mother!');
  }
}

class ChildA extends Mother {
  // ERROR: 'sayHello' is not declared
}

class ChildB extends Mother {
  public fn sayHello () {
    println!('Hello from child!');
  }
}

(new Mother).sayHello(); // Prints: 'Hello from mother!'
(new ChildB).sayHello(); // Prints: 'Hello from child!'
```

#### Final methods

Final methods are the opposite of abstract methods: they are defined in the original class but **cannot** be overriden in child classes:

```sn
class Mother {
  final public fn sayHello () {
    println!('Hello from mother!');
  }
}

class Child extends Mother {
  // ERROR: method is final
  public fn sayHello () {
    println!('Hello from child!');
  }
}
```

### Structures compatibility

Any structure that implements every single field of another with the same mutability is considered as a sub-type of this last one. Example:

```sn
struct A {
  name: string;
}

struct B {
  name: string;
  age: uint;
}
```

Here, `B` is a sub-type of `A`, because it implements all the fields `A` has, plus its own ones. The opposite is not true: as `A` does not implement `age: uint`, it is not a sub-type of `B`.

Note that, if `name` was marked as mutable in a structure and not in the other, `B` wouldn't have been a sub-type of `A`.

Also, plain fields are tolerated where a constant field is expected:

```sn
struct A {
  name: string;
}

struct B {
  pln name: string;
  age: uint;
}

val jack: A = B {
  name: 'Jack'
}; // Works fine
```

The field will simply act as constant and not plain.

A last exception is for mutable fields when declaring objects. Let's take the following example:

```sn
struct A {
  mut a: int;
}

val obj = {
  a: 2
};

val casted: A = obj; // ERROR
```

An error is thrown error because implicitly the `a` field in our `obj` constant is a plain constant, so it can only be accepted if the target structure's field is a plain constant or a simple constant, but not if it is mutable.

To solve this case, we must specify our field is mutable in `obj`:

```sn
struct A {
  mut a: int;
}

val obj = {
  mut a: 2
}:

val casted: A = obj; // Works fine
```

#### Structures inheritance

Structures can even inherit from other ones:

```sn
struct A {
  name: string;
}

struct B extends A {
  age: uint;
}

val jack = B {
  name: 'Jack', // 'name' is required
  age: 24u
};
```

### Safe typecasting

Safe typecasting allows to convert any value of a given type to another one. It is checked at build time and cannot fail at runtime.

Safely typecasting a value of type `A` to type `B` is allowed when:

* `B` is a parent type of `A` (e.g. a mother class of `A`) ;
* `A` implements a typecasting overload to `B`

Here is how it goes for the first case:

```sn
// Mother class
class A {}

// Child class (sub-type of 'A')
class B extends A {}

val b = new B; // Type: 'B'

// Typecast 'b' from type 'B' (child) to type 'A' (mother)
val a = b as A; // Type: 'A'
```

The second case is described below.

### Typecasting overloads

Typecasting overloads allow to statically typecast a given type to another, even when they are not sub-type of the other:

```sn
class A {
  private message = 'Hello world!';

  public fn %to<-B> () {
    return new B(@message);
  }
}

class B {
  public readonly message: string;

  public fn %new (message: string) {
    @message = message;
  }
}
```

We can now statically typecast any `A` value to `B` (but not the opposite, as `B` does not implement any typecasting overload for that):

```sn
let a = new A;
let b = a as B; // Works fine

println!(b.message); // Prints: 'Hello world!'
```

Numbers implement a typecasting overload for each other number type, so the following conversion is allowed:

```sn
let small = 8b;
let large = 2050u;

small = <i8> large; // Works fine (but overflows)

println!(small); // Prints: '2'
```

#### Automatic typecast

These overloads can be triggered automatically thanks to the `#auto` directive. To take again our example, this means that any `A` value would automatically be converted to `B` where a `B` value is expected, without using the `as` keyword:

```sn
class A {
  private message = 'Hello world!';

  #auto
  public fn %to<-B> () {
    println!('Typecasting to B');
    return new B(@message);
  }
}

class B {
  public readonly message: string;

  public fn %new (message: string) {
    @message = message;
  }
}

let a: A = new A;
let b: B = a; // Works fine (prints: 'Typecasting to B')
```

This last instruction would have fail at build time if we haven't used the `#auto` directive. Instead, we would have had to use a safe typecast.

Arrays use this automatic behaviour, that's why it's possible to use an unknown-sized array (`int[]`) where expecting a fixed-size one (`int[3]`) without any explicit conversion, as well as the opposite.

A similar behavior to automatic typecasting overloads is implemented for parent types of a given one, which allows to give a value of a type where a value of a parent type is expected.

### Interfaces

Interfaces allow to describe members of a class. Like for structure compatibility, each class that implements all of its members is considered as a sub-type of this interface. Some of widely used in the language, such as the following one:

```sn
interface Stringifyable {
  fn %to<-string> ();
}
```

Every class that implements the `%to<-string>` typecast overload will be `Stringifyable`. Note that the visibility is not indicted here as an interface only describes public members.

```sn
class A impl Stringifyable {
  public fn %to<-string> () {
    return 'Hello world!';
  }
}

val obj: Stringifyable = new A;

println!(obj as string); // Prints: 'Hello world!'
```

You may notice the `impl Stringifyable` part: it indicates the class implements a given interface. Though it's entirely optionnal - this could would have worked without this code - it's highly recommanded because it explicits the class' intentions (it is intended to be stringifyable) and avoids forgetting to implement a given member of the interface.

There is another widely-used interface:

```sn
interface Any {}
```

Because it has no member, every class implements its members, and so every class is considered as being a sub-type of it.

Also, every object that implements an interface's members is considered as one of its sub-types, which means absolutely any value is an `Any` value (as primitive types generate special objects too).

### Traits

Traits are kind of virtual classes: they describe a set of members, but their methods are declared with a body, too. The goal is to allow re-using some pieces of code across classes that are not mother and child of each other.

```sn
trait Vehicle {
  val speed: f32;

  fn accelerate () : string {
    return 'Vroom!';
  }
}

trait Wheeled {
  val wheels: uint;
}
```

As for interfaces, traits only describe public members and so there is no visibility keyword. Traits are implemented using the `use` keyword:

```sn
class Car {
  use Vehicle, Wheeled;
}

// Sub-typing works fine
val car: Vehicle = new Car();
// Try a function
printlnl!(car.accelerate()); // Prints: 'Vroom!'
```

Traits can also use other traits:

```sn
trait Bike {
  use Vehicle;

  fn stop () : string {
    return 'Scriiii';
  }
}
```

Or even implement interfaces:

```sn
interface Vehicle {
  val speed: f32;
}

trait Bike impl Vehicle {
  val speed: f32;

  fn accelerate () : string {
    return 'Vroom!';
  }

  fn stop () : string {
    return 'Scriiii';
  }
}
```

### Typecasting paths

Let's consider the following code:

```sn
class A {
  public fn %to<-B> () {
    return new B;
  }
}

class B {
  public fn %to<-C> () {
    return new C;
  }
}

class C {}
```

We want to create, let's say, a variable, which accepts any value that can be typecasted to a `C`. This accepts `B` values but not `A` ones. Now, we want to accept any value that can be typecasted to a type that itself can be converted to a `C`. It would also accept `A` as we can get a `C` value by first typecasting it to a `B` one.

This can be achieved using a _typecasting path_, which goes like this:

```sn
interface ConvertibleToC {
  // Typecasting path
  typepath C = B;
}
```

It is divided in two parts: the _target_, which is `C`, and the _candidates_, which are the types that can be directly typecasted to the target. Any type that is typecastable to any of the candidates (or to the target type itself, of course) will be considered as implementing the path. When a typecast will be performed between this type and the target, it will first use typecast it to the given candidate type, and then to the target type. The value implementing this path itself will so support typecasting to the target:

```sn
let short: A = new A;
let long: ConvertibleToC = new A;

short as C; // ERROR (cannot be typecasted to C)

long as C; // Works fine
// Equivalent to:
(long as ConvertibleToC) as C;
// If we get rid of the path:
(long as B) as C;
```

The path can contain several types:

```sn
interface ConvertibleToF {
  type F = D | E;
}
```

In the case our type implements typecasting overload to two or more types in the path, the first one in the list is taken:

```sn
interface ConvertibleToF {
  type F = D | E;
}

// Candidate
class D {
  public fn %to<-F> () {
    return new F;
  }
}

// Candidate
class E {
  public fn %to<-F> () {
    return new F;
  }
}

// Target
class F {}

// A sample class
class G {
  public fn %to<-D> () {
    println!('Typecasted to D');
    return new D;
  }

  public fn %to<-E> () {
    println!('Typecasted to E');
    return new E;
  }
}

(new G) as F; // Prints: 'Typecasted to D'
```

## Templates

### The concept

To illustrate the concept of templates, let's take an example. We want to create a function that adds two numbers, and return a result with the type of the second one, where the addition operator always return a value with the type of the left operand.

With what we've seen so far, this is impossible because the return type of a function must be fixed. Templates allow to change this:

```sn
op fn plus<T> (left: CanAdd<T>, right: T) : T {
  return (left + right) as T;
}
```

We will detail this example part by part. First, we declare an operator function called `plus`. We then join it a _template_ called `T`, which must be a type (a class, an interface, a structure...).

The operator's right operand has the template type, and this is the same type the operator returns a value of. The left operand is of type `CanAdd<T>`, which is an interface made to accept values of all types implement the `%add` method with an argument of the given type. Otherwise, our program wouldn't have worked because the `+` operator doesn't work on non-`CanAdd<T>` values.

We can now use our operator function:

```sn
let i: int = 2u plus 5; // Works fine

println!(i); // Prints: '7'
```

Templates can be used everywhere a fixed type could be used. Types that use templates, such as `CanAdd<T>`, are called _templated types_.

#### Templates in lambdas

Templates can be used in lambdas by prefixing the opening parenthesis by the templates:

```sn
val lambda = <T> (value: T[]) : usize => value.length;
```

### Optional templates

Here is its declaration of the `CanAdd` interface:

```sn
interface CanAdd<T, X = T> {
  fn %add (value: T) : X;
}
```

As you can see, this interface takes two templates, but the second one, which is the return type of the `%add` overload, is optionnal. If omitted, it will be `T`, so `CanAdd<T>` will only accept types that implement the `%add` overload taking a `T` value **and returning** a `T` value.

### Fixed templates

Templates can be _fixed_, which means they can only be a single value. This can be useful is specific situations, like in typecasting overloads: the target type is a template, as we can see by the fact it's wrapped between a `<` and a `>` symbol:

```sn
class A {
  // 'int' is a fixed template
  public fn %to<-int> () : self { /* Some stuff here */ }
}
```

This can also be used to distinguish several functions without accepting any type:

```sn
fn printValue<-int> (value: int) {
  println!('int:' + value);
}

fn printValue<-string> (value: string) {
  println!('value: ' + value);
}

printValue<int>(2); // Prints: 'int: 2'
printValue<string>('H'); // Prints: 'string: H'
```

Note that we don't specify the dash before the type's name when we call the function.

### Typechecking

It's possible for a template to accept any type that inherits from a class, implements an interface or use a trait:

```sn
fn takeNum<T extends number> (num: T) {
  println!(num);
}

takeNum<int>(2); // Prints: '2'
takeNum<uint>(2u); // Prints: '2'
```

We can ues use the following syntaxes:

* `T extends X`: T must inherit from X;
* `T impl X`: T must implement the X interface;
* `T uses X`: T must use the X trait.

They can also be chained, like `T extends X impl Y`.

### Template inference

_Template inference_ is the fourth and last type of inference (Type Inference, Inferred Structured Typing, Inferred Callback Typing, Template Inference). It allows to not omit a template, which will be inferred by the builder. Example:

```sn
fn tupleOf<X, Y> (left: X, right: X) : (X, Y) {
  return (left, right);
}

// Standard syntax
tupleOf<int, string>(2, 'Hello');
// Template inference
tupleOf(2 /* X = int */, 'Hello' /* Y = string */);
```

This is also why we wrote `2u plus 5` instead of `2u plus<int> 5` in our example operator, which makes template usage a lot lighter.

There are two cases where template inference causes ambiguity though, and these cases result in an error at build time. The first case is the following one:

```sn
fn newValue (value: int) : int {
  return value * 2;
}

fn newValue<T extends number> (value: T) : T {
  return value * 4;
}

doubleValue(8); // ERROR: Template inference ambiguity
```

There is an ambiguity because the builder doesn't know which function to use: the two match the call perfectly. To solve this problem, we must implicitly indicate what function we want to call. For the second function, we write this:

```sn
doubleValue<int>(8); // Returns: 32
```

For the first one, we use _void-templating_, which consists in explicitly telling we give no template to the class, which means we also reject template inference:

```sn
doubleValue<>(8); // Returns: 16
```

The other ambiguity happens when using undistinctable templates:

```sn
class Example<K, V> {
  public fn %new (value: K) {}
  public fn %new (value: V) {}
}

new Example(2); // ERROR: Template inference ambiguity
```

The last instruction isn't valid because the builder can't guess what function to call. We must then write the templates explicitly.

#### About the resolution keywords

The resolution keywords refer to their actual classes with all their templates:

```sn
class Example<T> {
  public fn test () {
    // Here, 'self' refers to 'Example<T>'
    //  and not 'Example'
  }
}

(new Example<uint>).test(); // In '.test': self == Example<uint>
```

We can change get the current class with other templates by rewriting them:

```sn
class Example<T> {
  public fn test () {
    // self == Example<T>
    // self<int> == Example<int>
  }
}
```

### Template values

There are two reasons to the fact _templates_ are not called _generics_ like in most other programming languages. First, because they can be fixed (and so they are not generic), and secondly because they can be of any type, while generics use to only be types.

While templates are, by default, types, they can be simple values like integers or strings:

```sn
fn createIntArray <LENGTH: usize> () : int[LENGTH] {
  return (0 for i -> 0..LENGTH);
}
```

Let's detail this example, as it's a bit complex. First, we create a `createIntArray` function that takes a `LENGTH` template, which is a `usize` value. It takes no argument and returns an array of integers with `LENGTH` elements.

In its body, we return an inline-generated array of `LENGTH` elements, all being the `0` value - as we can use templates in our code.

We can now use our function:

```sn
val arr = createIntArray<20>();
println!(arr.length); // Prints: '20'
```

Fixed-size arrays use this feature: they take a `T` template indicating the type of elements they contain, as well as a `LENGTH` template which is their number of elements.

### Wildcard template

The wildcard template can be used when we want to accept any template in a given type but won't use the template itself. Example:

```sn
fn listLength<T> (value: T[#]) : usize {
  return value.size;
}
```

In this function, we don't size the `T` template elsewhere than in the argument's type. So, we can instead replace it by the wildcard template:

```sn
fn listLength (value: List<?>) : usize {
  return value.size;
}
```

This accepts any list with an unknown template. Note that we can still get elements from the list, but as we don't know what the template is, they will be automatically typecasted to `Any` values. We can also use all methods in the list, except those who require an argument of the same type than the template, as we don't know what it is:

```sn
class Example<T> {
  public readonly value: T;

  public fn %new (value: T) {
    @size = size;
  }
}

val obj: Example<?> = new Example(2); // Example<int>
obj.value; // 'Any' value
```

Types that use the wildcard template can be typecasted to their original type using _dynamic typecasting_, a concept we will see soon.

Note that it's not possible to instanciate types using the wildcard template directly:

```sn
val obj: Example<?> = new Example<?>(2); // ERROR
val obj: Example<?> = new Example<int>(2); // Works fine
```

### Class segments

Class segments allow to make a set of members available only if a specific condition is met. For example, if we have a class representing a list of data, we could add a `.sum()` method which returns the sum of all numbers in it in the case it only contains numbers.

With all we've seen so far, this is not possible: the method will simply be available whatever the type of content is, and must handle the case where it doesn't contain only numbers.

Class segments allow to solve this problem by making our method available only if a condition we give is met. The main point is that conditions must be predictable: the builder must be able to evaluate the condition at build time. A type of valid condition is checking if a template is implementing a specific interface, using a trait or inheriting from a class:

```sn
class MyArrayClass<T> {
  // Declare a segment
  // All items in it will be available only if the condition is met
  // - which means only if 'T' is a sub-type of 'number'
  segment T extends number {
    // Our '.sum()' function
    public fn sum () : T {
      // Do some stuff here;
    }
  }
}
```

We can now try it:

```sn
(new MyArrayClass<int>).sum(); // Works fine
(new MyArrayClass<number>).sum(); // Works fine
(new MyArrayClass<bool>).sum(); // Works fine
```

### Templated overloads

Let's say we have a class representing a very large number type (e.g. 512 bits unsigned integer, so it handles from 0 to 2^512 - 1). We want to be able to add such a number to any existing number type (e.g. add it to an `int`) and return a value of the added type.

For that, we use a templated version of the addition overload:

```sn
class LargeNumber {
  public fn %add<T extends number> (num: T) : T {
    // Do some stuff here
  }
}

val largeNum = new LargeNumber;

typeof (largeNum + 2); // int
typeof (largeNum + 2.0); // f32
typeof (largeNum + 8u); // uint
```

**NOTE:** The `typeof` keyword allows to get the type of a value.

Generally speaking, it's always possible to use as many templates as we want on overloads, but only if the template can be inferred at build time:

```sn
class BankAccount {
  // ...

  // Doesn't work because 'T' cannot be guessed
  public fn %add<T> (left: string, right: int) : int[];

  // Doesn't work because 'T' cannot be guessed
  public fn %add<T> (left: string, right: int) : T;

  // Works fine
  public fn %add<T> (left: T, right: int) : bool;

  // Works fine
  public fn %add<T> (left: string, right: Map<int, T>) : string[];

  // ...
}
```

## Dictionaries in depth

In this chapter, we will see all the concepts about dictionaries.

### Dictionary classes

Dictionary classes are special classes that behaves like a dictionary, which is a set of key/value pairs. They allow to associate arbitrary keys and values. For example, vector classes are dictionary classes, as well as the `Map<K, V>` class.

They are declared using the `dict` keyword instead of the `class` one. Dictionary classes automatically implement the `Dictionary<K, V>` which describes a set of overloads they must implement:

```sn
// K = type of keys
// V = type of values
dict Custom<K, V> {
  // Get a value from a key
  public fn %get (key: K) : V;
  // Associate a value to a key
  public fn %set (key: K, value: V);
  // Remove a key and its associated value
  public fn %unset (key: K);
  // Get the number of key/value pairs
  public fn %size () : usize;
  // Check if a key exists
  public fn %has (key: K) : bool;
  // Check if a value is associated to a key
  public fn %contains (value: V) : bool;
  // Get an iterator on key-value pairs
  public fn %iterate () : Iterator<(K, V)>;
}
```

If you want to grant additional template to your dictionary class, you must manually implement the dictionary interface:

```sn
dict Custom<T, V, K> impl Dictionary<V, K> {
  // ...
}
```

Most dictionary classes should inherit from the `Map<K, V>` class which comes with many useful functions like `.filter` or `%clone`, without any restriction on the overloads itself (they can also be overwritten):

```sn
dict Custom<K, V> extends Map<K, V> {
  // ...
}
```

In this case, the dictionary class can access two protected members: `keys: List<K>` and `values: List<V>`. To force a template value, like vectors do, we can use a fixed template:

```sn
dict Vector<T> extends Map<usize, T> {
  // ...
}
```

Note that we can do in a dictionary class anything we can do in a standard class: segments, inheritance, extensions, ...

#### The `%contains` overload

This overload can be used even in non-dictionary classes, like in the `string` class:

```sn
'a' in 'abc'; // Works even though 'string'
              // is not a dictionary class
```

### Exploring dictionaries

We already _explored_ dictionaries before, notably by using the `for value in array` loop. There are several loops for this:

```sn
// Create a map
val map = new Collection<int>;
map['a'] = 2;
map['b'] = 8;

// Explore keys
for key of map {
  println!(key); // Prints: 'a' then 'b'
}

// Explore values
for value in map {
  println!(value); // Prints: '2' then '8'
}

// Explore keys and values
for key -> value in map {
  println!(key + ': ' + value); // Prints: 'a: 2' then 'b: 8'
}
```

In fact, the `in` and `of` keyword in a `for` loop automatically call the `%iterate` overload of the value on their right.

### Manipulating dictionaries

Dictionaries can be manipulated using dedicated syntaxes, shown below:

```sn
// Get a value from a key
personsAge['me'];

// Associate a value to a key
personsAge['john'] = 24;

// Get the size of the dictionary
personsAge.size; // Returns: 2

// Delete a key (and the value it refers to)
delete personsAge['john'];

// Check if a key is known
'john' keyof personsAge; // Equal to 'false'

// Check if a value is contained in the dictionary
18 in personsAge; // Equal to 'true'

// Get the array of all keys
for key -> value in personsAge {
  // ...
}
```

### Practice: unique values

Here is an example of a dictionary class: it links a key (of any type) to a value (of any type, too), but its specificity is that it doesn't accept the same value twice.

Try to make this class by yourself. Like for the RPG map exercice, the solution is described below, part by part.

#### Part 1: the class

As we are declaring a dictionary class, we will use the `dict` keyword. Also, for the end user to be able to manipulate its instances more easily, we will inherit from the `Map<K, V>` class, as it provides many useful functions like `.filter`.

Here is our class' skeleton:

```sn
dict UniqueMap<K, V> extends Map<K, V> {}
```

#### Part 2: storing keys and values

We will have two attributes for this class: a list of keys, and a list of values. That's the traditional way in dictionaries, as it allows to manage keys and values separately.

```sn
  private keys = K:[#];
  private values = V:[#];
```

#### Part 3: the setter

```sn
  // ...
  public fn %set (key: K, value: V) {
    // If the value already exists in the dictionary, panic
    panic!('Trying to use a duplicate value.') if value in @values;

    // If the key already exists...
    if key in @keys {
      // Set a new value
      @values[@keys.indexOf(key)] = value;
    } else {
      // Else, push the new key
      @keys[] = key;
      // And push the new value too
      @values[] = value;
    }
  }
```

#### Part 4: the getter

```sn
  // ...
  public fn %get (key: K, value: V) {
    // If the key doesn't exist, panic
    panic!('Key not found') if key not in @keys;

    // Return the value
    return @values[@keys.indexOf(key)];
  }
```

#### Part 5: the deleter

```sn
  // ...
  public fn %unset (key: K) {
    // If the key doesn't exist, panic
    panic!('Key not found') if key not in @keys;

    // Get the key index
    val keyIndex = @keys.indexOf(key);

    // Remove it
    delete @values[keyIndex];
    delete @keys[keyIndex];
  }
```

#### Part 6: the key checker

```sn
  // ...
  public fn %has (key: K) : bool {
    // Check if the key exists
    return key in @keys;
  }
```

#### Part 7: the value checker

```sn
  // ...
  public fn %contains (value: V) : bool {
    // Check if the value exists
    return value in @values;
  }
```

#### Part 8: the size getter

```sn
  // ...
  public fn %size () : usize {
    // Return the number of elements in the dictionary
    return size!(@keys);
  }
```

#### Part 9: the iterator

```sn
  // ...
  public fn %iterate () : Iterator<(K, V)> {
    // Return an iterator on a key-value tuple
    return Iterator.fromBinom(@keys, @values);
  }
```

## Nullable types

A nullable type is a type that may not hold a value of the provided type.

### An example with points

To take an example, let's imagine we have a function that looks for a point with `x` and `y` attributes both equals to zero. It could look like this:

```sn
struct Point {
  name: string;
  x: int;
  y: int;
}

fn getNilPoint (points: Point[]) : Point {
  for point in points {
    if point.x == 0 && point.y == 0 {
      return point;
    }
  }
}
```

This function won't compile because of `getNilPoint` not returning a `Point` value on all paths. This is because, if we exit the loop and haven't find any valid point, the function will not return anything.

To solve this problem, we could simply use a structure which indicates wether a point was found or not. There is already a type for that: `Option<T>`. It can handle a value of the `T` type:

```sn
fn getNilPoint (points: Point[]) : Option<Point> {
  for point in points {
    if point.x == 0 && point.y == 0 {
      return some!(point);
    }
  }

  return none;
}
```

The `Option<T>` type can also simply be written `?T`:

```sn
fn getNilPoint (points: Point[]) : ?Point {
  // ...
}
```

This works fine. We can now check if we got a value or a "none":

```sn
val point: ?Point = getNilPoints([]);

match point.type {
  Some -> println!('Foud a point: ' + point.value.name),
  None -> println!('No point was found.')
}
```

In fact, the `Option<T>` type is simply an union of `None` and `Some<T>`.

To simplify checking, we can also use the `.none()` and `.some()` methods:

```sn
val point = getNilPoints([]);

point.some(value => println!('Found a point:' + value.name));

point.none(() => println!('No pas was found.'));
```

### The nullable operator

The nullable operator is a useful operator that tries to get a structure's field, a class' member, or a dictionary's key safely. Instead of requiring to try and catch the operation, the operator simply returns a `none` value in case of fail:

```sn
struct Hero {
  name: string;
}

val jack = some!(Hero {
  name: 'Jack'
});

val john = none;

jack?.name.some(name => println!(name)); // Prints: 'Jack'
john?.name.some(name => println!(name)); // Does nothing

// List of types:
typeof jack; // ?Hero
typeof jack?.name; // ?string
```

This operator also supports chaining:

```sn
struct Hero {
  identity: {
    name: string;
  }
}

val jack = some!(Hero {
  identity: {
    name: 'Jack'
  }
});

val john = none;

jack?.identity?.name.some(name => println!(name)); // Prints: 'Jack'
john?.identity?.name.some(name => println!(name)); // Does nothing

// List of types:
typeof jack; // ?Hero
typeof jack?.identity; // ?({identity: {name: string} })
typeof jack?.identity?.name; // ?string
```

Let's detail the constants' type:

```sn
typeof jack; // Option<Hero>

typeof jack?.identity; // Hero.identity
typeof jack?.identity?; // Option<Hero.identity>

typeof jack?.identity?.name; // string
typeof jack?.identity?.name?; // Option<string>
```

The same applies for `john`.

As you can see, it's possible to chain nullable operators. Indeed, if we just wrote `jack?.identity.name`, it would have failed because `jack?.identity` holds `none`.

This also works with dictionaries:

```sn
val personsAge = {# Jack: 24u };

val age = personsAge['Jack']?; // Prints: ?uint

age.some(age => println!(age)); // Prints: '24'
```

Note that it doesn't catch any error in the getter, it simply checks if the key is contained in the dictionary:

```sn
// This:
personsAge['Jack']?; // ?uint

// Is strictly equivalent to:
'Jack' in personsAge ? some!(personsAge['Jack']) : none;
```

## Errors and panics

### Panics

When the program faces a situation that makes it unable to continue. We already encountered most of them ; for example, a program panics when:

* We divide a number by zero;
* We try to access an inexisting index in a dictionary;
* We run out of memory

A panic makes the program exit by force and display a panic message in the console.

We can manually make the program panic by using `panic!`:

```sn
panic!('This is a panic message');
```

But its usage is mostly discouraged ; vast majority of the cases are handlable through _errors_.

Note that it's possible to catch most panics by using the `catchPanic!` flex:

```sn
val handle = catchPanic!(ALL, () => {
  // If the program panics during this function, it
  //  will be caught and returned by the `catchPanic!` flex instead
  // At the moment the panic raises, the function is stopped and returns by force
});

if not fail.ok {
  println!('Something wrong happened: ' + fail.message);
}
```

The `ALL` plain constant indicates we want to catch all kind of panics. We can also specify a specific one, or a list of the panic to catch. `ALL` is simply a tuple containing all of them.

Only a few panics are not catchable ; for example, the `OUT_OF_MEMORY` panic will force the program to exit no matter what happens.

### Throwing errors

Throwing an error consists in using the `throw` keyword, followed by an instance of the `Error` class. Usually, it looks like this:

```sn
// ...
throw new Error('Something went wrong!');
```

But, errors cannot be thrown everywhere. Only functions can throw errors - meaning we can't throw errors in the main scope - if they declare them. Here is how it looks:

```sn
fn divideInt (left: int, right: int) : int throws Error {
  if right == 0 {
    throw new Error('Division by zero is not allowed');
  }

  return left / right;
}
```

This function throws an error when we try to divide by zero. This way, if the division fails, the program won't panic.

Note that this function indicates it may throw an instance of the `Error` class (right after the `throw` keyword). If we don't put this `throws Error` part, there will be an error at build time indicating the function can't throw an error without declaring it.

### Catching errors

Now, if we try to call our function, this won't work:

```sn
divideInt(6, 3); // ERROR
```

This fails because, when we call a function that may throw an error, we must _catch_ this error. This is done by using two blocks: `try` and `catch`.

```sn
try {
  divideInt(6, 3);
}

catch (e: Error) {
  println!('Division failed');
}
```

The `try` block is allowed to call any function throwing errors. When an error occurs, this block is stopped and the program jumps to the `catch` one.

The above program won't display anything. If we divided by 0, it would have displayed the message, but without any error. If we put instructions after these blocks, they will run fine.

#### Cleaning test data

You may create data in your `try` block you want to clone afterwise. This can be achieved through the `finally` block, which runs whatever happens after `try` (and `catch` if it is called). Even if a `return` statement is ran in the `try` or `catch` block, the `finally` one will be called just before returning.

```sn
fn doSomething () : int {
  val counter = 0;

  try {
    counter ++;
    counter += divideInt(6, 0);
  }

  catch (e: Error) {
    println!('Division failed');
    return -1;
  }

  finally {
    counter --;
  }

  return counter;
}
```

This program will print a message telling the division failed, but the `finally` block will still be called before the function returns.

### Inline catching

When assigning a value to a mutable or a constant that may throw an error, we face the following problem: as we cannot simply do `val constant = divideInt(a, b);` because `divideInt` may throw an error, we have first to declare the constant, then to make the assignment inside a `try` block, and catch errors in a `catch` block.

To simplify this process, we can perform an _inline catching_. It consists in trying to evaluate an expression and, if that doesn't work, get the `none` value. Showcase:

```sn
val num = try? divideInt(a, b); // ?int
```

If the division works, it will return its value holded by an optional type. Else (if `b` is equal to `0`), `num` will get the `none` value. This makes the constant having the `?int` type.

### Custom error classes

It's possible to create custom error classes to indicate clearly what type of error has been thrown. Error classes are simply classes that inherit from the base `Error` class:

```sn
class DivisionByZeroError extends Error {
  super(message: string);
}
```

We can now use it in our function:

```sn
fn divideInt (left: int, right: int) : int throws DivisionByZeroError {
  if right == 0 {
    throw new DivisionByZeroError('Division by zero is not allowed');
  }

  return left / right;
}
```

And when we catch errors:

```sn
try {
  divideInt(a, b);
}

catch (e: DivisionByZeroError) {
  println!(e.message); // May print: 'Division by zero is not allowed'
}
```

A function can also throw different type of errors:

```sn
fn doSomething () throws AError, BError {
  if ... {
    throw new AError('Error of type A occured!');
  }

  if ... {
    throw new BError('Error of type B occured!');
  }
}
```

We can then do a chain catch:

```sn
try {
  doSomething();
}

catch (e: AError) {
  // ...
}

catch (e: BError) {
  // ...
}
```

But we can also get them all at once:

```sn
try {
  doSomething();
}

catch (e: Error) {
  // *ALL* errors will be caught here
}
```

## References and pointers

As this chapter is a bit complex, feel free to read it several times in order to fully understand the concept of references and pointers, as that's an important feature of the language.

The way primitives and objects work currently imply two problems in programs:

1. We can't assign a whole new object and having the original entity having it reflected on it;
2. Primitives are cloned each time we manipulate them ;
3. We can't "share" a primitive across multiple functions or entities and having the changes on one reflected on all others automatically.

### Object identifiers

Each object has a unique identifier associated to it, called its OID (Object Identifier), which is unique. This means that, when we do a `new SomeClass()` for example, an invisible identifier is put on it. We cannot access it ourselves, but it allows the program to compare if two objects are equal, by comparing their OID.

When we give an object to, let's say, a function, it doesn't clone the full object - as it would take a really long time for big objects, and could introduce bugs in the program - but simply send its OID. Then, when we access the object, the program retrieves the object through this OID. That's what allows us to modify an object's property in a function and having the same change reflected on the original object.

Also, as primitives aren't objects, they don't have OID, and that's why they are fully cloned when we give them to a function for example.

While being very memory and programmaticly efficient, this concept introduces the problems we saw a bit above.

Let's take an example for the first point:

```sn
struct Hero {
  mut name: string;
}

fn nameHeroJohn (hero: Hero) {
  hero.name = 'John';
}

val jack = Hero {
  mut name: 'Jack'
};

println!(jack.name); // Prints: 'Jack'

nameHeroJohn(jack);

println!(jack.name); // Prints: 'John'
```

When we call `nameHeroJohn`, the program gives it `jack`'s OID. Then, when we attempt to modify its `name` field, it retrives the object through this OID and so the change on this field through `hero` is reflected on `jack`, as they contain the _same_ object.

Now, let's take another example:

```sn
struct Hero {
  mut name: string;
}

fn nameHeroJohn (hero: Hero) {
  // Assignment
  hero = {
    mut name: 'John'
  };
  // ----------
}

val jack = Hero {
  mut name: 'Jack'
};

println!(jack.name); // Prints: 'Jack'

nameHeroJohn(jack);

println!(jack.name); // Prints: 'Jack'
```

Only the part wrapped by the two comments changed. Still, `jack`'s name has not been updated. Why? Because, when we assign a whole new object to it, this object gets a brand new OID - which is not the same as the previous object. This is because OID is not linked to the _entity_, but to the _object_, and so by giving another OID to `hero`, it doesn't have the same than `jack` anymore. That's why our changes are not reflected.

Furthermore, if we modify `hero` after this assignment, changes won't be reflected on `jack`.

### Entity identifiers

Here we'll deal with the remaining problems of the list.

Like objects, each single entity has its unique, invisible identifier, called EID (which stands for Entity Identifier). When we read an entity, its content is retrieved through its EID.

If we take the following entity:

```sn
val jack = { name: 'Jack' };
```

There is an EID attached to `jack` and an OID attached to the object itself - not `jack`. These two are completely distincts ; if we assign a brand new value to the entity, its EID will stay the same. Also, if we assign an object with the same OID to two different entities, they will still keep two different EID - but their value will share the same OID.

The problem that happens here is that, because primitives don't have an OID, they are cloned each time we use it. For example, when we give a primitive to a function, it is cloned. When we create an object with a field containing a primitive, it is cloned. When we assign it to an entity, it is cloned.

But, cloning isn't free, both in term of memory and compute time. For example, considering the following code:

```sn
val str = '';

for i in 0..1000000 {
  str += i + ',';
}

val copy = str;
```

The resulting `str` string contains 6.888.890 characters. When we assign it to `copy`, because it contains a primitive, the value is cloned. This makes the program taking twice as memory, because the content of `str` and `copy` is distinct. Plus, this takes a bit of time to copy near to 7 million characters in the memory.

The other problem is the sharing: if we give a string to a function, and the function modifies it, the reflects won't be reflected on the original entity's value.

### Constant references

References allows to get rid of these two problems.

A reference is simply a "marker" that refers to an entity, called its _referred_. We can then read _through_ this reference, and the result we'll get is the original entity's value. If another function changes it, we will be aware of the changes thanks to the reference not referring to the value but to the entity itself.

Let's take an example. Given we have the following mutable:

```sn
val name: string = 'Jack';
```

We make a reference of it by writing:

```sn
&name;
```

The `&` symbol, prefixing an entity, creates a reference to it. As a reference is a value, we can assign it to an entity. Still, the type of this reference will not be `string`, but `*string`, the `*` symbol indicating we are using a reference type:

```sn
val ref: *string = &name;
```

Inferred typing work with reference types, but we still must indicate we are using a reference:

```sn
val ref: * = &name;
```

Also, we can't read the entity's value just by writing the reference's name ; we must prefix it with the `*` symbol to indicate we don't want to get the reference, but the value of the entity it refers too:

```sn
println!(ref); // ERROR ('*string' is not stringifyable)
println!(*ref); // Prints: 'Jack'

typeof ref; // *string
typeof *ref; // string
```

That's when we retrieve the value through the reference to give it to another function for example, that it is cloned - just like for entities. But if we give the reference to a function, it won't be cloned - allowing to save time and memory, but also to get aware of all changes made to the original entity:

```sn
fn readName (someName: *string) {
  println!(`Hello, ${*someName}!`);
}

val name = 'Jack';

val ref: * = &name;

readName(ref); // Prints: 'Hello, Jack!'

name = 'John';

readName(ref); // Prints: 'Hello, John!'
```

As you can see, the value printed by the function is different although the content of `ref` didn't change.

We can also make references to a specific property of an object:

```sn
fn readName (someName: *string) {
  println!(`Hello, ${*someName}!`);
}

struct Hero {
  name: string;
}

val jack = {
  name: 'Jack'
};

readName(&(jack.name)); // Prints: 'Hello, Jack!'
```

This solves our second and third problem, as we are now able to share _and_ avoid useless cloning of primitives.

#### References on values

Because we may want to create references to direct values, instead of creating an entity containing them, we can use the `wrap!` flex:

```sn
val cstRef: * = & wrap!(2);
val mutRef: *mut = &mut wrap!(2);
```

### Constantness trap

There is a common trap when dealing with constant references: that's not because a reference is constant that its referred's value is, too. Let's say we have a mutable entity and we make a constant reference to it, even though the reference itself is constant, when we read the referred's value through it it may change during the program's execution. Be aware of this behavior in your programs.

### Mutable references

We just made _constant_ references, which are references we can only read through. But we can also make _mutable_ ones, to assign values to the original entity.

When we assign something _through_ a mutable reference, it doesn't modify the reference itself but the value of entity it refers to. For example, if we make a reference to an entity containing a primitive, and we assign something through this reference, the original entity's value will be modified.

Mutable constants are created using the `&mut` prefix (requiring a space after it), and the reference type is prefixed by `*mut` (requiring a space after it too). To assign a new value through the reference, we prefix it with the `*`, like for reading:

```sn
fn nameItJohn (someName: *mut string) {
  *someName = 'John';
}

let name = 'Jack';

val ref: *mut = &mut name;

println!(name); // Prints: 'Jack'

nameItJohn(ref);

println!(name); // Prints: 'John'
```

This works as expected. Accessing an entity through a reference is called _depointerization_. Note that the `ref` constant is still optional here:

```sn
fn nameItJohn (someName: *mut string) {
  *someName = 'John';
}

let name = 'Jack';

println!(name); // Prints: 'Jack'

nameItJohn(&mut name);

println!(name); // Prints: 'John'
```

The third problem is now solved, as we can now overwrite objects easily:

```sn
struct Hero {
  mut name: string;
}

fn nameHeroJohn (hero: *mut Hero) {
  // Assignment
  *hero = {
    mut name: 'John'
  };
  // ----------
}

let jack = Hero {
  mut name: 'Jack'
};

println!(jack.name); // Prints: 'Jack'

nameHeroJohn(&mut jack);

println!(jack.name); // Prints: 'Jack'
```

A good point about references (both constants and mutables) is the _automatic reference resolution_: as reference types do not have any member, when we try to access one, it considers we are trying to access a member of the referred's value:

```sn
let jack = Hero {
  mut name: 'Jack'
};

val ref: *mut = &mut jack;

// This:
println!((*jack).name);
// Is strictly equivalent to:
println!(jack.name);
```

Here is the list of possible syntaxes:

```sn
&jack.field;   // Make a reference to `jack` and get `name` from it
&(jack).name; // Make a reference to `jack` and get `name` from it
(&jack).name; // Make a reference to `jack` and get `name` from it
&(jack.name); // Make a reference to `jack.name`

&mut jack.name;   // Make a reference to `jack` and get `name` from it
&mut (jack).name; // Make a reference to `jack` and get `name` from it
(&mut jack).name; // Make a reference to `jack` and get `name` from it
&mut (jack.name); // Make a reference to `jack.name`
```

### Pointers

A _pointer_ is simply an entity containing a reference.

We can't make mutable refences on constants. That's an absolute rule that prevents from surprising behaviors: if the referred is declared as constant, it is constant, so we cannot make a mutable reference to it. Still, we can make a constant reference on a mutable, and that's what you should alaways do unless you **need** to write through the reference. This avoids unexpected modifications of your entities by a function, for example.

The pointer can either be mutable or constant. If it is mutable, we will simply be abel to assign a new reference to it, so it will refer to another entity. If it is constant, this will not be possible, but if it contains a mutable reference, we can still assign new values to the referred.

To sum up this, there are three mutability to take in account:

* The _referred_'s mutability: if it is constant, we cannot make a mutable reference on it;
* The _reference_'s mutability: if it is constant, we cannot write the referred through it;
* The _pointer_'s mutability: if it is constant, we cannot assign new references to it.

Remember, these three points are **completely** distinct. They are not linked to each other.

### References compatibility

Type compatibility is simple with references: mutable ones can be used as constant ones, but constants ones cannot be used as mutables:

```sn
let i = 1;

let ptr1: *mut = &mut i;
let ptr2: * = &i;

let mut_ptr: *mut = ptr1; // Works fine
let mut_ptr: *mut = ptr2; // ERROR (incompatible types)
let val_ptr: *    = ptr1; // Works fine
let val_ptr: *    = ptr2; // Works fine
```

In fact, when a mutable reference is found where a constant one is expected, it is automatically casted.

This behavior makes that, if we want to make a function that takes both constant pointers and mutable pointers, we simply have to make a function that accepts constant ones - mutable pointers will be automatically typecasted:

```sn
fn printRefValue (ptr: *Stringifyable) : void {
  println!(*ptr);
}

val n = 2;

printRefValue(&n); // Prints: '2'
printRefValue(&mut n); // Prints: '2'
```

### References typecasting

It is possible to cast safely a mutable reference to a constant one, or to cast a type from another if it keeps the same reference type (e.g. constant or mutable), but not both at once:

```sn
val i = & wrap!(2);
val j = &mut wrap!(2);

<*int> i; // Works fine (does nothing)
<*mut int> i; // ERROR (cannot cast constant reference to mutable)
<*uint> i; // Works fine (casts from *int to *uint)

<*int> j; // Works fine (casts to a constant reference)
<*mut int> j; // Works fine (does nothing)
<*uint> j; // ERROR (cannot cast reference mutability + type at once)
<*mut uint> j; // Works fine (casts from *mut int to *mut uint)

// To cast a '*mut int' to a '*uint':

<*uint> <*mut uint> j; // Works fine
<*uint> <*int> j; // Works fine
```

### Multi-level references

Multi-level references simply consist in referring to a reference and so on. Here is an example:

```sn
val i = 0;

val ptr1: * = &i;
val ptr2: ** = &ptr1;
```

If we access `ptr2`, it contains a level 2 reference, while `ptr1` contains a level 1 reference. If we access `ptr2`'s referred (`*ptr2`), we will get the reference stored inside `ptr1`, which is called `ptr2`'s intermediate reference:

```sn
// All the following statements are 'true'

// Get the pointer's value
ptr2 == &ptr1;

// Get the referred's value
// (intermediate reference's value)
*ptr2 == ptr1;
*ptr2 == &i;

// Get the referred's value's referred's value
// (intermediate reference's referred's value)
**ptr2 == *ptr1;
**ptr2 == i;
```

### Checking a reference

We can check if a value is a reference thanks to the `is_ref!` flex:

```sn
val i = 0;
val ptr: * = &i;

println!(is_ref!(i)); // Prints: 'true'
println!(is_ref!(ptr)); // Prints: 'false'
```

For multi-level references, we can get their level with the `ref_level!` flex:

```sn
val i = 0;
val ptr1: * = &i;
val ptr2: ** = &ptr1;

println!(ref_level!(i)); // Prints: '0'
println!(ref_level!(ptr1)); // Prints: '1'
println!(ref_level!(ptr2)); // Prints: '2"
```

We can also check a pointer's mutability using the `is_mut_ref!` flex:

```sn
let i = 0;

val cstPtr: * = &i;
val mutPtr: *mut = &mut i;

println!(is_mut_ref!(i)); // ERROR
println!(is_mut_ref!(cstPtr)); // Prints: 'false'
println!(is_mut_ref!(mutPtr)); // Prints: 'true'
```

This only gets the mutability of the top-level reference, though:

```sn
println!(is_mut_ref!(&mut wrap!(& wrap!(2)))); // Prints: 'true'
println!(is_mut_ref!(&wrap!(&mut wrap!(2)))); // Prints: 'false'
```

Finally, the `ref_stats!` flex returns all informations on a reference:

```sn
let i = 0;
let ptr1: * = &i;
val ptr2: *mut = &mut ptr1;
let ptr3: * = *ptr2;

val infos = ref_stats!(ptr3);

// Contains:
[
  {
    level: 0,
    mut: false,
    ref: &i
  },

  {
    level: 1,
    mut: true,
    ref: &mut ptr1
  },

  {
    level: 2,
    mut: false,
    ref: &ptr2
  }
]
```

The referred can also be checked using the equality operators, thanks to them using the same EID. Are considered equal references that have the same referred and the same mutability:

```sn
let i = 0;

val cstRef: * = &i;
val mutRef: *mut = &i;

println!(cstRef === &i); // Prints: 'true'
println!(cstRef === &mut i); // Prints: 'false'

println!(mutRef === &i); // Prints: 'false'
println!(mutRef === &mut i); // Prints: 'true'
```

## Advanced concepts

### Bindings

_Bindings_ are a simple way to access all properties of a given object as if they were part of the current scope. This can be useful when dealing with large libraries. Let's take the example of a game engine, with the following code:

```sn
engine.run(lib => {
  val window = lib.createWindow(640, 480, 'My super game');

  val scene = lib.createScene();

  val polygons = (
    lib.createPolygon(lib.randInt(), lib.randInt(), lib.randColor()
    for i in 1...10
  );

  scene.attachAll(polygons);

  window.setScene(scene);

  window.display();
});
```

The same version, with bindings:

```sn
engine.run(lib => {
  // Bind "lib"'s property to the current scope
  #bind lib;

  val window = createWindow(640, 480, 'My super game');

  val scene = createScene();

  val polygons = (createPolyon(randInt(), randInt(), randColor()) for i in 1...10);

  scene.attachAll(polygons);

  window.setScene(scene);

  window.display();
});
```

That sure is simplifier and more easy to read, isn't it?

Note that you can make multiple bindings in a function, but they must always be located at its top - bindings must not be followed by any instruction.

### Conditional directives

Sometimes, we will want to use a piece of code for a specific platform or language. For that, we can use the conditional directives: `#if`, `#else`, `#elsif`, `#end`. The code located in them is simply removed from the source code if the condition is (or is not) filled, before the program starts to run. They can only use plain values, as well as native constants, which give informations about the type of execution (interpreted, compiled, ...), the platform (Windows, Linux, ...) the processor's architecture (ARM, x86, ...).

Here is an example:

```sn
#if PROC_ARCH == 'ARM'
  println!('This program has been compiled for ARM.');
#end

#if OS == 'Windows'
  println!('You are using a Windows system.');
#elsif OS == 'Linux'
  println!('You are using a Linux system.');
#elsif OS == 'Darwin'
  println!('You are using a MacOS system.');
#end
```

### Superoverloads

Superoverloads are global overloads of arithmetic and comparison operators. They work exactly the same way as classes, but they take two arguments instead of one: a value to compare another with, and the compared value.

Showcase:

```sn
fn %add<SIZE: usize> (left: int[SIZE], right: int[SIZE]) : string {
  return (left[i] + right[i] for i in 0..SIZE);
}

val added = [ 1, 2 ] + [ 3, 4 ];

println!(added[0]); // Prints: '4' (1 + 3)
println!(added[1]); // Prints: '6' (2 + 4)
```

### Symbols

Symbols are useful values to identify and separate data. A symbol holds a unique identifier we cannot access, as well as an optional string which is its _value_. Two symbols are considered as equal if and only if they share the same identifier - so they are only equal to themselves.

```sn
val sym1 = new Symbol('This is a great symbol');
val sym2 = new Symbol('This is a sympathic symbol');

println!(sym1.message); // Prints: 'This is a great symbol'

sym1 == sym1; // true
sym1 == sym2; // false
sym2 == sym1; // false
sym2 == sym2; // true
```

### Descriptor types

Descriptor types are types that describe other types. For instance, the `Type` type refers to all existing types, while `Structure` refers to existing structure types.

Here is the list of them:

* `Type` accepts all existing types;
* `Structure` accepts all structures;
* `Enumeration` accepts all enumeration;
* `Interface` accepts all interfaces;
* `Trait` accepts all traits;
* `Class` accepts all classes.

For instance, the following code is valid:

```sn
struct Hero {
  name: string;
}

pln myStruct: Structure = Hero;
// With inferred typing:
pln myStruct = Hero;
```

These types are especially useful in flexes.

### Statics

Statics are instances of structures. For example, `{ name: 'Jack' }` is a static, while neither `new SomeClass()` nor `'Hello'` are.

These can be described using the `Static<T>` type, where `T` is a common type of all fields in the structure. For example, a static can be described with `Static<Primitive>` if all its fields hold primitives:

```sn
val static1: Static<Primitive> = {
  name: 'Jack'
};
```

In fact, all statics are automatically typecastable to any `Static<T>` type able to describe them. Once we hold such a described value, we can iterate it:

```sn
struct Hero {
  name: string;
  hp: uint;
  atk: uint;
  exp: uint;
}

val jack = Hero {
  name: 'Jack',
  hp: 100u,
  atk: 20u,
  exp: 0u
};

for field in (jack as Static<Primitive>) {
  println!(field + ' => ' + jack[field]);
}
```

The `field` entity does not have the `string` type here, it has the `keyof Hero` type, which indicates it contains a string with the name of one of the structure's fields.

While we cannot use indexes on statics, it is possible by using a certified key of the structure. So, to get the type certifying a value is a key of the structure, we simply have to use the `keyof typeof someStatic` type.

The `Static<T>` type is used, for example, to serialize structures. Here is an example of a very simple stringification function:

```sn
fn stringifyStatic (obj: Static<Stringifyable>) : string {
  return (field + ' => ' + obj[field] for field in obj).join('\n');
}

println!(stringifyStatic({
  name: 'Jack',
  age: 0u
}));
// Prints:
//
// name => Jack
// age => 0
```

Also, as tuple types are considered as structures (we can create them using the `struct` keyword after all), the same process applies. This time though, the iterator will contain `usize` values instead of `string`.

### Plainable types

Plainable types are types which can be used as a type for a plain constant as well as by the `pln<T>` wrapper. Their list is stored inside a native, plain tuple to allow identiying them during program's execution (is this type plainable?):

```sn
pln PLAINABLE = (void, bool, number, string, Function, Structure, Enumeration, Interface, Trait, Class, Type, Static<?>);
```

Creating a plain constant with a type that doesn't figure in this tuple will result in an error at build time.

Note that children of these types are accepted, which means we can make a plain constant containing an `int` for example.

This also means we can create any static as plain.

### Flexs

Remember when we encountered `println!` for the very first time? We told at this moment is was a _flex_, and that we would see what it is later. Now, time has come to see it in details.

The _flex_ term stands for _flexible function_. These work basically like functions, simply using the `flex` keyword instead of `fn`. But what make them specials are three key differences.

First, their content is copy-pasted when it is called. This means that, when we call it, its call is replaced by its full body. This also means that, if you call a given flex 10 times, its content will appear 10 times in the code. That's why flexs should always be as short and concise as possible.

Secondly, and that's the reason of the first point, they can use _dynamic sub-types_. This allows to indicate an argument accepts a `number`, but if an `int` is given, it will be typed as an `int` and not as a `number`. This is possible because, as the flex's body is fully copied where we call it, so it is possible to make tests on it.

Finally, type checking is disabled on them until their call. And type checking is so performed individually for each call. This allows to make some data manipulation a lot easier as we will see now, but it also requires to write them with many care, in order to avoid errors when we call them with specific types or data.

Here is an example:

```sn
fn doubleNumberFn (value: number) : number {
  return value * 2;
}

flex doubleNumberFlex (value: >number) : >number {
  return value * 2;
}

typeof doubleNumberFn(2); // number
typeof doubleNumberFlex!(2); // int
```

As you can see, flexes are called using the `!` symbol.

The `typeof` operator can also be used for the return type:

```sn
flex doubleNumberFlex (value: >number) : typeof value {
  return value * 2;
}
```

This second writing is better in our case because it is more precise: we know that it will return a value of the same type than its only argument.

Note that flexes can be part of classes and traits as methods, but not in interfaces as it would be impossible to predict the implemented content of the flex.

Another advantage of flexs is that they can return plain values, at the opposite of functions, which allows to use them as types:

```sn
flex getFamilyTypeOf (value: number) : pln<Type> {
  if value instanceof int {
    return int;
  } elsif value instanceof uint {
    return uint;
  } else {
    return number;
  }
}
```

Let's introduce a few new concepts here. First of all, the `Type` type obviously refers to a type. The `pln<T>` wrapper indicates this is a plain value, meaning it is predictable right at build time. So, `pln<Type>` is a plain `Type` value - a predictable type.

The `instanceof` keyword is the _typechecking operator_: it checks if the given value is an instance of the provided type or of one of its sub-types. If we want to check if a value's type implements a specific type for example, we will have to check using the `typeof` operator like `(typeof value) implements Stringifyable` - the same keyword than for templates.

Let's try our flex:

```sn
getFamilyTypeOf!(2); // int
getFamilyTypeOf!(2u); // uint

getFamilyTypeOf!(2b); // int
getFamilyTypeOf!(2S); // uint

getFamilyTypeOf!(2.0); // number
```

As you can see, it returns the right types. Because it returns a plain type, we can use it as an entity's type, for example:

```sn
val num: number = 2b;

val someInt: getFamilyTypeOf!(num) = 8; // int ; works fine
```

To be more precise, when a flex is called, its code isn't just copy-pasted without any change. Its code is put inside a dedicated scope, to avoid polluating the current one, and only its return value - if there is one - is put where the flex was called. Else, a `null` is put instead.

This little code above works even though the real type of `num` is hidden by its official `number` type. But, the typechecking operator looks for the real type_ of the provided value, and not to its official one.

Flexs can be useful in specific situations, like when iterating a tuple. While we can iterate it using their `iterFn` method, the callback function will receive only values of the `Any` type, while when using their `iter` method, the callback flex will receive values with the real type of the value. Showcase:

```sn
val tuple = ( null, true, 2, 'Hello world!' );

tuple.iterFn(value => {
  typeof value; // Always 'Any'
});

tuple.iter!(flex (value: >Any) {
  typeof value; // 'void', 'bool', 'int' and then 'string'
});
```

Here is an example of a flex returning a reversed version of a given tuple, using the tuples' `.map!` method which allows to create a new tuple with the same number of elements:

```sn
flex reverseTuple (tuple: #tuple) : #tuple {
  return tuple.map!(flex (value: >Any, pln index: usize) : >Any {
    return tuple[tuple.size - index - 1];
  });
}
```

Here, we create a flex which takes a tuple as an argument, and return another one. We use tuples' `.map!` flex to create a new tuple from the provided one.

We give to this method a flex callback which takes the value of the current index (we don't care about it) as well as the index. Our flex returns a value that can be of any official type (`>Any`). This way, if we return an `int`, the returned value will be an official `int` and not an `int` hidden behind an `Any` official type.

Our callback then returns the value at the opposite of the tuple. The generated tuple is returned right after its creation.

Another way to write this flex is using the `createTuple!` flex which allows to create a tuple from a flex:

```sn
flex reverseTuple (tuple: #tuple) : #tuple {
  return createTuple!(tuple.size, flex (pln index: usize) : >Any {
    return tuple[tuple.size - index - 1];
  });
}
```

This one uses the same declaration, but generates a tuple dynamically. The `createTuple!` flex requires a plain `usize` value, so we provide the original tuple's size (which is a plain value for all tuples). Then, we provide a callback that takes the current index and returns the value at the opposite in the original tuple.

The only downside of this flex is that the new tuple only has constant members - no plain nor mutable ones. We could solve this problem by using the `createAdvancedTuple!` which uses a more complex API.

Also, note that, as flexes are rewritten at each call, calling flexes inside flexes can quickly make an enormous code to copy-paste. If we make a tuple of a hundred elements for example, the callback flex in `reverseTuple` will be called a hundred times!

Final word: as you can see, flexs are complex to handle, and you may not need very often. But the point is that, if you need it, they are here.

### Proxies

Proxies are entities that don't have a real value. Instead, when we attempt to either read or write them, a related callback is called.

Proxies are defined using the `proxy` keyword, with an object containing the callback called when the object is read - called the "getter" - and the one when the object is written - called the "setter" -. Note that the setter is optional ; if none is specified, all assignments will result in an error at build time.

```sn
val _counter = 0u;

proxy counter: uint from {
  getter: fn () : uint {
    return ++ _counter;
  },

  setter: fn (value: uint) : bool {
    _counter = value;
    return true;
  }
};
```

Our `counter` proxy is declared as an entity of the `uint` type. The object located after the `from` keyword is called the proxy's _model_. The getter must be a function taking no argument and returning a value of the same type than the entity. The setter must be a function taking a value, which can be of any type - not necessarily the entity's one - and return a boolean: `true` if the value was assigned, `false` if it can't - because it is invalid, or so on.

Let's try it:

```sn
println!(counter); // Prints: '1'
println!(counter); // Prints: '2'
println!(counter); // Prints: '3'
```

And so on. Note that it is possible to put any addition field in the object, and so we can integrate the counter variable inside our proxy. This way, we can make a counter that only increments itself and cannot be decremented:

```sn
proxy counter: uint from {
  value: 0u,
  getter: () => ++ @value
};

println!(counter); // Prints: '1'
println!(counter); // Prints: '2'
println!(counter); // Prints: '3'
println!(counter); // Prints: '4'
println!(counter); // Prints: '5'
```

#### Prepared proxy models

As the proxy model is a simple object, we can create it by advance and store it inside an object to use the same model across several proxies. The object will be cloned each time we create a proxy from it.

A specificity is that models must be declared using the `prxmodel` keyword. Also, they cannot be read or write ; writing `myProxyModel.prop` will always fail.

```sn
prxmodel counterProxy {
  value: 0u,
  getter: () => ++ @value
};

proxy counter1 from counterProxy;
proxy counter2 from counterProxy;

println!(counter1); // Prints: '1'
println!(counter1); // Prints: '2'
println!(counter2); // Prints: '1'
```

### Flexible proxies

_Flexible proxies_ are proxies that use flexs instead of simple functions as their getter and eventual setter. It is useful in several situations, like when the proxy must return a plain value.

We declare them using the `proxy!` keyword:

```sn
proxy! hello: pln<string> from {
  getter: flex () : pln<string> {
    return 'Hello world!';
  }
};

pln message = hello; // Works fine
println!(hello); // Prints: 'Hello world!'
```

This proxy declares itself as containing a plain `string` value. Because its getter is a flex, it can return such a type.

#### Templated proxies

Proxies are allowed to take templates, too. This can be useful to type them dynamically:

```sn
proxy! typeOf<DATA: T, T>: pln<Type> from {
  getter: flex () : pln<Type> {
    return T;
  }
};

typeOf!<null>; // void
typeOf!<true>; // bool
typeOf!<2.0>; // f32
typeOf!<'Hello world!'>; // string

val str = 'Hello world!';
val copy: typeOf!<str> = str; // Works fine

println!(copy); // Prints: 'Hello world!'
```

This proxy is especially complex, so let's detail it. First, it takes two templates: a first one which is of the `T` type, with `T` being its second template. So, when we read it by giving it a value as a template, `T` is inferred and matches `DATA`'s type.

The type of the proxy itself is a plain type. Its getter, a flex, simply returns `T`. So, when we call this proxy with a value as a template, it returns its type as a plain value.

### Constrained types

Constrained types are a way to ensure a value holds validated data in a way far easier than a proxy. The main difference are we don't attach it to an entity but to a value.

Considering we want to ensure a string is not empty, we can declare a constrain the `string` type by putting a callback on it that checks, when we try to assign a value using this type, if it is not empty. Here is how it goes:

```sn
val notEmptyStr: string with ((candidate: string) => not candidate.empty()) = 'Hello world!';
```

This is a bit long, of course, so we can shorten our definition:

```sn
val notEmptyStr: string with (c => not c.empty()) = 'Hello world';
```

There is also a shorter syntax that gets rids of the function syntax and replace the candidate value by the `_` entity:

```sn
val notEmptyStr: string with (not _.empty()) = 'Hello world';
```

The presence of the callback ensures the value has been validated, and so we don't have to perform any additional check.

The counterpart of constrained types is that the callback is called at each assignment, which reduces performances when writing. When reading, nothing changes, though.

Also, if the constraint fails during assignment, the program panics. The only way to handle such errors when we don't know if the test will pass is to use the following behavior:

```sn
val notEmpty: string with (not _.empty()) = 'Hello world';

val fail = catchPanic!(CATCHABLE_TYPE_CONSTRAINTS_FAILS, () => {
  notEmpty = ''; // Function stops here and returns because of the fail
});

if not fail.ok {
  println!('Assignment failed'); // Will be printed
}
```

To avoid having to write the again and again the same type constraint, and to unify them across your programs, you can use the `type` keyword which allows to make type aliases:

```sn
type NotEmptyString = string with (not _.empty());

val notEmpty: NotEmptyString = 'Hello world';
```

As you may have noticed, values of a given type are automatically typecastable to all its constrained versions. When this happens, the checker function is triggered. If it fails, the program will panic, as for a standard assignment.

Also, constrained types are automatically typecastable to their original version, without any risk of fail. This is achieved automatically because constrained types are considered sub-types of their original one.

#### Type aliasing

Type aliasing allows to create an _alias_ which links an unused type name to an existing type. It can be absolutely any type, including structures, classes, constrained types, etc.

They can also be templated:

```sn
type TupleOfThree<T> = (T, T, T);

val myTuple: TupleOfThree<int> = (2, 8, 5);
```

As type aliases are _aliases_ and not real types, there is no typecasting problem ; in our example, writing `TupleOfThree<int>` is **exactly** the same as writing `(T, T, T)`.

### Unsafe typecasting

Unsafe typecasting allow to typecast a value from its official type to its hidden type. Let's take an example:

```sn
val something: Any = 'Hello world!';
```

The _official type_ of `something` is `Any`: this is the type it sure has. But its real type, called the _hidden type_, is `string`: in fact, `something` holds a `string`.

Still, we may want to convert this value back to its original type. This can be achieved only through _unsafe_ typecasting:

```sn
try {
  cast_unsafe!<string>(something); // Returns a string
}

catch (e: UnsafeCastError) {
  println!('Failed to typecast!');
}
```

This program will work fine. If we tried to cast unsafely `something` to **any** other type, it would have failed and throw an error.

Because using a `try`-`catch` block is a bit heavy, we can use its nullable version:

```sn
val str = <?string> something; // ?string
```

The `str` entity has the `?string` value: if the typecast succeeds, it holds the typecast value. But if it fails, instead of throwing an error, it returns `none` ; that's why the returned value is nullable.

If we are absolutely sure about the typecasting being write - and so we don't want the final value to be nullable, we can use another syntax:

```sn
val str = <!string> something; // string
```

Using this one, if the typecast fails, the program will panic. Be **really** aware when using it - its usage is strongly discouraged most of the time.

### Intersection types

An intersection type is the mix of several types. For example, an intersection type could be `A & B`, describing a value has having both the `A` and the `B` type. It looks like this:

```sn
struct HasMotor {
  isAnObject: bool;
  horsesPower: uint;
}

struct HasWheels {
  isAnObject: bool;
  wheels: uint;
}

fn vehicleDetails (vehicle: HasMotor & HasWheels) {
  println!(`Horses power = ${car.horsesPower} / Wheels = ${car.wheels}`);
}

vehicleDetails((HasMotor & HasWheels) {
  isAnObject: true,
  horsesPower: 1u,
  wheels: 4u
}); // Prints: 'Horses power = 1 / Wheels = 4'
```

An intersection type gives access to every member of every type of the intersection. An intersection can be made between more than two types, too. Here, `vehicle` can access both `horsesPower` and `wheels` because it explicitly implements the two interfaces `HasMotor` and `HasWheels`.

Note that type inferring will never result in an intersection type when writing a static, but they are automatically compatible with the intersection types implementing the same members:

```sn
val vehicle = {
  isAnObject: true,
  horsesPower: 1u,
  wheels: 4u
}; // Type: {isAnObject: bool, horsesPower: uint, wheels: uint}
   // And not 'HasMotor & HasWheels'

vehicleDetails(vehicle); // Works fine
vehicle as (HasMotor & HasWheels); // Works fine
```

Besides, we can shorten our definition using type aliasing:

```sn
struct HasMotor {
  isAnObject: bool;
  horsesPower: uint;
}

struct HasWheels {
  isAnObject: bool;
  wheels: uint;
}

type WheeledVehicleWithMotor = HasMotor & HasWheels;

fn vehicleDetails (vehicle: WheeledVehicleWithMotor) {
  println!(`Horses power = ${car.horsesPower} / Wheels = ${car.wheels}`);
}

vehicleDetails(WheeledVehicleWithMotor {
  isAnObject: true,
  horsesPower: 1u,
  wheels: 4u
}); // Prints: 'Horses power = 1 / Wheels = 4'
```

Intersection types are automatically typecastable to any type of the intersection (like `HasMotor & HasWheels` to `HasMotor`) or to sub-intersections (like `A & B & C` to `A & C`).

Be aware: if two types define a property of the same name but with a different type, an error will raise at build time:

```sn
struct A {
  prop: int;
}

struct B {
  prop: bool;
}

type Both = A & B; // ERROR
```

#### Intersection absorptions

_Intersection absorptions_ consists in converting an `A & B` intersection type where `B` is a sub-type of `A` to `B` alone. Example:

```sn
struct A {
  propA: int;
}

struct B extends A {
  propB: string;
}

println!(A & B == B); // Prints: 'true'
println!(A & B == A); // Prints: 'false'
```

Intersection absorptions are performed automatically by the program, but that's still important to understand why `A & B` could result in `B` alone.

### Union types

Union types are the opposite of intersection types: instead of describing a value has having several types, the value is described as having _one_ of the types of the union:

```sn
let data: string |  uint = 'Hello world'; // Works fine
data = 2u; // Works fine
```

Any type is automatically typecastable to any union type containing it (like `string` to `string | uint`). It is too from any union type to any type of the union (like `string | uint` to `string`), BUT if the hidden type of the value is not the typecast's target one, the program will panic:

```sn
val data: string | uint = 'Hello world';

val str: string = data; // Works fine
val num: uint = data; // ERROR
```

Union types make available any member all the types of the union implement. Example:

```sn
struct HasMotor {
  isAnObject: bool;
  horsesPower: uint;
}

struct HasWheels {
  isAnObject: bool;
  wheels: uint;
}

val vehicle: HasMotor | HasWheels = HasMotor {
  isAnObject: true,
  horsesPower: 1u
};

vehicle.isAnObject; // Works fine
vehicle.horsesPower; // ERROR
vehicle.wheels; // ERROR
```

Note that, as for intersection types, if two types define a property with the same name but using a different type, build will fail:

```sn
struct A {
  prop: int;
}

struct B {
  prop: uint;
}

type AnyOfThem = A | B; // ERROR
```

Note also that type inference will **never** result in an union type. In some specific cases like when dealing with vectors, it will use the 'Best Common Type' method to determine the value's type:

```sn
virtual class Animal {}

// These three types have in common their 'Animal' parent
class Lion extends Animal {}
class Rhino extends Animal {}
class Bear extends Animal {}

val array = [ new Lion(), new Rhino(), new Bear() ];
// 'array' is of the 'Animal[]' type
```

#### Union absorptions

_Union absorptions_ consists in converting an `A | B` intersection type where `B` is a sub-type of `A` to `A` alone. Example:

```sn
struct A {
  propA: int;
}

struct B extends A {
  propB: string;
}

println!(A | B == B); // Prints: 'false'
println!(A | B == A); // Prints: 'true'
```

As for intersection absorptions, union absorptions are performed automatically by the program.

#### Union tries

_Union tries_ consist in returning a value from an inline `catch` block. The resulting value will then have an union type: the type of value returned by the `try` block as the first type, the type of value returned by the `catch` block as the second one:

```sn
val data = try divideInt(a, b) catch 'FAILED'; // int | string
```

If both blocks return the same type of value, type absorption will make it result in a single type
:

```sn
val data = try divideInt(a, b) catch 0; // int | int == int
```

#### Automatic sub-typing

An union type will be automatically typecastable to any type that is a common parent type to all types in the union. Showcase:

```sn
virtual class A {}

class B extends A {}
class C extends A {}

let b: B | C = new B();
let a: A = b; // Works (as 'B' and 'C' are both sub-types of 'A')
```

#### Union error types

In a `catch` block, it is possible to not provide its head entity's type. If so, its type will be the union type of all throwable types inside the `try` block:

```sn
fn fnA () throws AError, BError {}
fn fnB () throws CError {}

try {
  fnA();
  fnB();
}

catch (e) {
  // 'e' is typed as an 'AError | BError | CError'
}
```

Already caught types are also eliminated from the union:

```sn
fn fnA () throws AError, BError {}
fn fnB () throws CError {}

try {
  fnA();
  fnB();
}

catch (e: BError) {
  // 'e' is typed as a 'BError'
}

catch (e) {
  // 'e' is typed as an 'AError | CError'
}
```

### Type assertion

Let's say we want to create a function that takes any value as an argument. If it is stringifyable, we stringify it, else we return `null`.

This can be achieved through _type assertion_:

```sn
fn convertToString (value: Any) : ?string {
  if value ~ Stringifyable {
    // ...
  } else {
    return none;
  }
}
```

The `~` operator is called the _type assertion operator_: it checks if the provided entity matches the type on its right - it can be either a class, trait, interface...

Checking if a value's hidden type matches another is called a _type assertion_.

When a conditional block's head is only made of type assertions, if the condition is not nil its body will be ran with all specified entities having the provided types as official types.

Note that we can specify multiple type assertions at a type in a type assertion block, but only with the `&&` operator - no `||` or any other operator.

Let's go back to our function:

```sn
fn convertToString (value: Any) : ?string {
  if value ~ Stringifyable {
    return some!(value as string); // Works fine
  } else {
    return none;
  }
}

convertToString(25u).some(str => println!(str)); // Prints: '25'
convertToString({}).some(str => println!(str)); // Does nothing
```

This is as simple as that.

If we specify multiple types for the same entity, it will result as the entity having an intersection type:

```sn
fn someFn (value: Any) {
  if value ~ Stringifyable && value ~ Numerizable {
    typeof value; // 'Stringifyable & Numerizable'
  }
}
```

Also, we can use type assertions in ternary conditions as well as in inline condition blocks:

```sn
// Ternary condition
fn convertToString (value: Any) : ?string {
  return value ~ Stringifyable ? some!(value as string) : none;
}

// Inline condition
val value: Any = 'Hello world';
println!(value as string) if value ~ Stringifyable;
```

### Lambda classes

_Lambda classes_ are to classes what lambdas are to functions. These are unnamed classes that are written inline, which must either extend from another class, implement an interface, or use a trait (or several of these). For example, let's consider the following code:

```sn
virtual class MouseClickHandler {
  abstract public fn onClick ();
}

fn triggerHandler (handler: MouseClickHandler) {
  handler.onClick();
}
```

If we want to make a new trigger, a first idea would be to write this:

```sn
class MyMouseClickHandler extends MouseClickHandler {
  public fn onClick () {
    println!('Triggered!');
  }
}

triggerHandler(new MyMouseClickHandler());
```

But if our class is only used once, that's heavy as we have to declare a whole new class and inherit from it. Plus, it will appears as one of the program's classes. Lambda classes allow us to get rid of these problems ; our previous code can be rewritten like this:

```sn
triggerHandler(new ~MouseClickHandler {
  public fn onClick () {
    println!('Triggered!');
  }
});
```

That sure is lighter, right? As you can see, lambda classes must be instanciated as soon as they are created.

If we want to make a class with no constraint (no inherited member nor abstract member to implement), we can simply make a class implementing the `Any` interface:

```sn
val obj = new ~Any {
  public fn onClick () {
    println!('Triggered!');
  }
};

obj.onClick(); // Prints: 'Triggered!'
```

### Namespaces

A _namespace_ is a named scope which can export some of its entities to its direct parent scope:

```sn
namespace Users {
  struct User {
    name: string;
    age: uint;
  }

  val users = new Map<string, User>;

  fn createUser (name: string, age: uint) {
    users[name] = age;
  }

  fn getUser (name: string) : User throws Error {
    if name not in users {
      throw new Error('User not found');
    } else {
      return users[name];
    }
  }

  fn deleteUser (name: string) throws Error {
    if name not in users {
      throw new Error('User not found');
    } else {
      delete useres[name];
    }
  }
}
```

At this point, all entities of the namespace are _private_. We can make them _public_ by _exporting_ them:

```sn
namespace Users {
  // ...

  export createUser,
         getUser,
         deleteUser;
}
```

This way, we can access the three exported functions, but not anything else. To access a namespace's content, we have to write its name followed by two double point symbols:

```sn
namespace Users {
  // ...
}

createUser('Jack', 24u); // ERROR ('createUser' not found in this scope)

Users::createUser('Jack', 24u); // Works fine

println!(Users::getUser('Jack')); // Works fine

println!(serialize!(Users::users)); // ERROR ('users' is a private member of the scope)
```

Note that even structures our namespaces can be exported from a namespace.

## Asynchronous behaviors

Sometimes we can't foretell when an event will occur. For example, if we are making a web server, we can't predict when there will be incoming connections. This is called an _asynchronous behaviour_ and we will see in this chapter how to deal with it.

Some of the concepts we will see, like promises, are also very useful when dealing with multi-treading, a great tool that allows our code to run several pieces of code simultaneously.

### The problem

Some events are synchronous even though they appear to be asynchronous. For example, catch blocks call may appear to be asynchronous becacuse they are called only if an error occured, and implicitly. But in fact, they are called synchronously, because the analyzer turns all throw instructions inside a try block to a jump to the catch one (which is not possible manually). So, the catch block works synchronously.

Another case is callbacks. In the following code:

```sn
class Event {
  private static handler: () => void;

  public static fn handle (handler: () => void) => @handler = handler;

  public static fn trigger () {
    @handler();
  }
}

Event.handle(() => println!('Callback was triggered'));
Event.trigger();
```

If we don't have the source code of `Event`, we could think this is asynchronous because the function is not called directly but only when a specific event occurs. But it's still synchronous, because the callback is ran in the `Event.trigger()` function.

Globally, there are three cases of asynchronous behaviors:

* When dealing with threads;
* When the program is going to be transpiled in an asynchronous language and uses an asynchronous API from it;
* When using asynchronous API in frontend or third-party APIs

We will only talk about the second point, as we will deal with in another chapter.

In some languages, such as JavaScript, several functions can be ran at the same time automatically. For example, the `setTimeout()` function that takes a callback and a delay in miliseconds runs the given function after the specified delay, even if the program is already running some tasks. This will not block the main tasks' execution, because the callback will run in parallel of the main tasks. This specificity makes JavaScript a _non-blocking language_, which means it can run several functions at the same time without blocking another.

The Node.js platform takes advantage of this feature to allow JavaScript being used in servers. When five clients connect at the same time to the server, they can be delivered simultaneously. In a synchronous language, the first client would be served first, and when it's done it would be the second client's turn, then the third one, and so on... That makes a long waiting time for the last clients, though. That's why synchronous languages are never used to deliver resources on a server.

Thanks to transpiling, we can take advantage of this using promises as we will see now.

### Promises

Promises are a great tool when coming to handling asynchronous behaviors. A promise is simply an object which can either _succeed_ if the task it has been created for succeeds, or _fail_ if it fails.

Promises are basically a software conception of tasks that can either return a result or throw an error. Here is an example of promises, when dealing with filesystem tasks:

```sn
// We admit the function below is already defined
fn readAsync (fileName: string) : Promise<string, Error>;

// Let's use it
readAsync('hello.txt')
  .then((content: string) => println!(`File's size is ${content.length} bytes.`))
  .catch((err: Error) => println!(`Something went wrong: ${content.message}`));

// And with ICT:
readAsync('hello.txt')
  .then(content => println!(`File's size is ${content.length} bytes.`))
  .catch(err => println!(`Something went wrong: ${content.message}`));
```

The `.then()` function simply registers the callback which will be called if the promise succeeds, while `.catch()` registers the callback for the case it fails. Here, we don't use any `try`-`catch` block to handle potential errors ; there is callback for that.

We can also use `.finally()` to run a function after the other callbacks, whatever the promise succeeded or failed.

Let's now write the `readAsync` function:

```sn
val files = new Map<string, string>;

fn readAsync (fileName: string) : Promise<string, Error> {
  // Make a promise a return it
  return new Promise<string, Error>((resolve, reject) => {
    if fileName in files {
      // Success
      resolve(files[fileName]);
    } else {
      // Fail
      reject(new Error('File not found'));
    }
  });
}
```

The `resolve` and `reject` arguments of the promise's function are the callback which will be called when the promise succeeds or fails. It is transparently binded to the callbacks registered by `.then()`, `.catch()` and `.finally()`.

### Asynchronous functions

Asynchronous functions are a simplier way to write functions based on promises. These are simple functions, prefixed at declaration time by the `async` keyword, and which can access additional keywords and return features.

If we rewrite our function in an asynchronous function, here is how it looks:

```sn
async fn readAsync (fileName: string) : (string, Error) {
  if filename in files {
    resolve files[fileName];
  } else {
    reject new Error('File not found');
  }
}
```

A lot simplier and easier to read, right?

An asynchronous function implicitly returns a promise. Its return type is shortened: instead of returning a `Promise<X, Y>`, it indicates returning a `(X, Y)`, and is automatically replaced by the builder. So, our function will, in reality, return a `Promise<string, Error>`.

Then, we don't have to instanciate the `Promise<X, Y>` class: the function's body is implicitly wrapped inside a promise's function. We also have access to two new keywords: `resolve`, which calls the resolution callback, and `reject`, which calls the rejection callback.

Note that, when these keywords are called, the function immedialy stops. At the opposite of calling a function manually, these stop the function's execution, even inside a sub-function:

```sn
async fn test () : (void, void) {
  (() => {
    resolve null;
  })();

  println!('Hello world!');
}

test(); // Will never print anything
```

Also, asynchronous functions are allowed to return values. In such case, it will be considered as a resolution.

### Error-free promises

Error-free promises are promises that cannot fail. These take only one template instead of twos, and all calls to `.catch()` will work but have no effect. Also, the promise's function only take the resolution callback, as it cannot perform a rejection:

```sn
new Promise<string>(resolve => {
  resolve('It works.');
});
```

With asynchronous functions, it simply consists in returning a single type instead of a tuple of two types. Also, the `reject` keyword becomes unavailable:

```sn
async fn test () : string {
  reject 'Nope'; // ERROR
  resolve 'It works'; // Works fine
}
```

For promises that do not return any kind of value, the return type can even be omitted (it will be considered as `void`):

```sn
async fn test () {
  resolve ; // Works fine
}
```

### Single resolution

It's possible to resolve several promises at once, using `Promise.all`:

```sn
val single = Promise<string, Error>.all([
  readAsync('file1.txt'),
  readAsync('file2.txt'),
  readAsync('file3.txt')
]); // Promise<string[3], PromiseChainError<string, Error> ==
    // Promise<string[3], (Error, usize, Promise<string, Error>, string[])>

// Inferred typing:
val single = Promise.all([
  readAsync('file1.txt'),
  readAsync('file2.txt'),
  readAsync('file3.txt')
]);
```

The resulting promise will succeed only if all provided promises succeed too. In this case, it will return the list of data returned by them. If any fails, it will call the rejection callback and provide it a tuple containing: the error, the number of promise's number, the promise itself, and the data returned by the promises that succeded before the error (if any).

Note that it's possible to use promises which return different resolution and/or rejection types ; in this case the 'Best Common Type' method will be applied:

```sn
val single = Promise.all([
  new Promise<int, int>((resolve, reject) => resolve(2)),
  new Promise<bool, bool>((resolve, reject) => resolve(true))
]); // Promise<Primitive[2], PromiseChainError<Primitive, Primitive>
```

### Waiting for promises

Sometimes we have to perform some asynchronous actions and wait for their completion in order for the program to continue. For example, this can happen when loading a resource from the web or waiting for a user's input.

For this, we can use the `await` keyword which allows, inside an asynchronous function, to wait for the completion of a promise:

```sn
// Considering the following function:
async fn sleep (delay: uint);

// Function: Print a message after a specific delay
fn delayedPrint (message: string, delay: uint) {
  // Wait for sleep()
  await sleep(delay);

  // Print the message
  println!(message);
}

delayedPrint('Hello', 1000)
  .then(i => println!('Finished')); // Will print after 1 second
```

The result of the promise is returned as a value, so it's possible to write `val constant = await somePromise;`, for instance.

Note that, if the promise is not error-free, `await` may throw an `AwaitRejectionError<T>` error (with `T` being the provided promise's rejection type), so it must be wrapped in a `try` block.

The `await` keyword is not available outside asynchronous functions:

```sn
fn test () {
  (() => {
    await sleep(delay); // ERROR (this lambda is not an asynchronous function)
  })();
}
```

### Synchronous waiting

As we saw, `await` is a great tool as it allows us to wait synchronously for a promise. But, it's unavailable when we are _outside_ an asynchronous function.

In fact, the point of this keyword is not to make promises synchronous or to block the function's execution until the promise is either resolved or rejected ; it's simply a way to resolve a promise without all the `.then()` and `.catch()` stuff, but it **never** aims to block the execution of the program.  That's why it only works in asynchronous functions: waiting for a promise in a function that is already asynchronous doesn't block the program, it only 'blocks' the promise, which in all cases won't block the program itself.

Still, there are cases when we explicitly want to block the program's execution while the promise is not resolved nor rejected. For example, let's consider we want to make a program that retrieves the ten last articles from a blog and displays them in the terminal. Getting the articles from the web is, of course, asynchronous.

A first idea to achieve this would be to make ten promises, and when they are all resolved or rejected, display the result in a terminal. Here is the code:

```sn
// Considering the following function:
async fn getArticle (id: uint) : (string, Error);

// The code:
Promise
  .all(fetchArticle(i) for i in 0..10)
  .then(articles =>
    println!(article) for article in articles;
  )
  .catch(err => println!('Failed to fetch articles: ' + err.message));
```

The main problem of this code is that we couldn't integrate it to a loop, for example. Let's imagine we have a `for` loop that does a lot of stuff and, in the middle of its body, retrieves the article, then do other stuff on it. We would have to transform the code in an asynchronous process that do the stuff while preparing each promise, and do the second stuff when they are resolved. That's heavy and isn't possible in all cases - for example if our loop is in a process that MUST be synchronous.

Another, more explicit example, of the limitations of `await` is when we deal with synchronous callbacks. For example, if we have an array of strings, and for each of them we want to return the content of an article (still in a process that must be synchronous), we are blocked because the callback of `.map()` (for instance) must be synchronous.

To solve this problem, we can make _synchronously_ wait for promises thanks to the `sync` keyword. It does the same thing than `await`, but works even outside asynchronous functions. So, why do we have two different keywords?

That's all a question of goal: while `await` aims to have a lighter and 'synchronous' wait of promises inside of another promise, `sync` aims to **block** the execution while the promise is not resolved nor rejected.

Here is the syntax:

```sn
for i in 0..10 {
  try {
    println!(sync fetchArticle(i));
  }

  catch (e) {
    println!(`Failed to fetch article ${i}: ${e.message}`);
  }
}
```

This way, the loop is ran a synchronous way. To take again our `.map()` example:

```sn
val articles = [ 2, 5, 8 ];
val articlesBody = articles.map(
  id => try sync fetchArticle(i) catch 'Failed to fetch article: ' + err.message
); // string[3]

// Print them
for body in articlesBody {
  println!(body);
}
```

## Documenting the code

Making code is great, but it's even better if it's documented. When you are using a library (e.g. a package downloaded from the official repository), it's always better to know how functions work, right? So, we have several solutions:

* Write the documentation by hand ;
* Document the code and generate the documentation automatically

The second solution is, most of the time, the better. Why? Because, when we document our code directly, we and our program's users (as developers) get several advantages:

* The documentation is located under a single location ;
* It's directly integrated in the source code and makes it more readable ;
* It's faster to write than a whole document ;
* We don't have to search through the web how it works ;
* IDEs and some code editors will provide help and auto-complete ;
* It doesn't require to manipulate another documentation-generation tool

So, let's see how this works.

### Assignable entities

The syntax of documentation is pretty the same than in many other languages: a multi-line comment, starting with a double `*` symbol. Here is the syntax for assignable entities:

```sn
/**
 * The name of a person
 */
let name: string;
```

The first line contains two `*` symbols, meaning it's a _documentation comment_. Every next line will start by optional spaces (for indentation) then by another `*` symbol and a content depending on what we want to do. Conventionally, the first line describes the entity (what it contains/does). Because it's an assignable entity, we write what it contains: the name of a person.

### Functions and arguments

For functions, we have to document what the function does, what is its return value, and each of its arguments. Here is an example of a summation function:

```sn
/**
 * Make a summation from a list of numbers
 * @param numbers A list of numbers
 * @returns The summation
 */
fn sum (...numbers: int[]) : int {
  let summation = 0;

  for num in numbers {
    summation += num;
  }

  return summation;
}
```

The first line describes, as usual, the function (what it does): make a summation from a list of numbers. Then, we describe each argument using `@param` (it's called an _annotation_), followed by the argument's name, and what it contains: a list of numbers. Finally, we indicate what the function returns using `@returns` followed by the returned value: the summation.

Note that we don't have to use `@returns` for void-typed functions.

### Nested functions

To document nested functions (e.g. callbacks), we document them as usual functions using a `>` symbol, with the argument's annotation being the callback's one:

```sn
/**
 * Make a summation from a generator function
 * @param generator The generator to make the summation from
 * > @returns A list of values
 * @returns The summation
 */
fn sum (generator: () => int[]) : int {
  let summation = 0;

  for num in generator() {
    summation += num;
  }

  return summation;
}
```

If we had double-nested functions (like a function), we would have used two `>` symbols to describes the callback's callback.

### Functions' templates

Templates are documented like arguments, but with `@template`:

```sn
/**
 * Make a summation from an iterator
 * @template T The numbers' type
 * @param iterator The iterator to make the summation from
 * @returns The summation
 */
fn sum<T extends number> (iterator: Iterator<T>) : T {
  let summation: T = 0;

  for num in iterator {
    summation += num;
  }

  return summation;
}
```

### Examples

The `@example` annotation gives an example on how to use the function:

```sn
/**
 * Increment an integer through a reference
 * @param num A mutable reference to an integer
 * @example let i = 0; increment (&mut i); i == 1;
 */
fn increment (num: *mut int) {
  *num += 1;
}
```

Examples aim to be as short and as explicit as possible. Note that it's possible to give several examples for the same function. Usually, it's an expression, but it's not forced too.

### Errors throwing

The `@throws` annotation allows us to describe each case of error throwing:

```sn
/**
 * Double a positive integer
 * @param num The integer to double
 * @throws ErrorType1 If the integer is negative
 * @throws ErrorType2 If the integer is equal to 0
 * @returns The double value of the provided integer
 */
fn double (num: int) : int throws ErrorType1, ErrorType2 {
  throw new ErrorType1('Integer is negative') if num < 0;
  throw new ErrorType2('Integer is zero') if num == 0;
  return num * 2;
}
```

### Conditions

The `@condition` annotation indicates a condition that must be matched in order for the function to work properly. It is useful to indicate conditions required to avoid runtime errors, that aren't declared using the `throws` keyword.

```sn
/**
 * Get a value from an array
 * @param arr The array to get a value from
 * @param index The index of the value to get
 * @returns The requested value
 * @condition 0 <= index <= arr.length
 */
fn getValue (arr: int[], index: usize) : int {
  return arr[index];
}
```

It is usually an expression, but it's not forced too.

### Polymorph functions

Polymorph functions that does exactly the same actions but on different types can use the `@samedef` annotation to keep the exact same description across its definitions:

```sn
/**
 * Get a value from an array
 * @param arr The array to get a value from
 * @param index The index of the value to get
 * @returns The requested value
 * @condition 0 <= index <= arr.length
 */
fn getValue (arr: int[], index: usize) : int {
  return arr[index];
}

/**
 * @samedef
 */
fn getValue (arr: string[], index: usize) : string {
  return arr[index];
}
```

### Classes, interfaces, traits

Classes are described like assignable entities. Their templates can be described using `@template`:

```sn
/**
 * Container for an integer value
 */
class A {
  public value: int = 0;
}

/**
 * Container for a value of an arbitrary type
 * @template T Type of the value
 */
interface B<T> {
  public value: T;
}
```

### Type aliases

Type aliases are described like classes:

```sn
/**
 * Alias for the 'int' type
 */
type A = int;

/**
 * Collection of values
 * @template T Type of the values
 */
type Collection<T> = Map<string, T>;
```

### Segments

Segments are described like assignable entities:

```sn
class B<T> {
  public value: T;

  /**
   * Segment for number types
   */
  segment (T ~ number) {
    public fn double () => @value * 2;
  }
}
```

### Namespaces

Namespaces are described like assignable entities:

```sn
/**
 * Mathematic functions
 */
namespace SuperMath {
  /**
   * Increment an integer through a reference
   * @param num A mutable reference to an integer
   * @example let i = 0; increment (&mut i); i == 1;
   */
  fn increment (num: *mut int) {
    *num += 1;
  }

  // Export the function
  export { increment };
}
```

### Files

Files can be documented as well, using three indicators: `@file`, which indicates what the file contains and does, `@author` which describes its author(s), and `@license` which gives informations about the license the file uses. Here is how it does:

```sn
/**
 * @file Provides a summation function
 * @author Your Name
 * @license MIT
 */

/**
 * Make a summation from a list of numbers
 * @param numbers A list of numbers
 * @returns The summation
 */
fn sum (...numbers: int[]) : int {
  let summation = 0;

  for num in numbers {
    summation += num;
  }

  return summation;
}
```

### Inline annotations

Inline annotations are part of the language and describe a part of the program. There must be placed at the beginning of a single-line comment, or at the beginning of the first non-empty line of a multi-line comment.

```sn
// NOTE: This part may not work under specific circumstances

// OPTIMIZE: This part needs to be optimized

// TODO: Improve this part

// HACK: This code is not proper but works fine

// FIXME: This part doesn't work properly

// BUG: There is this specific bug: ...
```

### Dynamic annotations

Dynamic annotations allow to set and read a value using annotations. It can be useful to document functions that are re-implemented in child classes, without rewriting the whole documentation in the children. Here is an example, using the `@class` class which is automatically replaced by the real class name (`_real`' name):

```sn
virtual class A {
  /**
   * Create a new value of @class and return it
   * @returns A new instance of @class
   */
  abstract public fn create () : _real;
}

class B extends A {
  public fn create () : _real {
    return new self();
  }
}

class C extends A {
  public fn create () : _real {
    return new self();
  }
}
```

This code is strictly equivalent to:

```sn
virtual class A {
  /**
   * Create a new value of A and return it
   * @returns A new instance of A
   */
  abstract public fn create () : _real;
}

class B extends A {
  /**
   * Create a new value of B and return it
   * @returns A new instance of B
   */
  public fn create () : _real {
    return new self();
  }
}

class C extends A {
  /**
   * Create a new value of C and return it
   * @returns A new instance of C
   */
  public fn create () : _real {
    return new self();
  }
}
```

In some cases, renaming could be required, and can be performed using the `@classname` annotation:

```sn
/**
 * @classname(number)
 */
class Number {
  /**
   * Do some @class stuff
   */
  public fn nothing () {}
}

/**
 * @classname(signed number)
 */
class SignedNumber extends A {}
```

This will be converted to:

```sn
class Number {
  /**
   * Do some number stuff
   */
  public fn nothing () {}
}

class SignedNumber extends A {
  /**
   * Do some signed number stuff
   */
  public fn nothing () {}
}
```