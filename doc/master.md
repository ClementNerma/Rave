# The Master Book

## Foreword

Welcome to The Master Book, an exhaustive tutorial for the Rave programming language. Please note this is still a **draft document**, as features may be added, changed or removed at anytime. For more details, you can check the project's [release model](release-model.md).

Rave is born from a simple idea: today, if you want to make a truly multi-platform application, that runs on Windows, Mac OS, Linux, but also Android and iOS phones for instance, you can't use a single programming language. You will be forced to use, for example, Java for desktop applications and Android, then Swift of Objective-C for iOS. And, of course, you will have to adapt a large portion of your application to make it work on Android.

The goal of Rave is to unify applications development under a single programming language, which can be compiled to get the best performances out-of-the-box, interpreted to simplify development process and packing, or transpiled to other languages such as Swift to target the iOS platforms or JavaScript and WebAssembly to make high-performance web applications. Besides, it includes a very large native library as well as a powerful package manager to allow re-using the same code for every platform.

Another important goal of the language is to be as safe as possible. The most fundamental feature this implies is a strong, static type system.

But this must not be achieved by using an heavy, complex syntax, which leads to the last - but not least - point of Rave: a lightweight syntax, easy to read and learn, and which allows to maintain programs in a long-term goal. This should be the case of every existing programming language, but sadly, many old and a few recent ones don't come with such an important thing.

### An overview of Rave

Rave is intended for every programmer, beginner or experimented, who aims to learn a new, simpliest way of building applications. It is based on the following fundamental concepts:

* _Safety_: by enforcing a lot of safetly rules, most errors can be detected at runtime, preventing your programs to crash at runtime ;
* _Clarity_: the syntax is simple, easy-to-learn, yet very explicit - you will never be surprised by a hidden, badly documented behaviour ;
* _Polyvalence_: a single source code can be used to target many different platforms, with very few adjustements being made ;
* _Simplicity_: the massive native library allows to perform many complex tasks, be it communicating with the operating system or simply manipulating simple data.

### Who is this book for?

This book is for every programmer who wants to learn Rave. It is adapted to be easily understable even by beginners who never used a programming language before, so don't worry about the difficulty level.

## Values and entities

### Concepts and mutability

To illustrate the concept of entity, think of it as a crate. The crate contains something, whatever it is, and has a label to indicate what type of contents is inside. In our case, the crate is called an _entity_, the thing it contains is its _value_, and the label is its _type_.

In order to use our entities, we must also give it a _name_. We can then _declare_ it:

```rave
// Example:
let greetings = "Hello world!";
```

Here, we have an entity named `greetings`, with an `"Hello world!"` value. Because the builder is intelligent, it guesses that, as the value is a `string`, the entity's type is `string` too.

Note that the entity's type can also be explicited:

```rave
let greetings: string = "Hello world!";
```

In this case, the declared type is dominant, meaning that if we try to replace our string by a number or anything else, the program won't build.

The only problem with our entity is that we cannot change its value. For instance, if we want to replace our greetings message by another, we will get an error:

```rave
let greetings = "Hello world!";

greetings = "Hello, world"; // ERROR
```

That's because entities are _constant_ by default, meaning their value cannot change after declaration. If we want to get a mutable entity, we have to use the `mut` keyword:

```rave
let mut greetings = "Hello world!"

greetings = "Hello, world!"; // Works fine
```

### Primitive types

There are several built-in types, but let's check the most common ones, called the _primitive types_: `void`, `bool`, `char`, `string` and all number types.

Voids (`void`) can only handle the `null` value. It's not useful for entities, but especially handful for other subjects we will see a bit later.

```rave
let my_void: void = null;
```

Booleans (`bool`) can either be `true` or `false`:

```rave
let bool_true: bool = true;
let bool_false: bool = false;
```

