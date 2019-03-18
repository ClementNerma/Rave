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
|    `isize`  | `i64`                                    |
|    `usize`  | `u64`                                    |
|     `f32`   | `f64`                                    |

### Operators

There are a few operators to perform calculus:

```rave
// Addition
let sum = 6 + 2; // 8

// Substraction
let sub = 6 - 2; // 4

// Multiplication
let mul = 6 * 2; // 12

// Floating-point division
let div = 6 / 2; // 3.0

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

#### Inline conditions

Conditional blocks can also be used inline to run a single instruction:

```rave
let mut num = 0;

// Increase 'num' if it's negative
num += 1 if num <= 0;
```

#### Values generation

It's also possible to get value from inline conditions by using the following syntax:

```rave
let stock = 0;

let status = if stock > 0 {
  "We still have stocks"
} else {
  "We are out of stock"
};

println(status); // Prints: We are out of stock
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

## Data structures

### Arrays

As we saw, primitive types are great to handle simple values, such as a number or a string, but sometimes we need more powerful data structures. For instance, let's imagine we want to represent a list of names. This would require to declare as many variables as names, which quickly become unhandy to use. Furthermore, if we want to process all these names, we will quickly be blocked.

The more simple way to reprend a list of values is to use a _vector_. There are divided in two categories: _arrays_ and _lists_.

The first ones represent a fixed-length suite of data, which means we won't be able to add or remove any value, only to read and write them. An array is declared this way:

```rave
let names = [ "Jack", "John", "Paolo" ];

// Explicit type:
let names: string[3] = [ "Jack", "John", "Paolo" ];
```

We can then read any of the names using an index:

```rave
let names = [ "Jack", "John", "Paolo" ];

println(names[0]); // Prints: Jack
println(names[1]); // Prints: John
println(names[2]); // Prints: Paolo
println(names[3]); // ERROR
println(names[-1]); // ERROR
```

The number between brackets is called an _index_, and starts at `0`. As you can see, trying to access a non-existing element results in an error, but the downside is that sometimes this error can happen at runtime - for instance if the index is stored inside a variable.

Note that an array's size is fixed in its type:

```rave
let mut names = [ "Jack", "John", "Paolo" ];

names = [ "Paolo", "John", "Jack" ]; // Ok
names = [ "Paolo", "John", "Jack", "Betty" ]; // ERROR (size mismatch)
```

A vector's (array's or list's) length can be got using its `.length` property:

```rave
let mut names = [ "Jack", "John", "Paolo" ];

println(names.length); // Prints: 3
```

#### Iteration

Arrays can be easily iterated:

```rave
let names = [ "Jack", "John", "Paolo" ];

for name in names {
  println(name);
}
```

This will print `Jack`, `John` and then `Paolo`.

#### Updating values

We can also edit an array's values easily:

```rave
let names = [ "Jack", "John", "Paolo" ];

names[0] = "Someone else";

println(names[0]); // Prints: Someone else
```

### Enumerations

Enumerations allow to create a type that only allows a pre-defined set of values. It's useful for describing many, here is an example with a person's gender:

```rave
enum Gender {
  Man,
  Woman,
  Other
}
```

We can then use this type in our entities:

```rave
let gender = Gender::Man;

// Explicit type:
let gender: Gender = Gender::Man;
```

Any value that is not in the enumeration is forbidden:

```rave
let gender: Gender = "Hello !"; // ERROR
```

Note that, by default, an enum's values are `u8` numbers, starting at `0`:

```rave
println(Gender::Man == 0); // Prints: true
println(Gender::Woman == 1); // Prints: true
println(Gender::Other == 2); // Prints: true
```

This behaviour can be overwritten by specifying manually the fields' values (must still be `u8` values):

```rave
enum Gender {
  Man = 2,
  Woman = 3,
  Other = 5
}

println(Gender::Man == 2); // Prints: true
println(Gender::Woman == 3); // Prints: true
println(Gender::Other == 5); // Prints: true
```

#### Holding values

