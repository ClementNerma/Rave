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

### Multiple assignments

Structures and dictionaries allow to perform multiple assignments at once. Let's consider the following (implicit) object:

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