Characters are used to handle any [Unicode](https://unicode.org/) character. They are declared using single quotes (`'`):

```rave
let char1: char = 'a';
let char3: char = '最'; // Many languages are supported
let char2: char = '🦄'; // Emojis too!
```

Strings can contain several Unicode characters. They are declared using double quotes (`"`):

```rave
let str1: string = "Hello world!";
```

Multi-line strings can be made using backquotes:

```rave
let str1: string = `I am
a multi-line
string!`;
```

### Dealing with numbers

Numbers, on their side, get not only a single type, but as many as twelve! Why so many different, you will say? Well, by default, numbers are represented using the `i32` type, which is a signed 32-bit integer. That means it can handle both positive _and_ negative integers, going from `−2,147,483,648` to `2,147,483,647` - which is enough for most numbers.

But sometimes, you will need to handle bigger numbers. Here is the table of integer types:

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

The `i` prefix indicates a signed integer, which means it can handle negative numbers, while `u` indicates an unsigned integer, which is limited to positive numbers.

The number after the prefix indicates the number of _bits_ the number will take in memory. The bigger this number is, the more space it will take in the computer's memory. So, here is a tip: always use the smallest number type you need, in order to keep space for other data. This is especially true for platforms with very limited memory, like IoT.

Also, you should always prefer unsigned number types, and only take signed ones when you know you will have to handle negative numbers. This prevents from introducing security issues caused by some unexpected behaviours.

There is also the `isize` and `usize` types, which are respectively signed and unsigned integer types, with the same number of bits the processor has - so their capacity will vary depending on the machine they are ran on. They are essentially used to store memory addresses, as we will see later.

Note that, if you write large numbers, you can use the number separator (`_`):

```rave
let compact: u64 = 1000000000000000;
let clearer: u64 = 1_000_000_000_000_000;
```

There are two other number types, to handle floating-point numbers, called _float_ types: `f32` and `f64`. The number still indicates the same thing as for integer numbers.

* `f32` handles from `~ 1.2 * 10^-38` to `~ 3.4 * 10^+38` with a 6-decimal precision ;
* `f64` handles from `~ 2.3 * 10^-308` to `~ 1.7 * 10^+308` with a 15-decimal to 17-decimal precision

As you can see, these types can handle much bigger numbers, but their precision is limited, which may make precise calculus invalid. So, always be careful when dealing with float types. Especially, if you are working with critical values, like financial data, you may not want to use them.

```rave
let my_float: f32 = 1.32;
```

Type inferring is simple here: if a literal number has a decimal part (`.` followed by at least one digit), it is considered as a float. That works even if the decimal part is zero:

```rave
let my_num   = 1  ; // i32
let my_float = 1.0; // f32
```

Float types also cover the division of any non-zero number by zero, which leads to `INFINITY`:

```rave
let my_float: f32 = 2.0 / 0; // INFINITY
```

Be aware: This behaviour results in a runtime error for integers. Also, floats handle a special way zero by zero divisions:

```rave
let my_float: f32 = 0.0 / 0; // NaN (Not a Number)
```

Also, a specificity of all number types is _overflows_ and _underflows_. Here is an example:

```rave
let mut num: i8 = 127;
num = num + 1;

println(num); // Prints: -128
```

We just performed an overflow: when we exceed the number type's maximum value, it goes back to its minimum value. This is a mechanism forced by processors, which is not specific to this language.

Underflows goes the other way:

```rave
let mut num: i8 = -128;
num = num - 3;

println(num); // Prints: 125
```

Keep this in mind when performing calculus on primitive number types.

A last rule (promise!) is the absence of automatic numeric typecasting. This means that, while we can assign an `i32` value to an `i64` entity for instance, it's not possible to assign an `i16` value to an `i8` entity. This behaviour has been chosen to avoid overflows and underflows during conversion:

```rave
let small: u8 = 2;
let big: u16 = 60_000;

small = big; // ERROR
```

If this code had been valid, `small` would have contained a totally different value because of an overflow, as it can't handle numbers above 128. To enforce this assignment, it's possible to use explicit typecasting:

```rave
let small: u8 = 2;
let big: u16 = 60_000;

small = big as u8; // Works fine (but overflows)
```

Implicit typecasting is allowed when the target number type can handle all values of the source number type:

| Number type |    Is automatically typecastable to...   |
|-------------|------------------------------------------|
|     `i8`    | `i16`, `u16`, `i32`, `u32`, `i64`, `u64` |
|     `u8`    | `i16`, `u16`, `i32`, `u32`, `i64`, `u64` |
|     `i16`   | `i32`, `u32`, `i64`, `u64`               |
|     `u16`   | `i32`, `u32`, `i64`, `u64`               |
|     `i32`   | `i64`, `u64`                             |
|     `u32`   | `i64`, `u64`                             |
|    `usize`  | `u64`                                    |
|     `f32`   | `f64`                                    |

### Operators

There are a few operators to perform calculus:

```rave
// Addition
let sum = 6 + 2; // 8

// Substraction
let sum = 6 - 2; // 4

// Multiplication
let sum = 6 * 2; // 12

// Division
let sum = 6 / 2; // 3

// Remainer
let remainder = 6 % 2; // 0

// Pow
let pow = 6 ** 2; // 36
```

The general rule is the resulting number has the same type as the left operand - in these examples, the same type as `6`. This means that dividing an `i32` by an `i8` will always result in an `i32` for example.

There are also operators for bit-by-bit calculus:

```rave
let a = 60; // a : 0011 1100
let b = 13; // b : 0000 1101

// Bit-by-bit and
a & b; // 0000 1100 : 12

// Bit-by-bit or
a | b; // 0011 1101 : 61

// Bit-by-bit exclusive or
a ^ b;  // 0011 0001 : 49

// Binary left shift operator
a << 2; // 1111 0000 : 240

// Binary right shift operator
a >> 2; // 0000 1111 : 15

// One's complement (two's complement for signed integers)
~ a; // 1100 0100 : -60
```

On their side, assignment operators to quickly update the value of a numeric entity, which are made of any arithmetic operator followed by the `=` symbol:

```rave
let mut num: i8 = 6;

num %= 4; // 10
num *= 6; // 60
num &= 13; // 12
```

There are also the pre and post-incrementation and decrementation operators, which return values:

* `++ num`: pre-incremental operator, it increments the entity and returns its new value ;
* `num ++`: post-incremental operator, it increments the entity and returns its previous value ;
* `-- num`: pre-decremental operator, it decrements the entity and returns its new value ;
* `num --`: post-decremental operator, it decrements the entity and returns its previous value

Let's conclude with strings: they can be _concatenated_ (put a string at the end of another) using the addition `+` operator:

```rave
println("Hello" + ", " + "world" + "!"); // Prints: Hello, world!
```

There is also a special operator which allows to compute _string expressions_:

```rave
let name = "Jack";

println("Hello ${world}!"); // Prints: "Hello Jack!"
```

## Conditions and loops

### Comparison operators

Storing datas in entities is great, but we also want to run some instructions when we match a given condition.

First, let's introduce the concept of **nil values**. Values `null`, `false`, `""` (empty string) or `0` (in any number type) are nil values, all other are not. That's as simple as that.

Given that, we can use the _comparison operators_, which take two operands `a` and `b`, to perform comparisons:

|  Symbol |           Name           |            Returns `true` if...          |
|---------|--------------------------|------------------------------------------|
|  `&&`   | and                      | `a` and `b` are not nil values           |
|  `||`   | or                       | `a`, `b` or both are not nil values      |
|  `==`   | equal to                 | `a` is equal to `b`                      |
|  `!=`   | different than           | `a` is different than `b`                |
|  `>`    | greater than             |  `a` is greater than `b`                 |
|  `<`    | lower than               | `a` is lower than `b`                    |
|  `>=`   | greater than or equal to | `a` is greater than or equal to `b`      |
|  `<=`   | lower than or equal to   | `a` is lower than or equal to `b`        |
| `nand`  | not and                  | `a`, `b` or both are nil values          |
| `nor`   | not or                   | `a` and `b` are both nil value           |
| `xor`   | exclusive or             | `a` or `b` is a nil value (but not both) |

The last operator, `!`, takes a single operand and returns `true` if it's **not** a nil value. Showcase:

```rave
let a = 0;
let b = 3;

a == b; // false
a != b; // true

a > b; // false
a < b; // true

!a; // true
!b; // false
```

### Conditions

Now we have operators to perform comparisons, let's see _conditional blocks_. The most common one goes like this:

```rave
let stock = 20;

if stock > 0 {
  println('We still have stocks :)');
}
```

This program will print `We still have stocks :)`. Indeed, the `if` blocks runs its _body_ (every instruction between its braces) if the provided _condition_ (here, `stock > 0`) is not a nil value. This means that, if the condition returns `true` for instance, its body will be evaluated.

We can also evaluate another set of instructions if the condition isn't met:

```rave
let stock = 20;

if stock > 0 {
  println('We still have stocks :)');
} else {
  println('Stock is empty :(');
}
```

Or even chain conditions:

```rave
let stock = 20;

if stock > 0 {
  println('We still have stocks :)');
} elif stock == 0 {
  println('Stock is empty :(');
} else {
  println('Wow, stock is negative!');
}
```

#### Notion of scope

Any entity declared inside a block belongs to its _scope_, which is everything between the block's beginning and end:

```rave
if /* scope begins */ stock > 0 {
  println("We still have stocks :)");
/* scope ends */ }
```

This means that, if we declare an entity in the block, it will only be available inside it:

```rave
if stock > 0 {
  let positive_stock = true;
  println(positive_stock); // Prints: true
}

println(positive_stock); // ERROR
```

### Loops

_Loop blocks_ allow to repeat a set of instructions depending on a specific condition. The most common type is the `for` loop:

```rave
for i in 0..5 {
  println(i);
}
```

This will print successively `0`, `1`, `2`, `3` and `4`. To repeat up to the second number:

```rave
for i in 0..=5 {
  println(i);
}
```

This program will print the same numbers as the previous one, plus `5`.

While `for` loops are handy to repeat instructions given a specific range, we sometimes want to perform the repetition until a specific condition is met:

```rave
let mut stock = 5;

while stock > 0 {
  println(-- stock);
}
```

This will print `5`, `4`, `3`, `2`, `1` and then `0`. Basically, the `while` loop checks the condition, runs its body if it's not nil, check again the condition, run its body if it's not nil, etc.

Sometimes, it's more handy to evaluate the condition at the end of the loop, so for that we can use the `do..while` block:

```rave
let mut stock = 0;

do {
  println(-- stock);
} while stock > 0;
```

This code will print `-1`, because the body is ran **before** the condition is evaluated. This ensures the block's body will be ran at least once.

In some scenarios, we can want to run forever the same set of instructions (like in a game engine or so on). For that, instead of using a `while true` loop, it's better to use this one:

```rave
loop {
  // Do some stuff here
}
```

The behaviour will be the same, but it explicits your intentions and allows the builder to perform further optimizations.

Note that loops can be exited manually:

```rave
let mut counter = 0;

loop {
  if ++ counter == 5 {
    break ;
  }

  println(counter);
}
```

This code will print values up to `4`, then the loop will break. Loops can also be iterated:

```rave
let mut counter = 0;

loop {
  if ++ counter == 2 {
    pass ;
  }

  println(counter);
}
```

This code will print the counter's value forever, except `2`, because the `pass` instruction goes back to the beginning of the loop, ignoring all instructions below it.