An enum's values can also hold tuples:

```rave
enum Gender {
  Man,
  Woman,
  Other(string)
}
```

In this example, it allows persons of other genders to give more informations about it:

```rave
let gender = Gender::Other("multigender");
```

### Pattern matching

Currently, if we want to run a set of instructions depending on an enum's value, we have to use the following code structure:

```rave
let gender = Gender::Man;

if gender == Gender::Man {
  println("You're a man");
} elif gender == Gender::Woman {
  println("You're a woman");
} else {
  println("You're neither a man nor a woman");
}
```

Here, to handle the enum's tuple field, we can use a _conditional declaration_:

```rave
if gender == Gender::Man {
  println("You're a man");
} elif gender == Gender::Woman {
  println("You're a woman");
} elif let ::Other(other_gender) = gender {
  println("Your genre is ${other_gender}");
}
```

You may have noticed the `if let` blocks automatically guesses the enum's type so we don't have to prefix `Other` by `Gender`. But this still heavy, especially with big enums.

#### The `match` block

So instead, we can use the `match` block:

```rave
match gender {
  ::Man -> println("You're a man"),
  ::Woman -> println("You're a woman"),
  ::Other(gender) -> println("You're a gender")
}
```

That's a lot more readable. A good point is `match` guesses the enum's type just like `if let`, so we don't have to prefix all fields with `Gender`.

Also, `match` gets a rid of a serious problem: forgetting to check some enum fields. If not all fields are tested, an error is thrown at build time:

```rave
match gender {
  ::Man -> println("You're a man"),
  ::Woman -> println("You're a woman")
} // ERROR ('Other' field not checked)
```

If you really want to avoid checking a field, you can use the `_` keyword, which is a fallback in the case none other condition have been met:

```rave
match gender {
  ::Woman -> println("You're a woman"),
  _ -> println("You're not a woman")
}
```

Note that `match` can also be used for any other type of conditions, by putting them between parenthesis:

```rave
let num = 2;

match num {
  (num > 0) -> println("Number is positive"),
  (num < 0) -> println("Number is negative"),
  _ -> println("Number is zero")
}
```

It's also possible to run several instructions for a single match, by creating a child block:

```rave
let num = 2;

match num {
  (num > 0) -> println("Number is positive"),
  (num < 0) -> println("Number is negative"),
  _ -> {
    println("Number is zero");
    println("What a great day to check a number's sign!");
  }
}
```

Another interesting usage is for inline matches:

```rave
let stock = 0;

let status = match stock {
  (stock > 0) -> "Stock is positive",
  (stock < 0) -> "Stock is negative",
  _ -> "Stock is empty"
}

println(status); // Prints: "Stock is empty"
```

#### Optional values

A very common enumeration is `Option<T>`, which is defined this way:

```rave
enum Option<T> {
  Some(T),
  None
}
```

It is used to represent _optional values_ of any `T` type: the value can either be _concrete_, so it will be represented by the `Some(T)` field, or _absent_, with `None`:

```rave
let gender = Gender::Man;

let gender_other: string? =
  match gender {
    ::Other(description) -> Some(description),
    _ -> None
  };
```

The `?` symbol turns any type into its `Option` equivalent, so here it will turn `string` into `Option<string>`. Pretty handy, right?

Also, fields or the `Option<T>` enum don't need to be prefixed by `Option<...>::`: you can simply write the fields' name to use them.

### Lists

Lists act are dynamic suite of datas: it's possible to add new values and remove existing ones at anytime.

```rave
let names = new List("Jack", "John", "Paolo");

// Add new values
names.push("Betty");

// Remove last value
names.pop();
```

Writing is a simple as for arrays:

```rave
names[0] = "Someone else";
```

Because a list's size may change over time, there is no guarantee a given key exists. That's why, when retrieving a list's key, an optional value is returned:

```rave
if let Some(name) = names[2] {
  println(name); // Prints: Paolo
}

// ====== or =====
match names[2] {
  Some(name) -> println(name),
  _ -> {}
}
```

