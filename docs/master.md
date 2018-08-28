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

#### Lists

Lists, on their size, are defined using the `List<T>` type, where `T` is the same as for arrays:

```sn
val list: List<int> = [ # 2, 3, 4 ];
```

Notice the `#` symbol at the beginning of the list? It indicates we are not writing an array, but a list of elements. If we omit this symbol, we try to assign an array to a list, which is forbidden.

As for arrays, lists support inferred typing, so we can simply write:

```sn
val list = [ # 2, 3, 4 ];
```

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

tuple[num]; // Works ('NUM' is a plain constant)
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
val hero_copy = {
  name: name,
  age: age,
  warrior: warrior
};

// Multiple assignments
val hero_copy = { name, age, warrior };
```

This syntax can also be mixed with other properties:

```sn
val new_hero = {
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

## Blocks

Blocks provide ways to control the program's execution to omit or repeat groups of instructions depending on conditions, or to simply writing some heavy blocks of codes.

### Conditional blocks

Conditions blocks run a set of instructions only if a condition is met. The most common block uses the `if` keyword and runs the provided instructions if the condition we write in it is not a nil value. Here is an example:

```sn
if 2 + 2 == 4 {
  println!('OK');
}
```

This code displays `'OK'` because `2 + 2 == 4` returns `true`, which is not a nil value. If we wrote `2 + 3 == 4`, this would have resulted in `false`, which is a nil value, so the message wouldn't have been displayed.

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
val cubes = (i * i * i for i in 0..5); // List<int>

println!(cube) for cube in cubes;
```

This code will print `0`, `1`, `8`, `27` and `64`.

Because we may want an array instead of a list, we can use an alternative syntax using the `gen` keyword that produces an array:

```sn
val cubes = (i * i * i for i -> 0..5) // int[5];
```

This specific `for` syntax is only allowed for inline generation.

### Scoping

A _scope_ is any code between an opening bracket and a closing one. For blocks, their head is considered as being part of the scope too.

```sn
if /* Scope begins */ 2 + 2 == 4 {
  println!('Hello world!');
/* Scope ends */ }
```

Inline blocks implicitly create a scope for the whole instruction (including their head).

```sn
/* Scope begins */ println!('Hello') for i in 0..5 /* Scope ends */;
```

When declaring an entity, this one is binded to the current scope.

```sn
// Scope 0
let i = 0; // Binded to scope 0

// Create a scope
// When an opening brace starts a line, it opens a scope
{
  // Scope 1

  let i = 0; // Binded to scope 1
}
```

Scope 1 is called a _child scope_ of scope 0, which is its _parent scope_ (the parent scope, as well as its own parents, etc. are called the _ancestor scopes_). As you can see, it's possible to declare entities in a child scope that has the same name than another in a ancestor scope. The two are completely distinct, though.

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

## Functions

Functions are a specific type of blocks that allow to manually run a set of instructions as many times as wee need, from everywhere.

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

Putting apart comments and the fact we know use a `result` constant, two things have changed in our function.

First, we gave it a _return type_, written after the double point symbol just before the opening brace. It indicates what kind of value our function will return.

The second change is the `return` statement at the end of the function. The value on its right is returned by the function, which can be used afterward:

```sn
val trapezoid_area = area(1.0, 2.0, 3.0));
```

### Optional arguments

Like we did with structures, we can make some arguments optional by giving them a default value. Though, such arguments must be placed at the very end of the arguments list.

```sn
fn say_hello (name: string, repeat: uint = 1) {
  println!(name) for i in 0..repeat;
}

say_hello('Jack');    // Prints: 'Jack'
say_hello('Jack', 1); // Prints: 'Jack'
say_hello('Jack', 2); // Prints: 'Jack' (twice)
```

Note that default values can also be an expression, that will be evaluated when the function will be called.

### Endless arguments

Endless arguments are prefixed with the `...` symbol, and accept from zero to an infinity of arguments:

```sn
fn sum_of (...nums: int) : int {
  let sum = 0;

  sum += n for n in sums;

  return sum;
}

sum_of(1, 2, 3); // Works fine
sum_of(1, 2, 3, 4); // Works fine
sum_of(); // Works fine
```

They are typed as arrays with an unknown length ; here, `nums` is an `int[]`.

It's possible to provide multiple endless arguments, the only rule it that we can't write two consecutive endless arguments with the same type:

```sn
fn sum_of (...ints: int, ...floats: f32) : f32 {
  let sum = 0.0;

  for n in ints {
    sum += n as f32;
  }

  sum += n for f in floats;

  return sum;
}