Still, lists can be iterated easily:

```rave
for name in list {
  println(name);
}
```

This code works the same way as for an array.

#### Inline generation

There is a special syntax for quickly generating lists:

```rave
let cubes = (n * n * n for n in 1..=3);

for cube in cubes {
  println(cube);
}
```

This will print `1`, `8` and `27`.

### Statics

Statics associate a list of _keys_ to _values_. They are especially useful for representing data with different types. For instance, let's imagine we want to describe a person with a name, an age, and a gender. We have three different types (`string`, `u8` and `Gender`), so we cannot use an array. Instead, we will use a static:

```rave
let person = {
  name: "John",
  age: 28 as u8,
  gender: Gender::Man
};

println(person.name); // Prints: John
println(person.age); // Prints: 28
println(person.gender == Gender::Man); // Prints: true
```

In this example, the type of the `person` entity is inferred. If we want to specify it explicitly - which can be very handy if we want to re-use the same data structure in several entities -, we can use a _structure_:

```rave
struct Person {
  name: string;
  age: u8;
  gender: Gender;
}

let person = Person {
  name: "John",
  age: 28,
  gender: Gender::Man
};
```

You may have noticed we put the type's name before our static's beginning instead of putting it on the entity. This last writing is perfectly fine, but the syntax we used here is generally better because it directly applies typechecking to the static, which means we do not have to perform an explicit numeric typecasting on `28`, for instance.

Besides, this syntax can be used even when we do not directly assign the value to an entity, as we will see soon.

#### Fields mutability

By default, a static's fields are immutable. To make them mutable, their name must be prefixed with the `mut` keyword:

```rave
struct Person {
  name: string;
  mut age: u8;
  gender: Gender;
}

let person = Person {
  name: "John",
  age: 28,
  gender: Gender::Man
};

// ===== or =====

let person = {
  name: "John",
  mut age: 28 as u8,
  gender: Gender::Man
};
```

Another advantage of writing the structure's name just before the static is that its fields' mutability is inferred too. We can then update these fields' value:

```rave
person.name = "Someone else";

println(person.name); // Prints: Someone else
```

### Tuples

Tuples are a fixed-length suite of data, in which each member can be of a different type:

```rave
let tuple = ("John", 28 as u8, Gender::Man);
```

Tuple types are declared using the `struct` keyword:

```rave
struct Person (string, u8, Gender);

let person = ("John", 28, ::Man);
```

### Dictionaries

Dictionaries are a mix between lists and statics: they allow to use a dynamic list of key-value pairs, which can be added or removed at anytime. They most common type of dictionary is maps, represented by the `Map<K, V>` type, with `K` being the type of keys and `V` the one for values:

```rave
// Create a map that links 'string' keys to 'u8' values
let numbers = new Map<string, u8>;
```

Writing goes like this:

```rave
// Assign '0' to the 'zero' key
numbers["zero"] = 0;
```

Because there is no guarantee a given dictionary's key exists, accessing one will return an optional value, like lists do:

```rave
match numbers["zero"] {
  Some(num) -> println("zero = ${num}"),
  _ -> {}
}
```

#### Iteration methods

There are three ways to iterate dictionaries. By default, iteration is performed on `(K, V)` (key-value pair) tuples:

```rave
for (key, value) in numbers {
  println("${key} = ${value}");
}
```

But it's also possible to only iterate on keys or values:

```rave
for key in numbers.keys() {
  println(key);
}

for value in numbers.values() {
  println(value);
}
```

### Entities shadowing

Entities _shadowing_ consists in declaring an entity several times. When this happens, the previous entity is deleted and replaced by its new version. This allows, for instance, to create an entity with a given type, then to switch it after a few operations:

```rave
let gender = "male"; // type: string

// do some stuff

enum Gender {
  Man,
  Woman,
  Other(string)
}

let gender = match gender {
  "male" -> Gender::Man,
  "female" -> Gender::Woman,
  _ -> Gender::Other(gender)
}; // type: Gender
```