sum_of(1, 2, 3.0); // Works fine
sum_of(1, 2); // Works fine
sum_of(3.0); // Works fine
sum_of(); // Works fine
```

### Arguments expansion

It's also possible to use a vector in the place of an endless arguments:

```sn
let nums = [ 2, 3, 4 ];

sum_of(nums..., 5.0);
// Equivalent to:
sum_of(2, 3, 4, 5.0);
```

### Polymorphism

_Polymorphism_ allow to declare the same function several times. Each declaration, though, must use different arguments - this can be an additional argument, one less argument, or an existing argument that gets a new type:

```sn
fn add (a: int, b: int) : int {
  return a + b;
}

fn add (a: uint, b: uint) : uint {
  return a + b;
}
```

There is a risk of ambiguity at build time if the function uses endless arguments:

```sn
fn sum_of (...nums: int) : int { /* ... */ }
fn sum_of (...nums: f32) : f32 { /* ... */ }

sum_of(); // ERROR (ambiguity)

// The compiler doesn't know what declaration to use
// We must tell it explicitly by using a vector of elements

val vec = new List<int>;
sum_of(vec...); // Works fine
```

### Lambdas

_Lambdas_, also called _anonymous functions_, are single values that can be used as callbacks. Here is an example:

```sn
// The .filter function takes a function as an argument
// It runs it for each element of the list
// If the callback returns `false`, the value is dropped
// Then, a new list is returned

val list = [ # 2, 3, 4 ];

val filtered = list.filter(lambda (value: int) : bool {
  return value > 2;
});
```

The `filtered` list now contains the `3` and `4` values. As you can see, the lambda has no name - this is where the _anonymous_ term comes from.

It's possible to represent functions as a type:

```sn
fn run_lambda (func: fn (value: int) : bool) {
  if func(5) {
    println!('Returned: true');
  } else {
    println!('Returned: false');
  }
}

run_lambda(lambda (value: int) : bool {
  return true:
}); // Prints: 'Returned: true'
```

This time, the type uses the `fn` keyword, because we may give an existing function and not a lambda.

As functions are simple values, we can store it in entities, and even use inferred typing to omit their type:

```sn
let sum = lambda (a: int, b: int) : int {
  return a + b;
};

println!(sum(2, 5)); // Prints: '7'
```

For lambdas only made of a `return` instruction, we can use the _arrow syntax_ to shorten their writing:

```sn
let sum = lambda (a: int, b: int) : int => a + b;

println!(sum(2, 5)); // Prints: '7'
```

The expression written after the arrow is evaluated when the function is called, and then returned.

### Inferred Callback Typing

A function is called a _callback_ when it is provided as a function's argument. Callbacks can be written in a shorter way than lambdas, thanks to a featured called _Inferred Callback Typing_ (abbreviated _ICT_) that infers the type of its arguments, as well as its return type:

```sn
// Lambda syntax
list.filter(lambda (value: int) : bool => value > 2);

// ICT
list.filter((value) => value > 2);
```

This syntax don't work with non-callback lambdas (e.g. lambdas that are assigned to an entity before being used). Indeed, ICT works because the builder exactly knows what are the type of the callback's arguments, as well as its return type.

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
  pub rdo name: string;
  pub rdo hp: uint;
  pub rdo atk: uint;
  pub rdo exp: uint;
}
```

A class is made of _members_, which are either _attributes_ - entities - like we defined just above or methods - immutable functions linked to the class -.

Through this book, we will often talk about the _inside_ of the class, which refers to anything in the class' scope, and to the _outside_ of the class, which is anything outside this scope.

Here, all attributes are marked as public using the `pub` keyword, meaning they can be accessed from the outside, but they are also marked as read-only using the `rdo` keyword. This is different than `val` in the way it prevents these attributes from being written from the outside, but not from the inside - where they stay mutable.

Like structures, classes can be instanciated. But for that, they need a _constructor_, which is a special method called when the class is created:

```sn
class Hero {
  pub rdo name: string;
  pub rdo hp: uint;
  pub rdo atk: uint;
  pub rdo exp: uint;
  
  pub fn %new (name: string, hp: uint, atk: uint, exp: uint) {
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
  pub fn fight (ennemy: Hero) {
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
  pub rdo name: string;
  pub rdo hp: uint;
  pub rdo atk: uint;
  pub rdo exp: uint;
  
  pub fn %new (name: string, hp: uint, atk: uint, exp: uint) {
    this.name = name;
    this.hp = hp;
    this.atk = atk;
    this.exp = exp;
  }

  pub fn fight (ennemy: Hero) {
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

Members can either be public with `pub`, so they can be accessed from the outside, or private with `priv`, so they are only readable from the inside of the class:

```sn
class Example {
  pub known: string;
  priv secret: string;

  pub fn %new () {
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
  pub known: string;
  priv secret: string;

  pub fn %new () {
    @known = 'Public data';
    @secret = 'Secret data';
  }
}
```

We can provide a default value for attributes, so we don't have to assign them in the constructor:

```sn
class Example {
  pub known = 'Public data';
  priv secret = 'Secret data';

  pub fn %new () {}
}
```

Also, as attributes are entities, they can be marked as constant using `val`, or as plain using `pln`. By default, they are implicitly mutable.

```sn
class Example {
  pub pln KNOWN = 'Public data';
  priv val secret = 'Secret data';
}
```

Another keyword for members is `static`, which makes the member accessible statically, meaning we have to refer to the class itself instead of referring to instance:

```sn
class Example {
  pub static name = 'Hello';
}

println!(Example.name); // Prints: 'Hello'
println!((new Example).name); // ERROR (static member)
```

Static attributes must have an initialization value. Classes can access their static members using the `self` keyword:

```sn
class Example {
  pub static name = 'Hello';

  pub static fn print_name () {
    println!(self.name);
  }
}

Example.print_name(); // Prints: 'Hello'
```

### Data structure members

Data structures can also be members of classes ; they then become a local type of the class:

```sn
class Example {
  pub struct Hero {
    name: string;
    hp: uint;
    atk: uint;
    mut exp: uint;
  }

  pub val hero = Hero {
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
  pub enum Cell { EMPTY, ROCK, TRAP };
```

#### Part 2: The constructor

We told the constructor must accept the player's start position. We can simply take two coordinates, X and Y, both of `usize` type. But we also have to take the map's cells, which in our case will be a matrix (an array of arrays) made of `Cell` values. Because we are dealing with array, it's easier to deal with coordinates of the same type than the array's indexes.

Here is our constructor's signature:

```sn
  pub fn %new (map: Cell[][], x: usize, y: usize) {
```

#### Part 3: The attributes

We have to store our map, as well as the current player's coordinates. So we have three attributes:

```sn
  pub rdo map: Cell[][];
  pub rdo x: usize;
  pub rdo y: usize;
```

But it's easier to also have an attribute to check if the player is trapped, so let's add a fourth one:

```sn
  // ...
  pub rdo trapped: bool = false;
```

Thanks to the attributes being public, we can check at anytime the player's coordinates with `.x` and `.y`, as well as if it's trapped or not using `.trapped`.

#### Part 4: Writing the constructor's body

Let's initialize our attributes:

```sn
  // ...
  pub fn %new (map: Cell[][], x: usize, y: size) {
    @map = map;
    @x = x;
    @y = y;
  }
```

#### Part 5: Declaring simple methods

Because our player can only move on adjacent cells, the easiest solution is to make height methods (up-left, up, up-right left, right, down-left, down, down-right). But because we will have to check, at each move, if the player is running into a rock or is being trapped, we will use a dedicated method in them:

```sn
  // ...
  pub fn moveUpLeft    () { @move(x - 1, y - 1); }
  pub fn moveUp        () { @move(x, y - 1); }
  pub fn moveUpRight   () { @move(x + 1, y - 1); }
  pub fn moveLeft      () { @move(x - 1, y); }
  pub fn moveRight     () { @move(x + 1, y); }
  pub fn moveDownLeft  () { @move(x - 1, y + 1); }
  pub fn moveDown      () { @move(x, y + 1); }
  pub fn moveDownRight () { @move(x + 1, y + 1); }
  
```

#### Part 6: The `move` method

Let's make our `move` method. First, its signature:

```sn
  // ...
  pub fn move (x: usize, y: usize) {
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
  pub enum Cell { EMPTY, ROCK, TRAP };

  pub rdo map: Cell[][];
  pub rdo x: usize;
  pub rdo y: usize;
  pub rdo trapped: bool = false;

  pub fn %new (map: Cell[][], x: usize, y: size) {
    @map = map;
    @x = x;
    @y = y;
  }

  pub fn moveUpLeft    () { @move(x - 1, y - 1); }
  pub fn moveUp        () { @move(x, y - 1); }
  pub fn moveUpRight   () { @move(x + 1, y - 1); }
  pub fn moveLeft      () { @move(x - 1, y); }
  pub fn moveRight     () { @move(x + 1, y); }
  pub fn moveDownLeft  () { @move(x - 1, y + 1); }
  pub fn moveDown      () { @move(x, y + 1); }
  pub fn moveDownRight () { @move(x + 1, y + 1); }

  pub fn move (x: usize, y: usize) {
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

### Scope-dropping

First, let's introduce the concept of _overload_: an overload is a class method, starting with a purcent symbol `%`. It is called like this because it _overloads_ a behavior of the language: the constructor overloads the behavior of instanciation.

Let's now consider the following code, representing users:

```sn
class User { /* ... */ }

let value = new User;
value = new User;
```

The first `A` instance is dropped when the second assignment occurs, because no entity uses it anymore. When a value is dropped, the memory it uses is _freed_, so we can't use the value anymore (which is not a problem because we don't refer to it). Also, when we reach the end of a scope, all entities that have no reference outside of this scope are dropped.

Still, we could want to notify some of the code the user is going to be dropped. For that, we can use the _destructor_, which is called just before the instance is dropped.

**NOTE:** The end of the program marks the drop of all values, but for performance reasons their destructor is not called. To force the program to call the destructor of all values anyway, we have to specify a _head directive_:

```sn
#[main_scope_dropping];

class User {
  priv static counter = 0u;
  priv id: uint;

  pub fn %new () {
    self.counter ++;
    @id = self.counter;
    println!(`User ${@id} has been created`);
  }

  pub fn %drop () {
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
val squares = squareList(array.%clone());

println!(squares[1]); // Prints: '49'
println!(array[1]); // Prints: '7'
```

By default, objects are not clonable. Vectors simply implement a cloning method. As you can see, we can call any class overload like a standard method, simply prefixing it with its `%` symbol. The only limitation is that we cannot call the constructor or the destructor manually from the outside of the class, as they are triggerred in specific situations - but the inside of the class can still call them if needed.

The cloning overload is a method that takes no argument and returns an instance of the current class. When we try to clone an instance, this overload is called and its return result is the returned clone:

```sn
class Example {
  pub rdo name: string;

  pub fn %new (name: string) {
    @name = name;
  }

  pub fn set_name (newName: string) {
    @name = newName;
  }

  pub fn %clone () {
    println!('Instance has been cloned.');
    return new Example(@name);
  }
}

let a = new Example('A');

let b = a;
let c = a.%clone();

b.set_name('B');
c.set_name('C');

println!(a); // Prints: 'B'
println!(b); // Prints: 'B'
println!(c); // Prints: 'C'
```

You may notice we haven't provided a return type for the `%clone` function. This is because the signature of most overload methods are imposed, so as for callbacks with ICT, we don't have to provide the type of arguments as well as the method's return type - though it's still allowed.

### Serialization

Serialization allows to save an object as a string, in order to restore it later. It goes through two steps: serialization, with turns the instance into a string, and unserialization, which turns a string into an instance.

The serialization overload takes no argument and returns a string. In our `Example` class, where we simply have to save a name, the string could simply be the name itself.

```sn
  // ...
  pub fn %serialize () {
    return @name;
  }
```

The unserialization overload takes a string argument and returns an instance of the current class. It goes like this (we wil see what the `throws` part mean later):

```sn
  // ...
  pub fn %unserialize (serialized) throws UnserializationError {
    return new Example(@name);
  }
```

When we have several fields, it becomes a bit more complicated, as we have to deal with specific representation of the data. In this case, we can use the _lazy overload_:

```sn
  // ...
  pub pln %lazy_serial_fields = ('name');
```

This plain tuple contains the list of the attributes to serialize. The specified attributes must be serializable themselves.

With the lazy overload, the program will automatically handle serialization and unserialization, as well as checking if the serialized content is valid or not.

If you want to be ensure the serialized content is valid, it's possible to make the program computing a checksum that it'll join to the serialized content. At unserialization time, the checksum will be checked again to ensure data haven't been corrupted. To enable this feature, simply add a `WITH_CHECKSUM` item at the end of the tuple:

```sn
  // ...
  pub pln %lazy_serial_fields = ('name', WITH_CHECKSUM);
```

The big advantage of checksum is that it highly reduces the risks to get invalid values, but the downside is that both serialization and unserialization will be considerably slower.

### Overloading operators

Some operators can be overloaded in a class, allowing to use them on the class' instances:

```sn
class MyInt {
  pub rdo value: int;

  pub fn %new (value: int) {
    @value = value;
  }

  pub fn %add (another) {
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
  pub rdo value: int;

  pub fn %new (value: int) {
    @value = value;
  }

  pub fn %add (another: MyInt) : int {
    return @value + another.value;
  }
}

val one = new MyInt(1);
val two = new MyInt(2);

println!(one + two); // Prints: '3'
```

Here is the list of overloadable operators:

* `%add` for `+` ;
* `%sub` for `-` ;
* `%mul` for `*` ;
* `%div` for `/` ;
* `%mod` for `%` ;
* `%pow` for `**`

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