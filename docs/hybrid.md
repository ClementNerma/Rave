# The Hybrid Book

## Foreword

Welcome to the second version of _The Hybrid Book_. This book will teach you the SilverNight programming language, step by step, and introduce every single feature to make an exhaustive tutorial.

But first, what is SilverNight?

This language was designed to unify advantages taken from many programming languages and to reduce their downsides.

Today, writing a low-level program is essentially done using C, C++ or Rust. The two first languages are very complex to handle, and have many downsides, like the requirement to type explicitly every single variable and constant. Also, they aren't safe, with many bugs being caused by their native features like the `NULL` pointer, references to any memory adress, or the very common undefined behavior. On Rust's side, we have a great safety and modern concepts, but it's still complicated to understand when you are not used to develop low-level programs.

On the other side, high-level languages such as JavaScript and Python allow a great flexibility. But they have many downsides too: variables can't be typed, so if a function wants to work with a string, it must manually perform a typecheck. Programs are clearly slower than low-level languages' ones. On JavaScript's side, there are other problems inherent to the fact it wasn't designed to be such a widely used language: the uncomfortable iteration methods, the symbols and objects properties checking using the `.hasOwnProperty` method to avoid encountering the native methods like `.__defineGetter__`, plus the many incompatibilities between browsers, lead to a language that is eventually complicated to handle.

SilverNight was born to get the best from these languages: statically typed, but with a strong type inference system, it is highly meta-programmable and safe to use by reducing the risks factor: types are, by default, not nullable ; references are, still by default, constants. Besides, its behavior is very explicit, and learning the whole language is far easier than for most of the widely used language. Learning every single obscure concept of C++ or JavaScript will take you weeks and weeks, but not for SilverNight. For example, this relatively small book contains every single aspect of the language.

The polyvalence of the language is built upon four key-concepts: compilation, that allows to make an high-performance executable program to reach the level of performance of other low-level languages such as Rust ; transpiling, which allows to turn a SilverNight source code into a JavaScript or a Swift program for example, to be able to run your program on every platform ; interpretation that allows to run the program on any platform and access more powerful debug tools ; and frontend libraries that allow to use the exact same API to access filesystem, write multi-threading programs, etc. whatever the target transpiling language is or if the program is compiled or interpreted.

Of course, this language has downsides itself: it isn't as fast as a well-written C program, isn't as safe as Rust especially when coming to multi-threading, and isn't as flexible as dynamic-typed languages. But still, it has a simpler learning curve, is far more faster to learn exhaustively, and can either be compiled, interpreted or transpiled.

## Introduction

SilverNight is borned from the wish to have a language almost as simple as JavaScript or Python but as powerful as low-level languages, and as safe and languages like Rust to cover most of developers' needs. It is a statically-typed, functional programming language. Intended for multi-platform development, it comes with great flexibility and a large native library.

### What does "hybrid" mean?

This book is called "hybrid" because it provides a simple specification for the language but also acts as a tutorial for persons who want to learn it from the beginning to the very end.

Though, it is not as simple as a tutorial because the concepts are not taught in the most intuitive order, but it's still a lot more simple as reading a simple specification document.

### For whom is this book?

This book is for everyone who wants to learn all the features of SilverNight, or simply for developers who are curious to know how this language works.

In order to fully understand this book, you should already know at least one other programming language (the lower level it is, the better), ideally with a good knowledge in [Object-Oriented Programming (OOP)](https://en.wikipedia.org/wiki/Object-oriented_programming) because a huge part of SilverNight is centered around this concept.

**WARNING: Please note this language is not finished yet ; some features could and WILL be added, modified or removed at anytime. It's still a draft at this point and no feature or syntax is frozen.**

### Who is this language for?

Because of the simplicity allowed by the language, it is not designed for very low-level applications, like drivers or operating systems - though it's still possible to make them. In order to make such low-level programs, some other programming languages have better advantages: they are even faster, allow to deal with concepts very close to the hardware. One of the most known low-level languages is the [C++](https://en.wikipedia.org/wiki/C%2B%2B) you can use for this particular purpose.

### Setting up environment

#### Installation

**As the builder is not done yet, programs cannot be compiled/interpreted/transpiled and there is no way to run them. This book simply exists to detail the languages' concept and the way it works. Thanks for your understanding.**

As a pre-requisite you must have [Git](https://git-scm.com/) as well as [Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com) (or [NPM](https://www.npmjs.com)) installed on your computer.

Open a terminal and run the following commands:

```bash
git clone https://github.com/ClementNerma/SilverNight-draft.git
cd SilverNight
yarn install-tools # NPM: `npm run install-tools`
```

_NOTE :_ As this program installs the tools on your computer, you may have to run the `yarn install-tools` command with `sudo` on Linux systems.

To check if all the tools were correctly installed, simply run this command in a terminal:

```bash
snt -v
```

If it shows you a version number, the tools are available globally.

#### Building programs

You can write SilverNight with any text editor - even with the famous Windows' notepad! But we advise you to use a code editor, like [Atom](https://atom.io) or [Visual Studio Code](https://code.visualstudio.com), and install the SilverNight [syntax highlighting extension](https://github.com/ClementNerma/SilverNight-draft#syntax-highlighting-support) for them. This will highlight your code following different rules to make it more pleasant to see and write.

Once you wrote your code, save it in a file with the `.sn` extension. Then, open a terminal and go into the folder in which your file is, and run `snt program.sn` (replace `program.sn` by the name of your file) to interpret it. The program will be built and then be interpreted to your machine - this avoids having to compile the program every time you modify it.

If you look for better performances, you can compile the program with `snt -c program.sn` which will produce an `a.exe` / `a.run` program depending on your platform, or `snt -c program.sn -o program.exe` / `snt -c program.sn -o program.run` to have a custom-named output program. This program will run on the specific architecture you compile it on (e.g. Linux + x86 processor + 64-bit).

SilverNight programs can either be compiled (producing an executable), interpreted (to run them step by step for example) or transpiled (converted to another programming language). That's a subject we'll cover later, but remember that for each of these processes, the program must first be _built_ using the toolchain's _builder_. It's a program that checks if your program is valid, optionally optimizes it, and give it to the compiler / interpreter / transpiler.

#### Commenting your code

SilverNight has several types of comments for different purposes, but the main ones are the single-line and the multiple-line comments. These are passive comments (which means they don't do anything and are completely ignored by the builder).

To write a single-line comment, write `//` just before your comment. Everything written **after** this double slash will be ignored until the end of the line.

For multi-line comments, open the comment with `/*` and close it with `*/`. You can split it across several lines, or put in the middle of a line.

Showcase:

```sn
// This a comment;

println!('Hello'); // This is still one

/* This is a
   multi-line
   comment */

println!(/* Even in the middle of a line */ 'Hello');
```

#### Displaying values

We can display values inside the terminal (called _output_) by using the `println!` flex (we'll see what is a flex later in this book).

```sn
println!('Hello !');
```

## Mutables

In SilverNight, every single value is either a primitive or an object. To describe what a primitive or an object is, we use a _type_, which simply consists in a set of methods, properties and other things that provides tools to manipulate an entity, like a variable or a constant. You can also see it as a describer that indicates what kind of value an entity can take.

_Tip :_ For those who already programmed in Java, C, C++ or Rust, the concept of type is roughly the same in SilverNight.

There's several ways to declare a resource in SilverNight. Let's take a look at variables (mutable resources). We define it with the `let` keyword and give them a _type_ (the class that describes it).

```sn
let hello: string;
```

This will declare a mutable variable called 'hello' with type `string`. When declared this way, an empty string is put in this (we call it an _instance_ of the 'string' class).

To assign a content, we use the `=` operator:

```sn
let hello: string;
hello = 'I am a variable!';
```

We can also assign a value in the declaration statement:

```sn
let hello: string = 'I am a variable!';
```

This syntax is kind of heavy. Because it's kind of repetitive to declare the type **and** the initial value of each variable, we can use a feature called _inferred typing_ which guesses the variable's type thanks to the value we assign to it:

```sn
let hello = 'I am a variable!';
```

In the above code, the builder understands we are trying to assign a string to `hello`, so it guesses its type is the same: `string`.

### Constants

Some datas are not intended to be modified. To store them, we use _constants_, which are declared like variables but with the `val` keyword. They main difference with mutables when declaring them is that we must give an initialization value:

```sn
val constant = 'I am a constant!';
```

We can also specify the constant's type if we want to be explicit. Here are some examples:

```sn
val constant = 'I am a constant!'; // Works fine
val constant: string = 'I am a constant!'; // Works fine
val constant: string; // ERROR: Initialization value expected
```

Constants cannot have their value changed, so we can't use the `=` operator on them. Consider they are read-only resources with a value that can't change whatever happens. Though, we can still use other resources to initialize them:

```sn
// Declare a variable
let str = 'I am a string!';

// Declare a constant
val constant = str;

// Assign a new value to the constant
constant = 'A new value'; // ERROR: Cannot assign a value to a constant
```

### Plain constants

We can also declare '_plain constants_', which are explicit values that can be used by the builder to optimize some calls but also to perform additional tests about program's validity. Some functions also require plain constants, as we will see later. Basically, a plain constant is a constant that can contain only a single value that cannot come from a variable. This means we can't do this, for example:

```sn
val msg = 'Hello';
pln HELLO = msg; // ERROR
```

The initialization value must be a _litteral_, which is an explicit value that is predictable without running the program.

```sn
// Declare a plain constant
pln MY_JOB = 'Developer';
```

A naming convention for plain constants is to use a capitalized name, to make them distinctive from variables and 'simple' constants. As always for constants, we can declare the value's type, but it's still optional.

Note that, even though we cannot take non-litteral values to initialize a plain constant, we can still take the value from another plain constant:

```sn
pln MY_JOB = 'Developer';
pln MY_REAL_JOB = MY_JOB; // Works fine
```

Always prefer declaring values using plain (or simple) constants instead of mutables when you won't change their value. This prevents these theorically immutable datas from being modified by error. Also, plain values may increase your program's speed.

#### Original syntax

First of all, plain constants only accept `#pln<T>` values, where `T` is a given type. This is a directive that indicates a value must be a plain one. For example, a `#pln<string>` would accept any litteral (e.g. `'my string'`) or another plain constant's content, but not the value from a mutable or from a simple constant.

Technically, the plain constants declaration we just saw is a _shortened syntax_ of another, which means it has been reduced to be more easy to write and read. Here is the full syntax behind it:

```sn
// Shortened syntax
pln STR: string = 'Hello world!';

// Full syntax
val STR: #pln<string> = 'Hello world!';
```

The full syntax is strictly equivalent to the shortened one ; we are simply defining a constant (so its value will never change, it's immutable) that only accepts plain values (which means it's predictable). A predictable and immutable value is called a plain value, and the case of an entity it's called a plain constant.

Anywhere we need to create a plain constant with the `pln` keyword, we can also do it with the `val` keyword by explicitly indicating we are using a `#pln<T>` type.

### Primitive types

#### Voids

There are two categories of types in SilverNight: _primitives_ and _objects_. The first ones are voids, booleans, numbers and strings. Everything else is not a primitive type.

Primitives are special because they are treated like objects even though they aren't. This means that every feature that can be used on objects can be used on primitives too, for example. There are other specificities we will see later.

The first primitive type is the voids, which are the simpliest type to handle because they can take only one value: `null`.

```sn
let void1: void = null;

// With type inference
let void1 = null;
```

Note that instanciating the `Void` class (alias of `void`) will create a new instance equal to `null`:

```sn
// This declaration:
let void1 = new void();
// Is equivalent to this one:
let void1 = null;
```

#### Booleans

Booleans can only take two values: `true` or `false`.

```sn
let bool1: bool = true;
let bool2: bool = false;

// With type inference
let bool1 = true;
let bool2 = false;
```

#### Numbers

Numbers are mainly represented by the `int` type, which contains signed integers (which means it can handle both positive and negative integers):

```sn
let num: int = 2;
```

#### Strings

Strings are a suite of unique characters:

```sn
let str1: string = 'Hello world!';

// Empty strings are allowed, too
let str2: string = '';
```

#### NIL values

We call _NIL values_ the following values: `null` (NIL void), `false` (NIL boolean), `0` (NIL number), `''` (NIL string).

When a primitive variable is declared without an assignment, the NIL value associated to its type is used:

```sn
let var1: void  ; // null
let var2: bool  ; // false
let var3: int   ; // 0
let var4: string; // ''
```

## Numbers and operators

### Integers

There is not only one type to represent numbers. The 'default' one is `int`, an alias of `int32`, a signed 32-bit integer. It can handle any integer between `−2,147,483,648` and `2,147,483,647`.

Here is the table of types with their respective capacities:

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

Note that, the more bits a number uses for its representation, the more memory it takes. For example, `i32` takes, as its names indicates, 32 bits. But, `u16` will only take 16 bits - that's two times less ! -.

By default, integers use the `i32` type, but if you don't need such big numbers, you can still use the `i16` type instead. This is especially important when making programs for platforms with a very limited amount of memory (like Arduino boards). For very small numbers, you can even use the `i8` (`byte`) type (handling from `-128` to `127`).

Also, note that 64-bit numbers even work on 32-bit processors, as they are part of the language specifications.

There is two additional types, called `isize` and `usize`, which are respectively a signed integer and an unsigned integer type. Their size is defined following the architecture of the processor: on a 32-bit processor, they will be 32-bit-long, but on a 64-bit one, they will be 64-bit-long. `usize` guarantees to be able to handle any memory adress and index in an array on the current platform, where an `u32` could be too short on 64-bit processors.

### Floating-point numbers

SilverNight also supports floating-point numbers. There are two signed types for them, `f32`, `f64`. Unlike integers, there isn't unsigned floating-point number types.

Their ranges is huge but, while integers have an exact value, these types have a limited precision:

* `f32` handles from `~ 1.2 * 10^-38` to `~ 3.4 * 10^+38` with a 6-decimal precision ;
* `f64` handles from `~ 2.3 * 10^-308` to `~ 1.7 * 10^+308` with a 15-decimal to 17-decimal precision.

As you can see, the floating-point types can handle huge ranges, but they don't have the same precision. For example, substracting `0.0000003` (7 decimals) to a `f32` will have no effect at all, but it will on `f64`, which has a better precision.

```sn
let num: f32 = 1;
num = num - 0.0000003; // num is still equal to 1
num = num - 0.000003; // This time, the substracting affected it

let longnum: f64 = num; // Works fine
longnum = longnum - 0.0000003; // This time it affects the variable because
                               // `f64` type has a better precision
```

In memory, `f32` costs 32 bits, while `f64` costs 64 bits.

Note that calculations on `f64` numbers will be slower than `f32` numbers only if the program runs on a 32-bit processor, which is more and more rare. On 64-bit processors, it will even be a little bit faster.

The 'default' floating-point type will be `f64` with inferred typing, due to its higher precision.

```sn
let num = 0.0001; // f64
```

### Explicit typing

A problem that low-level languages (like C or SilverNight) compilers often encounter is how to interpret user's numbers when doing several operations. For example, let's take this code:

```sn
val result = 2 / 3;
```

When seeing this code, you should predict the result is `0.6666...`. But, what the builder sees here is an integer divided by another an integer. And the result of such a calculation is another integer. That's why this code produces `0`. An unexpected number that could result in strange behaviours in your programs. The simpliest and shortest way to indicate you are dealing with a `f32` is to use the explicit notation:

```sn
val result = 2.0 / 3.0;
```

Giving a decimal part to a number indicates it's a `f64`, even if it's `.0`. So here, the type of `result` will be a `f64`.

Note that the result of an operation between a given number type and another number type (whatever they are) will be the first number type. This means that we could have omitted the `.0` after the `3` in the previous example (but not after the `2`, as it clearly indicates we are dealing with a `f64`).

Also, if you explicitly want to get a `2` contained in a `u32` for example, there is a lighter syntax than writing the type's name, using the _number type suffix_:

```sn
2b;  // i8 (Byte)
2ub; // u8 (Unsigned Byte)
2s;  // i16 (Short)
2us; // u16 (Unsigned Short)
2;   // i32
2u;  // u32 (Unsigned)
2l;  // i64 (Long)
2ul; // u64 (Unsigned Long)
2f;  // f32 (Float)
2d;  // f64 (Double)
2p;  // usize (Unsigned Pointer)

// Showcase:
let i = 2u; // u32 (Unsigned)
i += 1;
println!(i); // Prints: '3'
```

### Numbers typecasting

Sometimes you will want to convert a number of a given type to another type, for example an `i16` to an `u16`. This will happen, most of the time, when dealing with functions' arguments as we will see later, but also when trying to assign to an entity that doesn't have the same number type:

```sn
let i: int = 8;
let j: u16 = i; // ERROR (incompatible types)
```

The operation to convert a value from a type to another is called _typecasting_. For numbers, upcasts are automatically performed, meaning that if we give an `i8` where an `i16` is expected, the value will be automatically typecasted. Here is the list of upcasts:

* Converting an `i8` to an `i16` ;
* Converting an `i16` to an `i32` ;
* Converting an `i32` to an `i64` ;
* Converting an `u8` to an `u16` ;
* Converting an `u16` to an `u32` ;
* Converting an `u64` to an `u64` ;
* Converting a `f32` to a `f64`

Any other conversion will result in an error:

```sn
let a: i32 = 2;
let b: i64 = b; // Works (upcast: i32 -> i64)

let c: i16 = 542s;
let d: i8  = c; // ERROR (downcast)

let e: u8 = 250u;
let f: i8 = e; // ERROR (external cast)
```

The first error case, _downcast_, happens because the conversion could result in a loss of informations. For example, if we have an `i16` containing the `542` number, converting it to an `i8` would result in a loss because it can't store such a number.

Still, we can perform this conversion using an _explicit typecast_:

```sn
let c: i16 = 542;
let d: i8  = <i8> c; // Works (explicit downcast)
```

This works because we clearly indicate to the builder we know that informations may be lost during the conversion, but we want to do it anyway. In fact, the process behind this is not such magic, but it involves many concepts we will see far later in this book.

The second error case is due to the same reason: if we store `250` in an `u8`, it exceeds the capacity of an `i8`. The solution here is also to perform an explicit cast:

```sn
let e: u8 = 250ub;
let f: i8 = <u8> e; // Works (explicit external cast)
```

This part may appear complex, but be sure to understand it as it is a critical concept when dealing with numbers.

### Alternative bases

Because sometimes we don't want to deal with decimal numbers, but also with binary, hexadecimal or even octal values, there is a way to represent them in their original base:

```sn
val dec1 =    92; // Decimal
val dec2 = 0d192; // Decimal

val bin = 0b110; // Binary
val oct = 0o675; // Octal
val hex = 0xFFA; // Hexadecimal
```

Note that all numbers, whatever is the representation you use, are converted to decimals and manipulated by the computer as bits. This is just a way to represent simply numbers in an alternative base. For example, writing `0xA` is _exactly_ the same as writing `0d10` or even `10`.

Also, because representing large numbers can quickly become a big deal without a number separator, we can use the underscore `_` symbol to separate digits without ending the number:

```sn
0b10000011;
0b1000_0011; // Strictly equivalent
```

When writing a plain number, all underscores are simply removed from its representation. Note that you cannot start a number with an underscore.

### Overflow and underflow

A specificity about numbers is the concept of _overflow_ and the similar concept of _underflow_. When dealing with a `i8` for example, if we write:

```sn
let num: i8 = 127b;
num = num + 1;
println!(num);
```

The expected result is `128`. But, because this type cannot handle it, it will _overflow_, and so it will come back to its minimum value, which is `-128`. So, the code above will print `-128`, which is unexpected. Be aware of that!
The same behavior applies when dealing with the minimum numbers:

```sn
let num: i8 = -127b;
num = num - 3;
println!(num); // Prints: '126'
```

This is called an _underflow_.

### Mathematical operators

When we apply basic operations on values, like addition or division, we use _operators_. They are divided into several families, notably the mathematical operators, which includes the addition operator:

```sn
val result = 2 + 5; // Perform an addition
```

The type deduction we saw before guesses the result of `2 + 5` (an addition of two `int`) will be an `int` itself.  Mathematical operators always take two numbers and return a number.

Here is the list of all mathematical operators:

* `+` (add)
* `-` (substract)
* `*` (multiply)
* `/` (divide)
* `%` (modulo)
* `**` (pow)

Showcase:

```sn
8 + 4; // 12
8 - 4; // 4
8 * 4; // 32
8 / 4; // 2
8 % 4; // 2
8 ** 4; // 4096
```

#### Assignment operators

Unlike operators above that create a value from two other ones, assignment operators directly affect the variable they are used on.

The list is:

* `+=` (add)
* `-=` (substract)
* `*=` (multiply)
* `/=` (divide)
* `%` (modulate)
* `**=` (pow).

For example, doing `var += 5` is exactly like `var = var + 5`. The same thing applies for all assignment operators.

Showcase:

```sn
let num: int = 0;

num += 8; // num == 8
num -= 6; // num == 2
num *= 9; // num == 28
num /= 4; // num == 7
num %= 5; // num == 2
num **= 3; // num == 8
```

#### Incremental operators

There only two incremental operators, which take a single variable (not a constant or a plain value) and change its value. We can write the operator before or after the variable's name but be aware, this will change the operator's effect.

* `variable ++` (post-increment operator, increment `variable` and return its old value)
* `++ variable` (pre-increment operator, increment `variable` and return its new value)
* `variable --` (post-decrement `variable` and return its old value)
* `-- variable` (pre-decrement `variable` and return its old value)

Showcase:

```sn
let num = 0;

println!(num ++); // Prints: '0' ; num = 1
println!(++ num); // Prints: '2' ; num = 2
println!(num --); // Prints: '2' ; num = 1
println!(-- num); // Prints: '0' ; num = 0
```

### Logical operators

Logical operators take one or two entities, which are converted to booleans (`false` if they are NIL values, `true` else), and return a boolean.

The logical operators are:

* `&&` (and)
* `||` (or)
* `>` (greater than)
* `<` (less than)
* `>=` (greater than or equal to)
* `<=` (less than or equal to)
* `==` (equal to)
* `!=` (not equal to)
* `nand` (not and)
* `nor` (not or)
* `xor` (exclusive or)
* `!` (not) - takes a single value

Showcase:

```sn
pln a = 0_b_0011_1100;
pln b = 0_b_0000_1101;

a && b; // true
a || b; // true
a > b; // true
a < b; // false
a >= b; // true
a <= b; // false
a == b; // false
a != b; // true
a nand b; // false
a nor b; // true
a xor b; // false
! a; // false
```

#### Bitwise operators

Bitwise operators are bit-by-bit operators - they work on each single bit of numbers. They take two number and return another. Here is the list:

* `&` (bit-by-bit and)
* `|` (bit-by-bit or)
* `^` (bit-by-bit exclusive or)
* `<<` (binary left shift operator)
* `>>` (binary right shift operator)
* `~~` (one's complement) - takes a single number

Showcase:

```sn
pln a = 60; // a = 0011 1100
pln b = 13; // b = 0000 1101

a & b;  // 0000 1100 : 12
a | b;  // 0011 1101 : 61
a ^ b;  // 0011 0001 : 49
a << 2; // 1111 0000 : 240
a >> 2; // 0000 1111 : 15
~~ a;    // 1100 0100 : -60 (for signed integers - two's complement form)
```

### String concatenation

In SilverNight, the `+` (add) operator also acts as the _concatenation operator_. It provides a way to _concatenate_ two stringifyable entities, like a `string` and an `int`. For example, if we have a variable called `area` and we want to display its value with a message, we can do:

```sn
println!('The area is: ' + area);
```

Concatenation only works when a string is on the left of the operator and a primitive on its right. So here, the builder will understand we want to do a concatenation because the first value is a string, and the second one a number (which is automatically converted to a string).

### String expressions

This operator is a little special because it wraps a content instead of being before or inside it. It allows to _evaluate an expression_ from the inside of a string and get its result directly:

```sn
val area = 8.5;
println!('The area is: ' + area); // 'The area is: 8.5'
println!(`The area is: ${area}`); // 'The area is: 8.5'
```

As you can see, here we use backquotes to delimit the string. In the last `println!` statement, `${...}` contains an expression that must be evaluated and returned in the string. Here, `area` is evaluated as `8.5`, converted to a string, then returned.

The code above would also work fine:

```sn
println!(`This is ${'go' + 'od'}`); // 'This is 'good''
```

The `'go' + 'od'` expression is simply evaluated and its result (`good`) returned in the string.

Think about this feature when using strings with dynamic values!

## Understanding types

### Vectors

Vectors are the most simple way to represent a list of data. There are several type of vectors ; the most simple to handle are **arrays** which have a fixed length, and **lists** which are extensible.

Let's declare an array containing three names:

```sn
let names: string[3];
```

Here, `names` is an array with 3 values, not extensible. We can access its elements by doing:

```sn
println!(names[0]); // First element
println!(names[1]); // Second element
println!(names[2]); // Third element
```

As you can see, indexes start at `0`, which is the first string. To access the second one, we use index `1`, and so on.

If we run the code above, it will display three empty strings, because we haven't initialized our array yet. We know have several choices:

* Assigning values at declaration ;
* Assigning them _after_ declaration ;
* Assigning them one by one

Here is their syntax:

```sn
// Assigning values at declaration
let array: string[3] = [ 'Jack', 'Lucy', 'Thomas' ];

// Assigning values after declaration
let array: string[3];
array = [ 'Jack', 'Lucy', 'Thomas' ];

// Assigning values one by one
let array: string[3];
array[0] = 'Jack';
array[1] = 'Luy';
array[2] = 'Thomas';
```

There's also a way to define an array when we don't know its length:

```sn
// Assigning without knowing the length
let array: string[] = [ 'Jack', 'Lucy', 'Thomas' ];
```

This is not useful in this example, but it is when we will deal with functions later. Still, note that, in this example, the length of `array` is not predictable. This means that doing `array[3]` will not throw an error at build time, but it will when the program will be ran.

We can also declare arrays without their type, thanks to type inference:

```sn
let array = [ 'Jack', 'Lucy', 'Thomas' ];
```

That's when we declare a fixed-length list of data. But when we know we'll have to add or remove data later, we use a _list_ :

```sn
let list: List<string>;
```

We don't even have to declare a length because it is not fixed, so we can add and remove elements whenever we want. Let's rewrite the three assignment methods, for lists:

```sn
// Assigning values at declaration
let list: List<string> = [ # 'Jack', 'Lucy', 'Thomas' ];

// Assigning values after declaration
let list: List<string>;
list = [ # 'Jack', 'Lucy', 'Thomas' ];

// Assigning values one by one
let list: List<string>;
list[] = 'Jack';
list[] = 'Lucy';
list[] = 'Thomas';

// Edit the 3rd item in the list
list[2] = 'Thomas';
```

As you can see, if we don't give the length value, only the third way changed. We know _push_ new elements using the `list[] = data` syntax.

Note that we can also remove elements from the list:

```sn
// Create a list
let list: List<string> = [ # 'Jack', 'Lucy', 'Thomas' ];

// Remove the second element ('Lucy')
list.removeAt(1);

// Remove 'Thomas'
list.remove('Thomas');

// Print the list's length
println!(list.size); // Prints: '1'
```

Note that we use variables as indexes for every type of vectors:

```sn
let value: usize = 1;
println!(list[value]); // Prints: 'Lucy'
```

### Templated types

Let's now see what vectors _really_ are. They are in fact represented by two classes, `Array` and `List`.

We will be able to access exactly the same functions for both the `Array` and the `List` type, excepted there are some additional ones for `List` (like extension or elements removing). This means that every function that works on an `Array` object will work on a `List` too.

There is a specificity about these types, though. If we simply try to create variables with them, like for an array of names:

```sn
let names: Array; // ERROR
```

Our program won't work. Why? Because these types are _templated_, which means they need a _template_ in order to work. In fact, vectors need to know what _type_ of values they will handle. In our case, we want to store an array of names, which are strings:

```sn
let names: Array<string>;
```

In this example, `string` is the _template_ of `Array`. But, this program still won't build, because this class has two templates. The first one is the type we gave to it, and the second one (which is specific to arrays) is the length of the vector:

```sn
// Array with a length of 3
let names: Array<string, 3>;
```

We give one additional template to `Array` here: `3` is the length of the array. But this syntax is still heavy, so let's shorten this declaration:

```sn
// Inferred type allows us to omit the type
let names = new Array<string, 3>();
// Short notation:
let names: string[3];
```

Here's a keyword we don't know: `new`. It simply creates an _instance_ of a type.

The second line above works exactly like the first one: they both declare a new array with 3 values.

Let's know see how we declare a list:

```sn
// The fully explicit version
let names: List<string> = new List<string>();
// Inferred type version
let names = new List<string>();
```

We can now use them as we saw previously.

Note that there is a common type for both lists and arrays, which are vectors:

```sn
// Declare two vectors: a list and an array
let array: string[] = new Array<string, 3>();
let list: string[] = new List<string>();
```

### Structures

Let's say we now want to represent a video game hero. It has a name, health points (HP), magic points (MP), attack and defense points. How could we describe this? A first idea would be to make an array containing five elements, the first element referring to the name, the second one to the HP, the third one to the MP, and so on. But this is not very readable and hard to maintain.

A great tool to solve our problem is _structures_. They work as tuples with string indexes : we can't extend them, and we cannot access them using variable indexes. Here is an example of a simple structure:

```sn
struct Hero {
  name: string;
  hp: int;
  mp: int;
  atk: int;
  def: int;
}
```

We _instanciate_ it this way:

```sn
let jack: Hero = Hero {
  name: 'Jack',
  hp: 80,
  mp: 10,
  atk: 20,
  def: 5
};
```

Not that we can omit the structure's name before the opening bracket `({)` but it's conventional to put it to clearly indicate what structure we are using for this object.

#### Mutable fields

By default, all fields of a structure are constants, so we can't do `jack.hp = 120;` for example. But, in the case we want to be able to change some fields later, we can use the `mut` keyword before the entity name to make it mutable:

```sn
  // ...
  mut name: string,
  // ...
```

And the field will be mutable!

Also, note that constantness of the entity that contains the object doesn't prevent its items from being written:

```sn
struct Identity {
  mut name: string;
  mut adult: bool;
}

val jack = Identity {
  mut name: 'Jack',
  mut adult: true
};

jack.adult = false; // Works fine
println!(jack.adult); // Prints: 'false'
```

#### Plain fields

Structures can also ask for plain values:

```sn
struct Identity {
  pln name: string;
  adult: bool;
}

pln jack = Identity {
  name: 'Jack', // Implicitly a plain value
  adult: true
};

pln Jack_Name = jack.name; // Works fine
```

Note that, if instances are contained inside a mutable or a simple constant (not plain), the fields are not considered as plain anymore:

```sn
struct PlainName {
  pln name: string;
}

let jack = Identity { name: 'Jack' };
val john = Identity { name: 'John' };
pln paul = Identity { name: 'Paul' };

pln jack_name = jack.name; // ERROR
pln john_name = john.name; // ERROR
pln paul_name = paul.name; // Works fine
```

#### Optional fields

We can make some fields optional, so we won't have to specify them when initializing the structure:

```sn
struct Identity {
  name: string;
  
  // Optional field
  adult: bool = false;
}

// Another declaration syntax that uses type inference
val jack = Identity {
  name: 'Jack'
};

println!(jack.adult); // Prints: 'false'
```

### Tuples

Tuples are very similair to arrays, except the fact they can combine mixed types. They are defined as follows:

```sn
val tuples: (int, f32, string) = (2, 4.8, 'Hello');
```

Thanks to inferred typing, we can simply write:

```sn
val tuples = (2, 4.8, 'Hello');
```

To get or set a value from a tuple, we simply use an index as for arrays:

```sn
println!(tuples[2]); // Prints: 'Hello'
```

Though, indexes must be plain numbers. They can't be a variable, because the type of each member of the tuple may be different.

Note that plain constants are still considered as plain data, so it's possible to use them as tuples' indexes:

```sn
// Constant
val index1 = 1;
// Plain constant
pln INDEX_2 = 2;

// Constants won't work
println!(tuples[index1]); // ERROR
// But plain constants will
println!(tuples[INDEX_2]); // Prints: 'Hello'
```

Note that, as for arrays, tuples are considered as a single type (even if it can combine several values of different types). Also, tuples have the `Tuple` type, even though we can't do anything with it.

We can also check if a value is contained in a tuple using the `in` keyword:

```sn
val tuple = ( 18, 'John', true );

'John' in tuple; // Equal to true
'Jack' in tuple; // Equal to false
```

When we told previously that plain constants could only contain litterals, tuples are part of them. This means the following declaration is allowed:

```sn
// Plain tuples
pln MY_CONSTANT = ( 18, 'John', true );

// Multi-level plain tuples
pln MY_CONSTANT = ( 18, ( 'John', 'Lucy', 'Thomas' ), true );

println!(MY_CONSTANT[1][2]); // Prints: 'Lucy'
```

Note that, by default, a tuple's elements are constants. To make them mutable, we can use the `mut` keyword, as for structures:

```sn
val first: (string) = ( 'Hello' );
val second: (mut string) = ( 'Hello' );

first[0] = 'Yoh'; // ERROR
second[1] = 'Yoh'; // Works fine
```

The same applies for plain fields with the `pln` keyword. Note that, still like structures, when a tuple is assigned to anything that is not a plain constant, its plain fields become simple constants.

#### Tuple structures

Structures can declare a tuple type, to avoid writing the full tuple's definition all the time:

```sn
struct Identity (string, bool);

val jack = Identity { 'Jack', true };

println!(jack[0]); // Prints: 'Jack'
println!(jack[1]); // Prints: 'true'
```

If we want the members to be mutable:

```sn
struct Identity (mut string, mut bool);

val jack = Identity { 'Jack', true };

jack[0] = 'John'; // Works fine
```

And for plain constants:

```sn
struct Identity (pln string, pln bool);

val jack = Identity { 'Jack', true };
```

As you may notice, we don't have to use the `mut` and `pln` keyword when instanciating a tuple structure, as these keywords only act on entities (like structure fields).

### Enumerations

Enumerations allows to use a set of identifiers. Values using the enumeration type can only contain one of the enumeration's identifiers. It goes like this:

```sn
enum Color { RED, GREEN, BLUE }

val red  : Color = Color.RED;
val green: Color = Color.GREEN;
val blue : Color = Color.BLUE;

val somethingElse: Color = 2; // ERROR
```

Note that all enumeration values are also `usize` values:

```sn
val red  : usize = Color.RED;
val green: usize = Color.GREEN;
val blue : usize = Color.BLUE;

println!(red); // Prints: '0'
println!(green); // Prints: '1'
println!(blue); // Prints: '2'
```

It's also possible to force the value of the enumeration's members:

```sn
enum Color { RED, GREEN = 8, BLUE }

println!(Color.RED); // Prints: '0'
println!(Color.GREEN); // Prints: '8'
println!(Color.BLUE); // Prints: '1'
```

### Dictionaries

Last but not least, let's imagine we want to associate the name of a person with its age. We want to be able to add or remove persons at anytime. A structure will of course not be adapted for this purpose. But there is a tool for this type of situations: the dictionaries. These act like lists, but they are doubly-templated: we can choose both the type of the values **and** the type of the keys.

For example, if we want to connect integers (persons' age) to strings (persons' name), we do like this:

```sn
let ages: Map<string, int>;
```

We can know add any key/value pair by doing `ages.Jack = 28;`. To remove an existing key and its associated value, we simply do `delete ages['Jack'];`.

Also, there is a trap when dealing with dictionaries: all properties will return - if they exist - an instance of the second template (`int` here) but a few ones, like `filter` or `map`, will return functions. In order to avoid this problem with variables, writing `ages[anyIndexHere]` will return an `int`, whatever `anyIndexHere` is. We can also write `ages['unset']` which does the same thing.

Also, there is a shortcut for dictionaries with `string` keys: the `Collection` type. It is basically a dictionary that has string keys:

```sn
let ages: Collection<int>;
```

Now `ages` map a `string` (key) to an `int` (value). Writing `Collection<T>` is exactly like writing `Map<string, T>` - it's just a shortcut.

Showcase:

```sn
// Declaring the dictionary
let ages: Collection<int>;

// Making associations
ages.Jack = 28;
ages.Lucy = 21;
ages.Thomas = 32;
```

We can also initialize the dictionary with values:

```sn
let ages: Map<string, int> = {
  # // Indicates a dictionary
  Jack: 20,
  Lucy: 21,
  Thomas: 32
};
```

Unlike structures and like lists, variables can be used as indexes:

```sn
let ages: Map<string, int> = {
  #
  Jack: 20,
  Lucy: 21,
  Thomas: 32
};

let index = 'Lucy';

println!(ages[index]); // Prints: '21'
```

#### The truth about vectors

Arrays and lists are in fact dictionaries. Their keys are `usize` values, while their values is the type we gave as a template to the class.

This is why lists use the same `#` symbols as dictionaries. For arrays, that's a little bit complex, as we'll see now.

There is though a syntax sugar that allows us to use plain `int` values as indexes, to avoid having to write the `p` suffix each time we try to access a vector's value.

### Inferred Structured Typing

_Inferred Structured Typing_, or in its short form 'IST', is a feature of the language that aims to provid type inference when dealing with more complex data.

Let's say we have to handle an object that is an array of books. Each book would be an instance of structure containing as properties a name, a realease year as well as the country it was initially released. We would simply put these instances into a list and manage them easily, which would result in the following code:

```sn
struct Book {
  name: string;
  details: BookDetails;
}

struct BookDetails {
  author: string;
  year: string;
  country: string;
}

// Make an array of books
let books: List<Book>;

// Add a first book
books.push(Book {
  name: 'Harry Potter',
  details: BookDetails {
    author: 'J.K. Rowling',
    year: '1997',
    country: 'United Kingdom'
  }
});

// Add a second one
books.push(Book {
  name: 'Eragon',
  details: BookDetails {
    author: 'Cristopher Paolini',
    year: '2003',
    country: 'USA'
  }
});
```

That's pretty heavy, right? This is where IST comes.

Basically, IST consists in analyzing a plain object to deduce a structure that would have the same properties as the object. That's the feature which allows us to initialize arrays and lists without providing any class.

IST makes sense in our case because our code can be simplified a lot by not declaring a structure for our books and simply creating a book containing some. Here is the resulting code:

```sn
let books = [
  {
    name: 'Harry Potter',
    details: {
      author: 'J.K. Rowling',
      year: '1997',
      country: 'United Kingdom'
    }
  },

  {
    name: 'Eragon',
    details: {
      author: 'Cristopher Paolini',
      year: '2003',
      country: 'U.S.A.'
    }
  }
];
```

We didn't defined any structure, and yet the builder guessed the type of the `books` variable. In the background, the builder makes _ghost structures_, called this way because they don't appear in our code, and apply them on our objects.

But there's still one problem here: the builder is understanding that `books` is an array, so we won't be able to add any book. Books' names, as well as their original country, author or publishing year will be editable, but nothing will be extensible.

To solve this, we have to indicate we are dealing with a list here. So we just have to add the `#` at the beginning of the list to make it extensible:

```sn
let books = [
  # // Makes the object extensible

  {
    name: 'Harry Potter',
    details: {
      author: 'J.K. Rowling',
      year: '1997',
      country: 'United Kingdom'
    }
  },

  {
    name: 'Eragon',
    details: {
      author: 'Cristopher Paolini',
      year: '2003',
      country: 'U.S.A.'
    }
  }
];
```

Now all works fine!

The `#` symbol indicates we are dealing with a dictionary. As you may think, arrays are dictionaries too, so why don't we use this symbol when we are creating ones? Simply because IST have different syntaxes that don't do the same thing.

Because this is a bit complex, here is an exhaustive list of all the different syntaxes supported by the IST:

* `[ 'Hello', 'World' ]` makes an array (of strings)
* `[ # 'Hello', 'World' ]` makes a list (of strings)
* `{ name: 'Hello' }` makes a ghost structure and applies it on the plain object
* `{ # name: 'Hello' }` makes a map (with string keys and string values)

Here is a code equivalence:

```sn
// What we write:
let data = [ 'Hello', 'World' ];

// What IST does:
let data = new Array<string>('Hello', 'World');
```

```sn
// What we write:
let data = [ # 'Hello', 'World' ];

// What IST does:
let data = new List<string>('Hello', 'World');
```

```sn
// What we write:
let data = { name: 'Hello' };

// What IST does:
struct DataStruct {
  name: string;
}

let data = DataStruct {
  name: 'Hello'
};
```

```sn
// What we write:
let data = { # name: 'Hello' };

// What IST does:
let data = new Map<string, string>([ 'name' ], [ 'Hello' ]);

// Which itself uses IST so in fact results in:
let data = new Map<string, string>(
  new Array<string>('name'),
  new Array<string>('Hello')
);
```

Final word: IST allows you to write, for example:

```sn
let data = { # name: 'Hello' };
```

Instead of:

```sn
let data = new Map<string, string>(
  new Array<string>('name'),
  new Array<string>('Hello')
);
```

That's a lot simplier, isn't it?

This part is complex, and as it's an important point don't hesitate to read it again until you fully understand it.

#### Pre-defined objects

IST also supports pre-defined objects, as long as they have exactly the same type (ghost structure or vector type):

```sn
val harryPotter = {
  name: 'Harry Potter',
  details: {
      #
      author: 'J.K. Rowling',
      year: '1997',
      country: 'United Kingdom'
  }
};

val eragon = {
  name: 'Eragon',
  details: {
      #
      author: 'Cristopher Paolini',
      year: '2003',
      country: 'U.S.A.'
  }
};

let books = [
  #
  harryPotter,
  eragon
];
```

In this example, because we create an array from two distinct objects, they must **both** have the `#` directive on their `details` field. Else, one would use a ghost structure for this field, while the other would use a map - which makes them incompatible, so not usable in `books` with the syntax we used.

Below is a code that doesn't work because of type incompatibility:

```sn
struct Hero {
  name: string,
  spells: List<string>
};

val jack = Hero {
  name: 'Jack',
  spells: [ 'Fire', 'Ice' ] // ERROR
};
```

The error is caused by the fact a `List<string>` is expected but an `Array<string>` (`string[]`) is found instead. The valid code would be:

```sn
val jack = Hero {
  name: 'Jack',
  spells: [ # 'Fire', 'Ice' ] // Works fine
};
```

#### Plain field assumption

By default, when a plain value is associated to a field, it is considered as plain:

```sn
val jack = {
  name: 'Jack' // pln name: string;
}
```

#### Plain fields compatibility

Any plain field can be automatically converted to a constant one, if required. Here is an example:

```sn
struct A {
  pln name: string;
}

struct B {
  name: string;
}

let a: A = A { name: 'Hello' };
let b: B = a; // Works
```

The second assignment works because `A`'s instances can be automatically _typecasted_ to instances of `B`, as a plain field is a constant field too.

### Multiple assignments

Objects - both structures and dictionaries - allow _multiple assignments_, which means we can make several assignments at once. Let's consider the following object:

```sn
val hero = {
  name: 'John',
  age: 20,
  warrior: true
};
```

We want to store its properties in three constants, `name`, `age` and `warrior`. The first way would be this one:

```sn
val name = hero.name;
val age = hero.age;
val warrior = hero.warrior;
```

But that's a bit long, so there's a syntax to shorten that in a single line:

```sn
val { name, age, warrior } = hero;
```

What we've done here is to extract some properties of `hero` and store them into constants of the same name. The array of the properties to extract (which is also the array of the constants to make) is specified between braces (`{}`).

Multiple assignments also work the other way: we can make an object from an array of entities, like this

```sn
val hero_copy = { name, age, warrior };

// Strictly equivalent to:
val hero_copy = {
  name: name,
  age: age,
  warrior: warrior
};
```

This syntax can also be mixed with other properties:

```sn
val new_hero = {
  name, // Implicit value
  age, // Implicit value
  warrior: false // Explicit value
};
```

There is also a similar syntax for lists:

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

Note that there is also the `...` symbol to ignore some entries in the array:

```sn
// Middle slice
val [ n1, ..., n4 ] = arr;
// Equivalent to:
val n1 = arr[0],
    n4 = arr[3];
```

This avoids making a useless entity to store the middle values.

Here is a last syntax, for tuples this time:

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

## The blocks

Blocks provide ways to control the program's flow, as well as some tricks like scoping.

### Conditional blocks

Conditional blocks are the most common type of blocks: they simply provide a way to run a set of instructions only if a condition is met.

The first one is the `if` block. It runs the provided code if the given expression is anything different from the primitive `NIL` values (which are `null`, `false`, `0` and `''`). Its syntax is:

```sn
if 2 + 2 == 4 {
  println!('Good.');
}
```

Let's look at what happens here. First, the `2 + 2 == 4` expression is evaluated. As it's using the `==` logical operator, the result is `true`. Because it's a value different from the four NIL values, the instructions set is ran.

If you want to do something if the expression _is_ a NIL value, you can use the `else` block to revert the condition:

```sn
if 2 + 2 == 5 {
  println!('What?');
} else {
  println!('Good.');
}
```

Here, the `2 + 2 == 5` expression returns `false`, which is a NIL value, so the instructions set is not ran. But the `else` block reverts the condition and, because it was `false` before, it becomes `true`, so its own instructions set is ran. You will see a `Good.` message in your console if you run it.

You can also have multiple conditions by combining `else` and `if` to form the `elsif` keyword:

```sn
let name = 'John';

if name == 'Marco' {
  println!('Your name is Marco!');
} elsif name == 'Paul' {
  println!('You are Paul.');
} elsif name == 'John' {
  println!('Welcome, John!');
} else {
  println!('I can\'t remember you...');
}
```

Note that there isn't a special syntax for single-instruction, like in other programming languages (e.g. `if (condition) instruction;`). That's because this last syntax easily leads to errors when braces have been forgotten (e.g. after adding a second instruction but forgetting to add the braces after that), and to have a unique development style (no condition wraps its expression between parenthesis).

### `if` variant: `unless`

The `unless` block uses the same syntax as the `if` block and works the same way ; simply, the condition is inverted. Here is an example:

```sn
if 2 + 2 == 4 { /* Runs */ }
unless 2 + 2 == 4 { /* Doesn't */ }

if 1 + 1 == 3 { /* Doesn't */ }
unless 1 + 1 == 3 { /* Runs */ }
```

### `for`: incremental repetition

Loop blocks are blocks that repeat a set of instructions zero, one or several times depending on the condition we provide to them.

The `for` block repeats the instructions a given amount of times. It needs an _iterator variable_ (which is a variable with any number type, integer or not), an optional start value, a condition and an incremental expression:

```sn
for i = 0; i < 5; i ++ {
  println!(i);
}
```

What does this code do? First, it automatically declares a local variable called `i` and infers its type as `int`. The loop starts by giving it a first value (the _start value_) which is 0. A `for` loop always run **until** its condition is not NIL (`i < 5` returns a boolean), so while it's a NIL value. Then, it specifies its _incremental expression_, an expression which is evaluated each time the loop is ran (excluding the first time).

So, the loop starts by setting 0 to `i`. The condition is checked, and is evaluated to `true`, so the instructions set will be executed (for this time, at least). The program displays `0`. Then, the incremental expression is evaluated so `i` is now equal to `1`. We check again the condition which is still `true`, the expression is ran, the incremental expression is evaluated a second time so `i` is equal to `2`, and so on until, after running the incremental expression, the condition becomes a NIL value.

The loop above will therefore display `0`, `1`, `2`, `3` and `4` ; then terminate.

Note that we could also write the variable's declaration directly in the loop's head:

```sn
for i: int = 0; i < 5; i ++ {
  println!(i);
}
```

Whatever is the way we use, the iterator variable will be _scoped_ to this block, which means we can use it only inside the block and that the variable will be deleted outside. If an `i` variable already exists in the main scope, it will simply be ignored and a new, local variable will be made.

Note that the incremental expression can be **any** valid expression, like `i --` to make a decremental loop:

```sn
// Prints: 4 3 2 1 0
for i = 4; i >= 0; i -- {
  println!(i);
}
```

It could also be `i += 5`, or whatever you want. There is also an alternative syntax made to iterate from an integer to another using ranges:

```sn
for i in 0..5 {
  println!(i);
}

// Equivalent to
for i = 0; i < 5; i ++ {
  println!(i);
}
```

This code will print: `0` `1` `2` `3` `4`. To go from 0 to 5 (included), simply add a `.` symbol between the bounds:

```sn
for i in 0...5 {
  println!(i);
}

// Equivalent to
for i = 0; i <= 5; i ++ {
  println!(i);
}
```

To go from 5 to 0:

```sn
for i in 5..0 {
  println!(i);
}
```

This will print: `5` `4` `3` `2` `1`.

### `break` and `continue` loops

When dealing with a loop, you can want to exit it if a specific even happens. For example, if we have an `hadError` function that returns a boolean to indicate an error happened, we could want to exit the loop.

Let's try it:

```sn
for i in 1..10 {
  println!(i);

  if hadError() {
    break; // Exit the loop
  }
}
```

There, if `hadError` returns `true`, the `break` instruction will be executed and the loop will break - so its next iterations will be ignored.

Another useful loop keyword is `continue` that provides a way to ignore all instructions below it but only one time.

```sn
for i in 1..10 {
  if hadError() {
    continue;
  }

  println!(i);
}
```

This code will check each time if there was an error. If so, it will ignore all instructions above `continue` and iterate the loop a new time. Else, it will run the `println!` flex, just as expected.

### `while`: conditional repetition

The `while` block is another loop block, which repeats a set of instructions _while_ its condition does not evaluate to a NIL value.

```sn
let counter = 8;

while counter > 1 {
  println!(counter);
  counter /= 2;
}
```

This code will print `counter`'s value and then divide it by 2, and that while it's higher than 1. So it will display `8` `4` `2`, then `counter` will be equal to 1 and terminate the loop.

### `while` variant: `until`

The `until` loop is the exact opposite of `while`: it runs the set of instructions _until_ its condition evaluates to anything that **is not** a NIL value.

```sn
let counter = 8;

until counter <= 1 { // equivalent to `while counter > 1`
  println!(counter);
  counter /= 2;
}
```

This code will do exactly the same thing than we saw with the `while` block.

### `while` variant: `do`...`while`

Another variant of the `while` loop is the `do`...`while` loop. It does exactly the same thing excepted the condition is not evaluated when the loop begins, but after the set of instructions has been ran, so we are sure our code will be ran _at least_ one time.

```sn
let counter = 1;

do {
  println!(counter);
} while counter < 0;
```

This code will display `1` before the loops ends, because the condition is evaluated _after_ the set of instructions.

### `while` variant: `loop`

This loop acts like a `while true`, but its point is to clearly indicate we are doing an infinite loop, and allow a better optimization of the code. For example, the above code:

```sn
loop {
  println!('Hello !');
}
```

Will print `Hello !` undefinitely.

### `match` for matches

The `match` block returns a result depending on _switchs_ that relies on the value you gave to it. In the case you are wondering, this is not a loop block.

Let's imagine we have a person and want to run a little set of instructions depending on its name. Assuming we have a `name: string` variable, we could write:

```sn
if name == 'Paul' {
  println!('Happy birthday, Paul!');
} elsif name == 'John' {
  println!('How are you, John?');
} elsif name == 'Marc' {
  println!('Hello there Marc!');
} else {
  println!('I don\'t know you...');
}
```

But this is kind of heavy. So we can perform a _match_ instead:

```sn
match name {
  'Paul'  -> println!('Happy birthday, Paul!');
  'John'  -> println!('How are you, John?');
  'Marc'  -> println!('Hello there Marc!');
  default -> println!('I don\'t know you...');
}
```

Conditions are also supported before the `->` symbol. You can use the `_` variable in them, which refers to the value given in the block's head (here, `age`).

```sn
let adult: string;
let age: uint = 2;

match age {
  (_ < 20) -> adult = 'No';
  (_ > 20) -> adult = 'Yes';
  default  -> adult = 'Kind of';
}
```

You can also specify a set of instructions for a match by wrapping them between braces:

```sn
let adult: string;

match age {
  (_ < 20) -> adult = 'No';
  (_ > 20) -> adult = 'Yes';
  default  -> {
    adult = 'Kind of';
    println!('The end.');
  }
}
```

Note that the `break` instruction does nothing on this block, as it's not a loop.

### Ternary conditions

_Ternary conditions_ are an alternative to simple conditions. They always return a value, depending on a condition. The syntax is `cond ? valueIfNotNIL : valueIfNIL`. Showcase:

```sn
let name = 'John';
name = (name == 'Marc') ? 'Welcome Marc' : 'I don\'t know who you are';
```

Note that the two values must be compatible, which means you can choose an `u16` and an `u64` value, but not an `int` and a `string` for example.

### Inline blocks

Sometimes it's just more intuitive and redeable to write the condition _after_ the instruction. This is where we use _inline conditions_:

```sn
let name: string;

// Set the name only if it is empty
name = 'John' if name == '';
```

There is also a _ternary form_:

```sn
let name: string;

name = if !name { 'John' } else { 'This overwrites the name' };
// Long syntax
```

This works with any instructions:

```sn
println!('Hello world!') if world.exists();
```

You can do this with any condition or loop block:

```sn
let i: uint = 5;

println!(++ i) while i < 5;
```

But be aware when dealing with inline loops, this could accidentally result in an inline generation and make your program crash, as we will see now.

### Inline generation

Inline generation is a useful feature when coming to generate an array of data. For example, let's say we want to generate an array of the cube of every number between 1 and 10 (included). Intuitively, we may write this:

```sn
let cubes: int[10];

for i in 1...10 {
  cubes[i] = i * i * i;
}
```

But there is another, simplier way to generate this array, using _inline generation_:

```sn
let cubes: List<int> = (i * i * i for i in 1...10);
```

The only downside is that we know have a `List<int>` instead of an `Array<int, 10>`. We can still convert the list to an array using lists' `toArray` method, but this has a performance cost and will return an `int[]` instead of our original `int[10]`.

Because the builder has a great support of inferred typing, you can also omit the `cubes`' explicit type:

```sn
let cubes = (i * i * i for i in 1...10);
```

This is also why we told you should be careful when using inline loops: all inline loops generate a `List`.

Note that inline loops will not perform if the generation is not wrapped by parenthesis. So, if you do:

```sn
// No generation (no parenthesis)
println!(i) for i in 1...10;
```

Nothing will be generated.

### Entities are block-scoped

In SilverNight, a _scope_ is any piece of code between an opening bracket `{` and a closing bracket `}`. For blocks, their head is considered being inside the scope. For inline blocks, it starts from the instruction they apply to to their very end - including their head.

We can also make scopes without specifying the name of any block nor any head. We write it `{ /* scope code here */ }` and it's called a _flying scope_.

Here are some examples of scope:

```sn
// Blocks
if true {
  imInScope();
  imInScope(); // Still into
}

// Inline blocks
if true {
  imInScope();
}
imNot(); // Out of the 'if'

// Flying scopes
{ // <- begin
  imInScope();
} // <- end
imNot();
```

When we declare an entity, it is _block-scoped_, which means it belongs to the scope it was declared in. For example:

```sn
if true {
  let i = 2;
  println!(i);
}
```

Here, `i` belongs to our the scope defined by our `if` block. What 'belongs' mean? Simply that, when the entity goes out of the scope, it is _dropped_ (we also say _freed_), so its reference is lost and we can't use it. Here is an example:

```sn
let i = 1;
println!(i); // Prints: '1'

{
  let j = 2;
  i += j
  println!(j); // Prints: '2'
}

println!(i); // Prints: '3'
println!(j); // ERROR ('j' is not defined)
```

The last line throws an error, because `j` is not defined. This is due to the fact we defined `j` in a flying scope, but that scope ended before our instruction, so `j` was dropped a few lines before - we can't use it anymore.

Now, question is: what entities can I access from a scope? The answer is simple: you can access all entities declared in the current scope, plus every entity that belongs to (e.g. that are declared in) a _parent scope_ (a scope that contains, directly or indirectly, the current one). For example:

```sn
// main scope (scope 0)
// Entities: i
let i = 1;

{
  // Scope 1
  // Entities: i, j
  let j = 2;

  {
    // Scope 2
    // Entities: i, j, k
    let k = 3;
  }
}
```

In the code above:

* Scope 0 can only access its own entities (`i`) ;
* Scope 1 can access its own ones plus scope 0's ones (`j` and `i`) ;
* Scope 2 can access its own ones plus scope 1's ones (by extension, scope 0's ones too) (`k`, `j` and `i`).

As you can see, a scope is considered as a parent of a given one even if it's not its _direct_ parent: it also works if it's an _indirect_ parent, meaning it contains a scope that itself contains the given one.

The **main scope**, which is transparently defined, has no parent scope. It cannot access any other entity than the ones declared in its body. Because all our code is put somewhere in the main scope, you can always access entities that are declared in them (they are called _global entities_).

Remember these rules about scopes (entities availability, drops, parent scopes, flying scopes), because all the language is ruled by it. Don't hesitate to read these explanations again as they may not be very simple.

#### `for`'s case

The `for` loop accepts, in reality, any instruction instead of an assignment to an iterator. This means that the following code is perfectly valid:

```sn
for true; true; true {
  println!('Hello world!'); // Prints: 'Hello world!' 1 time
  break ;
}
```

A special case, though, is the following syntax is used:

```sn
for [iterator] = [expression]; [condition]; [instruction] {
```

The iterator is then implicitly declared as a mutable variable, of the same type than the assigned expression.

Another specificity is that the iterator is implicitly declared inside the loop's scope, even though it first appears outside. This is to help code writing and allow to have a loop's block-scoped iterator, which is hard to make otherwise.

## Functions

Functions are another key-concept of the language. They are special blocks that are not ran by default and requires to be called manually. They optionally take values called _arguments_ and may return a value called the _return value_.

### Declaration

Let's imagine you want to calculate the area of a triangle depending on its base and its height, then print it and store the result in a constant.

This is very simple and can be achieved very simply:

```sn
let base = 2.5;
let height = 3.5;

let area = base * height / 2;
```

But now, let's imagine we have to do this dozens of time. This would be heavy to repeat again and again the same instructions, and to rename the result variable to store the new result. Plus, if we want to change anything in the algorithm (for example, if we did an error in the formula), we would have to reflect the changes in all our files - which could be very long and introduce new errors.

In order to avoid copy-pasting this block of code again and again, we can use a general programming concept known as _functions_.

A function is declared using the `func` keyword. We give it a name, and its arguments between parenthesis, separated by commands. An argument is simply a couple formed of a name and a type, written as `argname: type` (though we will see later this is not the only syntax for arguments). We then write a double point `:` symbol and the function's return type - the type of the value it returns.

Let's write the block's head:

```sn
func triangle_area (base: f32, height: f32) : f32 {
  // Function's body
}
```

The very first line (without the `{` symbol) is called the function's _prototype_. It declares what the function's name is, what are its arguments (if there are), and the type of value it returns (if it returns one). We say that the _prototype_ (the line we saw) _declares_ the function's _signature_ (its name, arguments, their types, and the return type).

Let's get back to our example: we want to calculate the triangle's area. Here is a function that does it:

```sn
func triangle_area (base: f32, height: f32) : f32 {
  val area = 0.5 * base * height;
}
```

Let's print the result:

```sn
func triangle_area (base: f32, height: f32) : f32 {
  val area = 0.5 * base * height;
  println!(`The triangle's area is: ${area}`);
}
```

Now we want to assign it a variable each time we calculate the area. So we will have to declare a variable and make an assignment **outside** of the function. How can we do this?

There's a simple way to achieve this called the _return statement_. It uses the `return` keyword to return a value from the function. This value can then be assigned to an assignable entity like a variable or a constant. Let's do it!

```sn
func triangle_area (base: f32, height: f32) : f32 {
  val area = 0.5 * base * height;
  println!(`The triangle's area is: ${area}`);
  return area;
}

val first  = triangle_area(2, 8);
val second = triangle_area(3, 7);
let third  = triangle_area(4, 12);
```

We can now use the three entities. All of them has the `f32` type, as we used inferred typing on the function, which returns a `f32`.

Here, the return type of the return value **must** match the function's return type. If we try to return an integer in our function, it will throw an error. The same if we try to return a string.

Also, even though functions can originally only return a single value, it's possible to cheat with tuples, as they are considered as a single value (`Tuple<T>` type):

```sn
func add (left: int, right: int) : (int, f32) {
  return (
    // Divide as integers
    left / right,
    // Divide as floating-point numbers
    f32(left) / f32(right)
  );
}

val result = add(2, 8);

println!(result[0]); // Prints: '0'
println!(result[1]); // Prints: '0.25'
```

As they are single values too, we can return arrays, lists, vectors, dictionaries and every other type of value.

Note that void-typed functions (functions that return nothing) can omit their return type:

```sn
func sayHello () {
  println!('Hello !');
}
```

### Optional arguments

This one is pretty explicit, at least. It's possible to make some arguments omittable by giving them default values. These arguments are called _optional_ as you are not forced to specify them when calling the function:

```sn
func sayHello (name: string, justTheName: bool = false) {
  if justTheName {
    println!(name);
  } else {
    println!(`Hello, ${name}!`);
  }
}

sayHello('John', false); // 'Hello, John!'
sayHello('John', true); // 'John'

sayHello('John'); // 'Hello, John!'
```

This is useful when we don't want to give a default value to arguments manually, in the function's body. Note that default values can be absolutely anything, even expressions:

```sn
func getMarcName () : string {
  return 'Marc';
}

func sayHello (name: string = 'Hello' + getMarcName()) {
  println!(`Hello, ${name}!`);
}

sayHello(); // Prints: 'Hello, Marc!'
```

### Infinite arguments

Infinite arguments allow a function to take from zero to an infinity of arguments, without using a list to get a lighter syntax.

```sn
func sum (...numbers: int) : int {
  let sum = 0;

  for i = 0p; i < numbers.length; i ++ {
    sum += numbers[i];
  }

  return sum;
}

println!(sum(2, 3, 4)); // Prints: '9'
```

In this function, `numbers` is an array because of the `...` symbols, so in our example it's an `int[]`.

Note that we can mix an infinite argument with other arguments, like before another one:

```sn
func sum (...numbers: int, coefficient: int) : int {
  let sum = 0;

  for i = 0p; i < numbers.length; i ++ {
    sum += i;
  }

  return sum * coefficient;
}

println!(sum(2, 3, 4, 5)); // Prints: '45'
```

Or after it:

```sn
func sum (coefficient: int, ...numbers: int) : int {
  let sum = 0;

  for i = 0p; i < numbers.length; i ++ {
    sum += i;
  }

  return sum * coefficient;
}

println!(sum(5, 2, 3, 4)); // Prints: '45'
```

Or even between two other arguments:

```sn
func sum (coeff1: int, ...numbers: int, coeff2: int) : int {
  let sum = 0;

  for i = 0p; i < numbers.length; i ++ {
    sum += i;
  }

  return sum * coeff1 * coeff2;
}

println!(sum(2, 2, 3, 4, 3)); // Prints: '54'
```

The only restriction is you can't put two infinite arguments with the same type in a function's signature. For example, the following code is not valid:

```sn
func sum (...nums1: int, ...nums2: int) : int { /* ... */ }
```

#### Arguments expansion

Functions can also be called using an array of a list of argmuents using the _arguments expansion_ operator:

```sn
func sum (left: int, right: int) : int => left + right;

// Declare a int[]
val numbers = [ 2, 8 ];
// Use the arguments expansion operator
println!(sum(numbers...)); // Prints: '10'
```

In this example, `numbers` is expanded as multiple arguments. It's like writing:

```sn
// The normal way
sum(numbers[0], numbers[1])); // Returns: 10

// Using the arguments expansion operator
sum(numbers...); // Returns: 10
```

This operator can also be used with other arguments:

```sn
func calc (left: int, right: int, divide: int) : int {
  return (left + right) / divide;
}

val numbers = [ 2, 8 ];
println!(calc(numbers..., 5)); // Prints: '2'

// Same as writing:
println!(calc(numbers[0], numbers[1], 5)); // Prints: '2'
```

### Lambdas and callbacks

We saw that functions can be declared with a name, an array of arguments, a return type and a body. But there are some functions that omit the name, called _lambdas_.

What is their point? Well, let's say we have a list called `signed` of signed integers, and we want to keep only the positive values in an array called `positive`. The first idea we could have would be to write:

```sn
val positive: List<int>;

for i = 0p; i < signed.size; i ++ {
  if signed[i] >= 0 {
    positive.push(signed[i]);
  }
}
```

But we have a problem here. We have to define `positive` as a list to push values in it, while we simply want an array. This could introduce compatibility issues when we'll want to give this object to functions that require an array. We can still convert `positive` to an array by using the `positive.toList()` method, but this would involve to make a whole new array, which takes memory and time.

That's where lambdas come. There is a function called `filter` we can use on arrays, which takes a specific function as an argument. Here is how we use it:

```sn
val posArr = list.filter(lambda (value: int) : bool { return value >= 0; });
```

What happened here? Because it's a little cryptic, we'll re-write the code, with a clearer indentation:

```sn
val posArr = list.filter(
  lambda (value: int) : bool {
    return value >= 0;
  }
);
```

Here, we used a _lambda_ with takes a single argument called `value` which is an integer, and we told it returns a boolean. Then, we wrote the function's body, which simply evaluates an expression (returns `true` if `value` is positive, `false` else).

Because this function does not have a name, it's called a lambda: it cannot be declared like a standard function which requires a name.

Let's now see the declaration of the `filter` function:

```sn
  // ...
  public func filter (callback: func (value: T) : bool) : _this<T>;
  // ...
```

Let's just concentrate on the function's only argument: called `callback`, it is described as a function that takes a `value` argument, then returns a boolean. That's why we gave this specific argument and type to our lambda. If we had specificied a `string` type for the `value` argument for example, an error would have been thrown at build time.

Note that, while the numbers of arguments, their type and the lambda's return type are declared in the function's signature and cannot be changed, we can still change their names to take our own ones. We could have called our lambda's only argument `num` if we had wanted to.

The `filter` functions simply calls the function (callback) it takes as an argument by giving it a value for each item in the list. Then, it makes an array from these data and return all of it.

There's another way to apply this filter on our array: declaring the function, and then using it as an argument. Because an example will be more clear than a big explanation:

```sn
val myFunc = lambda (value: int) : bool {
  return value >= 0;
};

val posArr = list.filter(myFunc);
```

This will do the same thing than the first version. Here, we declare a `myFunc` variable that works exactly like the lambda we made before, then we use it as an argument for the `.filter` function.

Note that we inferred this lambda ; its full declaration would be:

```sn
val myFunc: func (value: int) : bool = lambda (value: int) : bool {
  return value >= 0;
}

val posArr = list.filter(myFunc);
```

We can now call `myFunc` as a standard function:

```sn
println!(myFunc(2)); // Prints: 'true'
println!(myFunc(-3)); // Prints: 'false'
```

We could also have declared it as a normal function:

```sn
func myFunc (value: int) : bool {
  return value >= 0;
};

val posArr = list.filter(myFunc);
```

### Callback arguments

As we saw with `filter`, functions can be arguments of other functions. Here is the syntax:

```sn
// We don't provide the arguments' name for the function here
func twoPlusFive (callback: func (int, int) : string) : string {
  return callback(2, 5);
}

println!(twoPlusFive(
  lambda (left: int, right: int) : string {
    return string(left + right);
  })
); // Prints: '7'
```

You may have notice that we don't specify `callback`'s arguments' name in our example. That's because the function's type (`func (int, int) : string`) does not require it, it's purely optional. We could have written `func (left: int, right: int) : string` if we had wanted to.

The problem of the above code is that the lambda usage is kind of heavy. We can replace it with the _arrow syntax_:

```sn
val posArr = list.filter(lambda (value: int, key: int) : bool => value >= 0);
```

We don't have the `func` keyword anymore, but the `=>` one appeared. This symbol implicitly indicates a lambda and tells that the value on its right is automatically returned by the function.

This symbol can in fact even be used with functions, like:

```sn
func returnTrue () : bool => true;

println!(returnTrue()); // Prints: 'true'
```

Here is a recap of all the functions' syntaxes:

```sn
// Classic functions
func returnTrue () : bool { return true; }

// Function with arrow syntax
func returnTrue () : bool => true;

// Classic lambda
val returnTrue = lambda () : bool { return true; };

// Lambda with arrow syntax
val returnTrue = lambda () : bool => true;
```

But, even with the arrow syntax, lambdas still are heavy to write as we have to specify the arguments' type as well as the lambda's return type. To solve this problem, we can infer the arguments' type as well as the lambda's return type using the _Inferred Callback Typing_.

### Inferred Callback Typing

ICT works like IST but for functions. Instead of inferring a data's structure, it will infer a function's arguments' type as well as its return type based on a signature.

Remember the `.filter` function we can apply on any `T[]` value? We gave it a lambda and we had to declare the lambda's arguments' type as well as its return type. But because these types are already specified in the `.filter` function's signature, we know that we'll have _exactly_ the sames types in our lambda's signature.

So, we can infer the lambda's arguments' type and its return type, like this:

```sn
// Classic lambda
val posArr = list.filter(lambda (value: int, key: int) : bool { return value >= 0; });

// Arrow syntax
val posArr = list.filter(lambda (value: int, key: int) : bool => value >= 0);

// Inferred callback typing
val posArr = list.filter((value, key) => value >= 0);
```

This last syntax, called a _light lambda_, is clearly lighter as it avoids using the `lambda` keyword and, more important, to declare the types. But be sure to read carefully the signature of the function you are giving your lambda to ; else you could have some surprises at build time.

Note that you can run several instructions from a light lambda. In this case, the `=>` symbol will remain:

```sn
val posArr = list.filter((value, key) => { return value >= 0; });
```

Also, note that this will only work with lambdas that are directly given as arguments. These are known as _flying lambdas_ in reference to the fact they are not declared before being used. That means you can't use ICT if you declare a constant that contains this lambda, and then use this constant as an argument for a function. This is simply because this directive guesses the function's type based on the signature of the function it is given to, so it wouldn't work with anything that is not a flying lambda.

While we have inferred typing without looking at any signature for data structure, you may be wondering why non-lambda functions couldn't have an inferred typing for their arguments and return type too based on their body. For example, if a function only returns booleans, its return type could be inferred.

To answer this question, there is a directive that allows inferred typing for anything, from variables to functions, even to more complex data structures (like interfaces or classes). But like we'll see later, this has some (really) serious downsides and it considerably slows down the build. Global inferred typing is only useful when some conditions are met, so for now let's put it aside.

### Polymorphism

When declaring a method, we sometimes want it to handle several type of arguments. For example, let's say we want to make a function that returns the coordinates of a given 2-dimension point in a string format. It would take two arguments, the first one representing X, the second one Y. But, we also want to support the `Point` structure, which has two members `x` and `y`. And, because we want to do the same thing with these two syntaxes, we don't want to make a distinct function.

To solve this problem, we can use _polymorphism_, which consists in declaring the same function several times, each time with a new signature:

```sn
// Make the 'Point' structure
struct Point {
  x: f32;
  y: f32;
}

// Declare the two functions with polymorphism
func pointStr (x: f32, y: f32) : string => `(${x}, ${y})`;

func pointStr (pt: Point) : string => `(${pt.x}, ${pt.y})`;

// Let's try them!
pointStr(2, 5); // Prints: '(2, 5)'
pointStr(Point { x: 2, y: 5 }); // Prints: '(2, 5)'
```

They work as expected and print the same result.

A specific case is when we have two definitions that fit a same call:

```sn
func something (arg: number) : void {}
func something (arg: int) : void {}

something(2);
```

Which function should be called? The two are valids, so the program will simply choose the more precise one (e.g. the one that defines the nearest type from the given one). Here, it's the second function, because it asks for an `int` while the first signature simply ask for any type of number. This behaviour is called _polymorphism priority_.

## Object-oriented programming

Object-oriented programming, oftenly shortened in OOP, is a fundamental concept of the language - and the most important one -.

### The concept of class

Like we saw before, everything in SilverNight is an object. Though primitive types like `string` or `int` are special ones, they follow a strict behavior rules because of their type.

To introduce the OOP concept, let's see the concept of _class_. Think to classes like advanced structures: they can protect some of their members (e.g. making them invisible from the outside), make themselves convertible to strings or numbers, support mathematical operations, etc.

### I need a hero!

Let's go back to a previous problem: we want to represent a hero.

> We now want to represent a video game hero. It has a name, Health Points (HP), Magic Points (MP), attack and defense points. How could we describe this?

The first option we saw was to make an array, but that was not very convenient (both not readable and poorly maintanable). So we chose to make a structure, and here is the result we obtained:

```sn
struct Hero {
  name: string;
  hp: int;
  mp: int;
  atk: int;
  def: int;
}
```

That was fine. Now let's say we don't want anyone to change the hero's values. The good way to do this is to make constant properties:

```sn
struct Hero {
  val name: string;
  val hp: int;
  val mp: int;
  val atk: int;
  val def: int;
}
```

But now imagine we want to make a function that allows a hero to fight another. This is impossible. Why? Because, while structures can contain function members (using lambdas for example), we can't both make the health points constants **and** editable at the same time.

So, what can we do? Answer is: classes. Here is one:

```sn
class Hero {
  private name: string;
  private hp: int;
  private mp: int;
  private atk: int;
  private def: int;
}
```

First, we _declare_ the class with the `class` keyword. Like for structures, this creates a type named `Hero`. Then, we set up its _members_, an equivalent to structures' properties. But look at the `private` keyword. This indicates that this members are available only from _the inside_ of the class: only its members can modify them ; that means no one will be able to access these members outside the class.

Now, we just have to make a _public_ function which allows our hero to fight another. But first, we need to make a function that sets the hero's attributes (name, health points, ...). Else, all will be set to 0 and the name will be empty. For that, we use a _constructor_:

```sn
class Hero {
  private name: string;
  private hp: int;
  private mp: int;
  private atk: int;
  private def: int;

  public func %construct (name: string, hp: int, mp: int, atk: int, def: int) {
    this.name = name;
    this.hp = hp;
    this.mp = mp;
    this.atk = attack;
    this.def = defense;
  }
}
```

We start by declaring the `%construct` function which is the class' constructor. This function is called when a resource is created with the `Hero` type. Note that it doesn't return any value.

The constructor will take as an argument a name, an amount of HP and MP, an attack and a defense. Then, it will assign these given values to its _members_, which are not available from the outside the class.

Let's continue our class by implementing two methods, which are function attributes:

```sn
  // ...
  public func getAttack () : int {
    return this.atk;
  }

  public func beAttacked (ennemy: Hero) {
    this.hp -= ennemy.getAttack();
  }
  // ...
```

Here, we define a `getAttack()` and a `beAttacked()` functions publicly, which means everyone can access it, even outside the class. `getAttack()` returns the `attack` member from the current class, while `beAttacked()` gets the attack points of the ennemy and substracts it from our hero's health points.

We can now _instanciate_ our heroes, meaning we use the `new` keyword to create one. We then give the constructor's arguments to it:

```sn
val jack = new Hero(); // ERROR: Expecting 5 arguments, found 0

val jack = new Hero('Jack', 100, 5, 50, 10); // A great warrior
```

As soon as we use the `new` keyword on a type, we know it's a class. That means lists and arrays both are classes. In fact, all numbers types, as well as booleans, voids, and strings, are too.

If we want to consider the defense of our hero now:

```sn
  // ...
  public func beAttacked (ennemy: Hero) {
    this.hp -= ennemy.getAttack() - this.def;
  }
  // ...
```

But now, we have to assure HP loss is not negative. That would be weird to win HP while _being attacked_ by an ennemy. Let's fix it:

```sn
  // ...
  public func beAttacked (ennemy: Hero) {
    // Calculate the loss
    val loss = ennemy.getAttack() - this.def;
    // Decrease HP
    this.hp -= loss if loss > 0;
  }
  // ...
```

Here we are! Now, let's write a `fight()` function!

```sn
  // ...
  public func beAttacked (ennemy: Hero) {
    // Calculate the loss
    val loss = ennemy.getAttack() - this.def;
    // Decrease HP
    this.hp -= loss if loss > 0;
  }

  public func fight (ennemy: Hero) {
    // Damage the ennemy
    this.beAttacked(ennemy);
    // Get damages from the ennemy
    ennemy.beAttacked(this);
  }
  // ...
```

We did it! Here is our whole code with the display of names:

```sn
class Hero {
  private name: string;
  private hp: int;
  private mp: int;
  private atk: int;
  private def: int;

  public func %construct (name: string, hp: int, mp: int, atk: int, def: int) {
    this.name = name;
    this.hp = hp;
    this.mp = mp;
    this.atk = attack;
    this.def = defense;
  }

  public func getName () : string {
    return this.name;
  }

  public func getAttack () : int {
    return this.atk;
  }

  public func beAttacked (ennemy: Hero) {
    // Calculate the loss
    // Can't lose a negative amount of health points
    val loss = max(0, ennemy.getAttack() - this.def);
    // Tell what happens
    println!(`${this.name} is attacked by ${ennemy.getName()} and loses ${loss} HP!`);
    // Decrease HP
    this.hp -= loss;
  }

  public func fight (ennemy: Hero) {
    // Tell what happens
    println!(`${this.name} is going to fight ${ennemy.getName()}!`);
    // Damage the ennemy
    ennemy.beAttacked(this);
    // Get damages from the ennemy
    this.beAttacked(ennemy);
  }
}
```

To test it:

```sn
// Make two warriors
val jack = new Hero('Jack', 100, 5, 50, 10);
val john = new Hero('John', 50, 5, 80, 5);

// Make them fight
jack.fight(john); // Prints: 'Jack is going to fight John!'
                  //         'John is attacked by Jack and loses 45 HP!'
                  //         'Jack is attacked by John and loses 70 HP!'
```

When declaring a class, its name must start with an uppercase letter (A to Z), followed by either uppercase letters, lowercase letters, digits or underscores (_) ; starting it with another symbol (e.g. a lowercase letter) will result in an error at build time. Also, it can't be made of only several uppercase letters, but one is fine. For example, `A` is valid name, but `AA` isn't (as it's a constant's name). Also, `A_` is fine, but not `_A`.

Primitive types (`void`, `string`, `int`...) start with a lowercase letter to recognize them more easily and distinguish them from object types.

### Members accessibility

We just saw two _accessor_ keywords for a class' members: `public` and `private`. Public members are public, so anyone can access them, even from the outside of the class. This mean we can do this:

```sn
class Example {
  public val hello = 'world!';
}

val instance = new Example();
println!(instance.hello); // Prints: 'world!'
```

Private members are restricted to the inside of the class, meaning they can be used only by code that is written between the `{` and `}` braces of the class. Here is an example:

```sn
class Example {
  public val hello = 'world!';
  private val secret = 'I\'m private!';

  public func printSecret () => println!(this.secret);
}

val instance = new Example();
println!(instance.hello); // Prints: 'world!'
println!(instance.printSecret()); // Prints: "I'm private!"
println!(instance.secret); // ERROR (private member)
```

In other terms, a class is a _scope_ which can make some of its resources public.

There is a specificy about private members, though. We can access an instance's private members from the inside of a class even if it's not the current instance.

```sn
class Example {
  public val hello = 'Hello!';
  private val secret = 'No one can see me!';

  public func printAnotherSecret (other: Example) => println!(other.secret);
}

val instance = new Example();
val another  = new Example();

println!(instance.printAnotherSecret(other)); // Prints: 'No one can see me!'
```

This is due to the fact a class is registered as a _friend_ of itself, but that's a notion we will see later.

### The constructor

Let's see, more in details, how the constructor works.

Declaring a variable with a class as a type is called an _instanciation_. For example, if we do:

```sn
val something = new Superthing();
// OR
val something: Superthing;
// OR
val something: Superthing = new Superthing();
```

We _instanciate_ each time the `Superthing` class, and `something` is called an _instance_ of the class. As we saw, a class is a bunch of _attributes_, which can be public or private (though we'll see more modes later) and _methods_ which are basically functions inside the class. Only the methods can access the private attributes, while the public attributes are available to any piece of code that can access the instance.

Because we want some attributes to be initialized before the developer uses them, we can declare a method that will be ran when the class is instanciated. This is called the _constructor_.

```sn
class Superthing {
  private name: string;

  public func %construct (theThingName: string) {
    this.name = theThingName;
  }
}
```

Here, the arguments took by the constructor are the ones given when instanciating the class. Here:

```sn
val something = new Superthing(/* Arguments for the constructor */);
```

Will fail, because we gave no argument instead of the one the constructor expected. But if we write:

```sn
val something = new Superthing('Gamepad');
```

This will work fine and the constructor will get the `'Gamepad'` value in `theThingName`.

### Methods

This part will be pretty simple: methods in classes act like simple lambdas in structures, but they can also access the classes' private attributes and use a few specific keywords.

Attributes and methods of a class (called its _members_) can be accessed using the `this` keyword:

```sn
class Superthing {
  private name: string;

  public func %construct (theThingName: string) {
    this.name = theThingName;
  }

  public func getName () {
    return this.name;
  }
}
```

Here, the `getName()` function will return the thing's name. To use it, we simply have to do:

```sn
val something = new Superthing('cake');

println!(`The thing's name is ${something.getName()}.`);
  // Prints: "The thing's name is cake."
```

Another trick to use a member from the inside of the class is to use the `@` symbol:

```sn
class Superthing {
  // ...

  public func getName () {
    return @name;
  }
}
```

`@` is a strict equivalent to `this.`, so we can use it to access the members of the current class

We can also use it in the constructor to automatically set some attributes:

```sn
class Superthing {
  private name: string;

  public func %construct (name: string) => @name = name;
}
```

This will automatically set the value of the private `name` members when we'll instanciate the class.

### Readonly attributes

When declaring class' attributes, we sometimes want to make it private because we don't want anyone to change it without control, but we also want outside code to read it. So, this would be a read-only attributes from the class' outside, and a classic attribute from the inside (both readable and writable).

A first implementation could be:

```sn
class SomeClass {
  private myAttribute: string;

  public func getMyAttribute () : string {
    return @myAttribute;
  }
}
```

This is perfectly valid and works as expected. But doing this can be heavy to write, especially if we have several attributes like this one. This forces us to call a function with a longer name than the attribute's one, plus to write the method for each argument we want to make readable from the outside. So, there is a lighter syntax to achieve this:

```sn
class SomeClass {
  public readonly myAttribute: string;
}
```

Now we will access `myAttribute` using `instance.myAttribute` instead of `instance.getMyAttribute()`, which is lighter and avoids from calling a function at runtime. Also, readonly attributes are considered as constants from the outside. Here is an example:

```sn
class SomeClass {
  public readonly attr = { sub: 1 };
}

let instance = new SomeClass();
instance.attr = { sub: 2 }; // ERROR
```

### Static members

This is another type of members. Static members are not available from the instances, but only from the class itself:

```sn
class Product {
  private static unique_id = 0;
  public static func increaseCounter () : int => ++ _self.unique_id;
}
```

Here, `increaseCounter()` can only be accessed by using the `.` operator on the class itself:

```sn
Product.increaseCounter(); // Works fine

let product = new Product();
product.increaseCounter(); // ERROR (static method)
```

The `_self` keyword refers to the current class in a static context, meaining we can only access its static members.

Let's populate the class with non-static attributes:

```sn
class Product {
  // The global counter for unique identnfiers
  private static counter = 0;

  // Increase the global counter
  public static func increaseCounter () : int => ++ _self.counter;

  // The product's unique identifier
  public readonly unique_id: int;
  // The product's name
  public readonly name: string;

  // Initialize the instance
  public func %construct (name: string) {
    @name = name;
    // Generate a unique identifier from the static function
    @unique_id = _self.increaseCounter();
  }
}
```

Note that writing `_self` is like writing the class' name (`Product` here). The specificity is that, when we write a class' name inside itself, we can also access its private static members. If we had been outside the class, we wouldn't have been able to access the `counter` attribute as it's private.

When static members are private, that means they can only accessed through `_self`, so from the inside of the class only. When they are public, they are available from the outisde of the class using the class' name, followed by the static operator `.` and the attribute's name.

### Practice: Let's make a map!

Let's now practice this concepts with a little exercice. We want to represent a RPG map with a class. Each cell has a number referring to an empty cell (0), a rock (1) or a trap (2). The map is given at its creation as a double list of integers. The map is a rectangle and has a fixed width and heigh deducted from the double list.

We can move on this map a player, starting from a location given at the map's creation. The player can move up, down, left and right. It can't go on rock cells, and going to a trap will display a message 'You've been trapped!' befre making the player unable to move.

We have to represent it with a single class, with only private attributes or public read-only ones. At anytime, we should be able to access the player's current position, to get any cell's value, or to check if the player have been trapped already. The top-left position is (0, 0).

The problem seems to be complex but it is mostly simple to achieve. Read the solution below when you're ready. If you can't solve it, try to read again what we saw before and think about the structure of the class.

#### Solution

```sn
class Map {
  // Cell types
  private static val EMPTY = 0;
  private static val ROCK  = 1;
  private static val TRAP  = 2;

  // Read-only attributes
  public readonly playerX: int;
  public readonly playerY: int;
  public readonly trapped: bool = false;
  public readonly cells: int[][];

  // Create the map
  public func %construct (cells: int[][], playerX: int, playerY: int) {
    @cells = cells;
    @playerX = playerX;
    @playerY = playerY;
  };

  // Move the hero
  private func move (x: int, y: int) {
    // If we fell in a trap before...
    if @trapped {
      // Move is forbidden
      println('You can\'t move because you\'re trapped.');
    }

    // Check if we are going outside of the map
    elsif x < 0 || x > @cells[0].length - 1 ||
          y < 0 || y > @cells.length    - 1 {
      println!('Cannot move outside the map.');
    }

    // Check if the cell we are going to is a rock
    elsif @cells[y][x] == _self.ROCK {
      println!('There\'s a rock on your way.');
    }

    // Else, move the player
    else {
      // Save the new player's location
      @playerX = x;
      @playerY = y;

      // If we fell in a trap, game over!
      if @cells[y][x] == _self.TRAP {
        println!('You\'ve been trapped!');
        @trapped = true;
      }
    }
  }

  // Move up
  public func moveUp () => @move(@playerX, @playerY - 1);
  // Move down
  public func moveDown () => @move(@playerX, @playerY + 1);
  // Move to the left
  public func moveLeft () => @move(@playerX - 1, @playerY);
  // Move to the right
  public func moveRight () => @move(@playerX + 1, @playerY);
}
```

Here it is! This code is a good answer to the problem.

Of course, your solution could be different, as there are many ways to solve it. This anwser is well optimized and relatively short. Try to compare you own solution to this one and see the differences.

A short note about read-only attributes mutability: even though `cells` is set as read-only, this only affects the attribute itself, and not its sub-structures. This means that, even though we can't do `map.cells = /* something */` we can still do `map.cells[0][1] = Map.EMPTY` for example. Keep this problem in mind while dealing with dictionaries (the same problem applies by structures).

## Classes in depth

Now we've acquired the basis of classes, this part will teach you more complex features of OOP like inheritance, sub-typing or interfaces.

### The destructor

We saw before the constructor, a special method called when the instance is created. This method can't be ran the normal way, meaning you can't do `myInstance.construct()` or `myInstance.%construct()` for example. Such a method, and every method we will see beginning by the `%` symbol, is called an _overload_, because it _overloads_ the class' behavior.

By default, when we instanciate a class, nothing is done (excepted creating the object itself). The constructor overwrites this behavior by running its own code.

The destructor is a special function you probably won't use very often, but it is still useful in some cases. Like the constructor, it's an overload, called `%free`. It takes no argument and must be `void`-typed, so its return type can also be omitted.

When dealing with heavy objects, or simply when using a low-level languages, developers often _free_ their variables themselves. Freeing a variable means its value is definitely removed, so it doesn't take memory anymore. Of course, after a resource is freed, using it will result in an error.

A resource can be freed several ways. The first one is with the _garbage collector_, a little tool that detects what resource isn't used anymore and free it because it knows it won't be used anymore. This is done automatically in JavaScript or Python for example, two interpreted high-level languages. Languages such as Rust have other tools instead that does the same thing, but that insert a piece of code to free the resource when building the sources. Some other languages, finally, like C or C++, doesn't have this feature and resources must be freed manually.

In the language, the destructor is called when the instance is freed, no matter what the way is (garbage collection, manual free, ...). It goes like this:

```sn
class IntArray {
  private data: List<int>;

  public func %free () {
    println!('I will be freed.');
  }

  public func push (value: int) => @data.push(value);
  public func pop () : bool => @data.pop();
}

let list = new IntArray();
list.push(2);
list.push(4);
list.push(3);
free list; // Prints: 'I will be freed.'

list.push(8); // ERROR (resource freed)
```

This overload aims to prepare the instance to being destroyed. After the destructor is ran, the instance is freed and any usage of it will result in an error, like the last line in the above example.

### Cloning

Let's imagine we have an array of integers. We make a function that calculates, for each number, its square, and return a final array with the result. A first implementation of this idea could be:

```sn
func squareList (array: int[]) : int[] {
  for i = 0p; i < array.length; i ++ {
    array[i] *= array[i];
  }

  return array;
}
```

This works fine, but let's now try the following code:

```sn
val array = [ 2, 7, 8 ];
val squares = squareList(array);

println!(squares[1]); // Prints: '49'
println!(array[1]); // Prints: '49'
```

Did you understand what just happened? When we modified the values of the array in our `squareList` function, this also affected the original array. So the original and the result are exactly the same ones.

This behaviour is due to the fact SilverNight doesn't clone objects each time, because it would be way too long. We can also observe the problem on objects:

```sn
// Define a first hero
val jack = {
  hp: 100,
  atk: 20,
  name: 'Jack'
};

// John is a hero, just like Jack is
val john = jack;

// Set John's name
john.name = 'John';

// Surprise!
println!(john.name); // Prints: 'John'
println!(jack.name); // Prints: 'John'
```

The same thing applies for any object, so for any non-primitive values (anything that is not a `void`, a boolean, a number or a string). This is a big problem, but which has a very simple answer: cloning.

To solve our first problem, we simply have to do this:

```sn
val array = [ 2, 7, 8 ];
val squares = squareList(clone!(array));

println!(squares[1]); // Prints: '49'
println!(array[1]); // Prints: '7'
```

The `clone!` flex we use here simply creates a new array with the same values than the previous one. So, our initial array isn't affected.

But cloning doesn't work on any class. For example, if we have a class representing a product in an enterprise with a `unique_id` attribute, cloning could have bad consequences.  This is why, by default, instances can't be cloned until they implement the `%clone` overload. Let's consider this class:

```sn
class Product {
  // Instances' attributes
  public readonly unique_id: int;
  public readonly name: string;
  public readonly price: int;

  // Class' static attribute
  private static counter: int = 0;

  public func %construct(name: string, price: int) {
    @name = name;
    @price = price;

    @unique_id = _self.counter ++;
  }
}
```

It can't be cloned because the cloning overload is not present in the class.

The cloning overload can take two different signatures. The first one is a function taking one argument (let's call it `target`) and returning an instance of the current class. In this case, the program will automatically clone the instance by creating a new object with the same methods and attributes, and assign the old instance's attributes' values to the new instance's attributes' ones (even private ones) by cloning each attribute.

The overload function will then be called and its argument will be the automatically-cloned new instance. It will then be expected to return an instance of the class that will be the clone returned by the `clone!` flex, so the overload function will be able to manipulate the instance like, for example, generating a new unique identifier in our case, before returning it.

Note that the constructor is not called when the instance is automatically cloned.

```sn
  // ...
  public func %clone (target: _self) : _self {
    // Print a simple message
    println!(`Cloning a ${target.name}`);

    // Set a new unique identifier
    target.uid = _self.counter ++;

    // Return the target
    return target;
  }
  // ...
```

This cloning way is simple but implies two problems, though. The first one is that, for a moment, an exact clone of the instance exists. This can be a problem is some specific situations, so we have to be careful about this point. The second one is that this doesn't work on classes which has non-clonable attributes.

For example, if we have in our class a `Superthing` instance, with the `Superthing` class not being clonable, an error will be thrown at build time.

So, we have another choice: make an overload function that takes no argument, and returns an instance of the current class. It will have to create itself the instance and then return the result. This way, cloning will always work, and the cloning function can ensure there won't ever be two instances of the class with the same unique identifier. And, because we can modify another instance's private members in its original class, the manipulation will be easy.

```sn
  // ...
  public func %clone () => new Product(@name, @price);
  // ...
```

Be aware, in the case you manually create an instance, don't forget to clone arrays and lists if you give some to the new instance from the current one (same with objects and instances from other classes) - else you could encounter some unexpected behaviour like modifying an instance changes another too. Conceptually, the goal of a clone is to have the same behaviour than the original (same values...) but to be **fully** independant from it.

#### The lazy way

There is a third and last way to grant cloning support to your class. It's called a _lazy_ overload and works, instead of a function, with a single attribute. Here is how it goes:

```sn
  // ...
  public pln %lazy_clone = true;
  // ...
```

If we write that, instances of the class will support cloning but the class won't be able to do anything when this happens, or even to be notified of the cloning. All the attributes of the original instance will automatically be cloned to be assigned to the new one (like the first `%clone` we saw before). This is perfect for classes that don't have to worry about duplicate instances.

Of course, the same problems that applies to the `%clone (clone: _self) : _self` method applies here too.

Note that implementing any of the cloning ways makes the `%clone () : _self` overload available in the class.

### Serialization

Serialization consists in converting a class instance to a string, in order to transmit it over the network or to write it to a file, for example. It implies an unserialization process, which converts the string to an instance of the same class.

We will take again our product example. Below is the source code of the `Product` class at this point:

```sn
class Product {
  // Instances' attributes
  public readonly unique_id: int;
  public readonly name: string;
  public readonly price: int;

  // Class' static attribute
  private static counter: int = 0;

  public func %construct(name: string, price: int) {
    @name = name;
    @price = price;

    @unique_id = _self.counter ++;
  }
}
```

The serialization process requires to convert the instance to a string. We also want to be able to make an instance from any serialized string our classe produces in order to use the products. So we need to _serialize_ the instance and then _unserialize_ the produced string.

For that, we'll implement two overloads in our class: `%serialize` and `%unserialize`. They have the following signatures:

```sn
  public func %serialize () : string;
  public static func %unserialize (serial: string) throws UnserializationError : _self;
```

For now, we won't talk about the `throws UnserializationError` part as it requires other concepts we will see later.

Now let's implement these overloads! First, how to implement serialization? We could produce a human-friendly string, like that:

```sn
  // ...
  public func %serialize () : string {
    return `uid: ${@unique_id} ; name: ${@name} ; price: ${@price}`;
  }
  // ...
```

But there is a problem: first, the string is not optimized. One of the goal of serializing instances is to produce a small string to fit in a small disk space / be fast to transfer over a network. The second one, which is more annoying, is that it will be complicated to make an instance from such a string. So we can use a trick that is serializing a structure:

```sn
  // ...
  public static struct Serialized {
    name: string;
    price: int;
  }

  public func %serialize () : string =>
    // Make an object containing the data we want to serialize
    // (thanks to IST)
    // Then serialize it and return the result
    serialize!(_self.Serialize {
      name: @name,
      price: @price
    });

  public static func %unserialize (serial: string) throws UnserializationError : _self {
    // Unserialize the serialized structure
    val obj: @Serialized = unserialize!(serial, @Serialized);
    // Make a new product instance and return it
    return new Product(@name, @price);
  }
  // ...
```

Any resource can be a class' member, like structures, or even other classes (though they must be public).

Note that not-assignable entities (like structures) are considered as constants when declared as a class' member. So, it's impossible to do something like `Product.Serialized = anotherStruct`.

#### The lazy way (again)

Just like cloning, there is a lazy overload for serialization. It consists in a single attribute, called `%lazy_serial_fields`, which is a tuple of strings indicating the class' attributes to serialize. This way, we don't have to implement any serialization function.

```sn
  // ...
  public pln %lazy_serial_fields = ( 'name', 'price' );
  // ...
```

Be aware though when you put private attributes in the serialized fields, because they can be unserialized to. This means that, if you put the product's ID in the tuple for example, any piece of code could produce a string with the product ID it wants and then unserialize it to produce a product with a duplicate ID and/or an ID reserved to special products (such has high-importance products).

Note that, as for cloning, implementing any of the cloning ways make the `%clone () : _self` overload available in the class.

### Inline calls

Inline calls consists in calling a class like it is a function. It can takes whatever arguments it wants to and use any return type.

There are two overloads for inline calls: the first one is common to each instance, making the instances callable, and the second one is static and allows the class itself to be called:

```sn
class Translator {
  // Here is a function that translates a text
  //  and returns the translated string
  public static func translate (text: string, lang: string) : string {
    // Do some translation stuff here
    // For the example we will return a constant string
    return 'Bonjour';
  }

  // Make the class callable
  public static func %call (text: string, lang: string) : string {
    return @translate(text, lang);
  }
}

println!(Translator('Hello', 'fr')); // Prints: 'Bonjour'
```

Here, the `%call` overload made the class callable. We could implement it for instances:

```sn
class Calculator {
  public func add (left: int, right: int) : int => left + right;

  public func %call (left: int, right: int) : int => @add(left, right);
}

val calc = new Calculator();
println!(calc(2, 5)); // Prints: '7'
```

Remember: making the **class** callable as a function requires a static function, while it's not to make the **instances** callable as functions. We can also implement both the overloads in the same time, of course.

### Overloading operators

We can also overload operators in classes. This allows to add, substract or divide instances of the class with any other type. It can be another instance of the class, a number, or anything else. The result can also be of any type, and it doesn't have to respect commutativity or anything else.

The list of overloadable operators is:

* `%plus` (`+`)
* `%less` (`-`)
* `%times` (`*`)
* `%divide` (`/`)
* `%modulo` (`%`)
* `%pow` (`**`)

You can see the matching operator on the right of the corresponding overload. Each of them takes two arguments, and return any value. Let's see an example: we have a class called `BankAccount`, with a public read-only member called `money` and a method to add and substract money from the account. We now want to be able to add two bank accounts. Here is how we could do it:

```sn
class BankAccount {
  // The money on the account
  public readonly money: uint;

  // A simple constructor
  public func %construct (money: int) => @money = money;

  // Add money to the account
  public func add (amount: int) => @money += amount;
  // Remove money from the account
  public func sub (amount: int) => @money -= amount;

  // Add two accounts by returning the sum of their content
  public func %plus (cmp: _self) : int {
    return @money + cmp.money;
  }
}

// Make two instances
let account1 = new BankAccount(1000);
let account2 = new BankAccount(2000);

// Add them and print the result
println!(account1 + account2); // Prints: '3000'
```

That's as simple as that. We could also implement a way to handle addition between bank accounts and numbers:

```sn
class BankAccount {
  // ...
  public func %plus (cmp: number) : number {
    return cmp + @money;
  }
  // ...
}

println!(account1 + 20); // Prints: '1020'
```

Note that implemeting `%times` will automatically implement `%pow` as a succession of multiplications.

There are though some operators that can't return any type. These are the logical operators, which must return a boolean. They are:

* `%equal` (`==`)
* `%inequal` (`!=`)
* `%greater` (`>`)
* `%smaller` (`<`)

So, we could compare two bank accounts:

```sn
class BankAccount {
  // ...
  public func %equal (cmp: _self) : bool {
    return @money == right.money;
  }
}

println!(account1 == account2); // Prints: 'false'
println!(account1 == new BankAccount(1000)); // Prints: 'true'
```

A specificy with logical operators is they are reversable: if you implement `%equal`, this will also implement `%inequal` as its opposite. Here is the list:

* Implementing `%equal` will automatically implement `%inequal` ;
* Implementing `%inequal` will automatically implement `%equal` ;
* Implementing either `%equal` or `%inequal`, with `%greater`, will automatically implement `%smaller` ;
* Implementing either `%equal` or `%inequal`, with `%smaller`, will automatically implement `%greater`

So, any class that implements either `%equal` or `%inequal` as well as `%greater` or `%smaller` automatically implements all comparison overloads.

This also makes the class implementing the `Comparable` interface, which is useful when dealing with vectors for example: that allows to use the `.sort()` as well as the `.getIterator()` functions from `Vector`.

Note that these overloads can have a variant to make them comparable to another type, like `%equal (cmp: int) : bool`. If all required comparison overloads for the `int` type are implemented in our class, it will implement the `ComparableTo<int>` interface. The `Comparable` type is in fact an alias for `ComparableTo<_self>`.

### Friends

_Friends_ are part of the concept of accessibility. These are resources, listed in a class, that can access its private attributes.

```sn
class Product {
  private static counter = 0;
  private id: int;

  public func %construct () => @unique_id = _self.counter ++;

  // List a function as this class' friend
  friend getProductId (product: _self) : int;
}

// Define the class' friend function
func getProductId (product: Product) : int {
  // Access the instance's private attributes
  return product.id;
}
```

There are several syntax to set a resource as friend:

```sn
class Product {
  // List a simple function as a friend
  friend func simpleFunction (product: _self) : int;

  // List a function (either static or not) from another class as a friend
  friend func AnotherClass.instanceFunction(product: _self) : int;

  // Even a whole class can be listed as a friend
  friend class AnotherClass;
}
```

As we will see later, this also works for interfaces, traits and other things.

## Cross-typing

Cross-typing an important part of the language, as it features many useful concepts for programming. In this part, we will see them all, before going to the final chapter about classes: the dictionaries.

### Inheritance

Here is the big part of classes: inheritance. That's a very important concept so be sure to understand it fully.

When declaring a class, we sometimes encounter a problem when we want to make specific instances. For instance, let's say we have a `Hero` class. With it we want to describe a warrior, which has no `mp` but a `rage` attribute that increases when he receives damages which increases its attack points. At the opposite, we have wizards, who don't have `rage` but `mp` to use spells on their target.

The warrior could have a `rage` attribute to check if their rage level, and the wizard could have a `fireball()` method to throw a fireball to the ennemy.

Of course, we could implement this in a single class, by having a `type` attribute for instance that describes if the hero is a warrior or a wizard, and do the check in the two methods we just saw to forbid warriors using fireballs and always keep a nil rage for wizards. But that would make our code less clear and less maintable, and that would be even worse if we wanted to add new type of heroes (like a dragon that can fly to avoid attacks, or a demon that invokes some demoniac creatures).

A solution to this problem is _inheritance_. The concept is mostly simple: we will declare a new class that _inherits_ from another called the _mother class_. These classes will be called the _children classes_. In our example, the `Hero` class would be the mother, while two `Warrior` and `Wizard` classes would be the children that _inherits_ from `Hero`.

A class inheriting from another will receive all of its members, including overloads. That means any method that works on the mother class will work on this children. But the specificity of children classes it that they can implement their own members, and rewrite their parent's ones (though they can't remove them). For instance, if the `Hero` class has an `fight()` method, `Warrior` and `Wizard` could rewrite its body (what it does) but not its signature ; they will be forced to have a method with the same signature, even if they rewrite it. But, thanks to polymorphism, they can still define a new method with the same name but with other arguments (and potentially another return type) - but the mother's method will be inherited anyway.

Now we saw the concept, let's implement it step by step. First, we'll make a skeleton for the mother class:

```sn
open class Hero {
  public readonly name: string;
  public readonly hp: int;
  public readonly attack: int;

  // Attack an ennemy
  public func fight (ennemy: _self) {
    // Check if this hero is dead
    if @hp == 0 {
      println!(`${@name} can't find because he's dead.`);
      return ;
    }

    // Attack the ennemy
    ennemy.receiveDamages(@attack, @name);

    // Check if the ennemy died
    if ennemy.hp == 0 {
      println!(`${@name} killed ${ennemy.name}!`);
      return ;
    }

    // Receive damages from the ennemy
    @receiveDamages(ennemy.attack, ennemy.name);
  }

  // Receive damages from an ennemy
  public func receiveDamages (amount: int, ennemyName: string) {
    // Check if this hero is dead
    if @hp == 0 {
      println!(`${@name} did not receive any damage because he's dead.`);
      return ;
    }

    println!(`${ennemyName} fights ${@name}.`);

    // Check if the damages are higher than the remaining HP
    if amount > @hp {
      @hp = 0;
      println!(`${@name} dies.`);
      return ;
    }

    println!(`${@name} loses ${amount} HP.`);

    // Receives the damages
    @hp -= amount;
  }
}
```

A little subtlety here is the presence of the `open` keyword at the beginning. It's called a _class state_, and this one allows our class to be _inherited_. By default, classes are _sealed_, so it's impossible to make children class from them ; they need to be _opened_ using the `open` keyword to allow it.

Another thing: the `protected` keyword. It kind of acts like `private`, as the member it prefixes will only be available from the inside of the class. But, `private` is a special keyword that, in addition to making the attribute available only from the inside of the class, will not make it available from its children class. So `Warrior` and `Wizard` wouldn't be able to read or write it. That's a thing we need to think to when making a class that will be inherited by other ones. The `protected` keyword does the same thing than `private` excepted that it makes the attribute available from children classes.

So, now we've seen that, let's make a first children class:

```sn
class Warrior extends Hero {
  public readonly rage: int;

  public func %construct(name: string, hp: int, attack: int) {
    @name = name;
    @hp = hp;
    @attack = attack;
  }

  public func receiveDamages (amount: int, ennemyName: string) {
    // Call the parent class' `receiveDamages()` method
    super.receiveDamages(amount, ennemyName);

    // Check if the warrior rage will exceed 20 points
    //  by adding the damages just received
    if @rage + amount > 20 {
      // Limit them
      @attack += 20 - @rage;
      @rage = 20;
    } else {
      // Else, increase without worrying about the amount
      @attack += amount;
      @rage += amount;
    }
  }
}
```

First, we create a `Warrior` declared as a child class of `Hero`, so it keeps all its attributes and methods (including overloads).

Next, we declare a new `rage` attribute, which this time is `private` because there won't be any class inheriting from this one.

Then, we declare a constructor for the class. If you look at the mother class, it doesn't have any constructors. If we doesn't make one, the class will be instanciable without any argument, which would set HP, attack etc. to their NIL value. This is a fundamental rule: if the class has no constructor, it can be instanciated without any argument ; if it has one or more constructors, the instanciation must use any of the declared constructors.

Finally, we re-define the `receiveDamages` method. The `super` keyword we use in it refers to the mother class of the current one, as an instance. For example, `super.receiveDamages()` will call the `receiveDamages()` method of the **parent class** applied to our instance. This way, we don't have to rewrite the calculation of the damages and other checkings - which would make a duplicate code, which is a thing to avoid in development.

The redefined method increases the rage counter (with a maximum of 20 points) and increases the warrior's attack points, so his attack points will be up to his original value plus 20 points.

We can now write our `Wizard` class, still inheriting from `Hero`:

```sn
class Wizard extends Hero {
  public readonly mp: int;

  public func %construct (name: int, hp: int, attack: int, mp: int) {
    @name = name;
    @hp = hp;
    @attack = attack;
    @mp = mp;
  }

  public func fireball (ennemy: Hero) {
    // Check if remaining MP are enough
    if @mp < 10 {
      println!(`${name} can't throw a fireball because he doesn't have enough MP.`);
      return ;
    }

    // Decrease remaining MP
    @mp -= 10;

    // Attack the ennemy
    ennemy.receiveDamages(@attack * 2, @name);

    // Check if the ennemy died
    if ennemy.hp == 0 {
      println!(`${@name} killed ${ennemy.name}!`);
      return ;
    }

    // Receive damages from the ennemy
    @receiveDamages(ennemy.attack, ennemy.name);
  }
}
```

The `Wizard` class also inherits from `Hero`, and adds a new `mp` attribute (private, like `rage` for `Warrior`). It also redefines the constructor, as it now needs a new attribute.

Then, it implements a new method called `fireball()` to throw a fireball on the ennemy, inflicting double damages. Pretty powerful.

Now we've done this, let's try our classes:

```sn
let hegor = new Warrior('Hegor', 100, 30);
let jack  = new Wizard('Jack', 120, 10, 35);

hegor.fight(jack);
println!('------------------');
jack.fireball(hegor);

/* Prints:

   Hegor fights Jack.
   Jack loses 30 HP.
   Jack fights Hegor.
   Hegor loses 10 HP.
   ------------------
   Jack fights Hegor.
   Hegor loses 20 HP.
   Hegor fights Jack.
   Jack loses 50 HP.
*/
```

Here we are! We implemented a mother class with two children. This may appear complex as it's the first time we're doing this, but as you use inheritance in your own programs you'll get used to it.

### Resolution keywords

There are several keywords to access other classes from a given one. These are the _resolution keywords_. Briefly:

* `this` refers to the real class as an instance (the real object we are manipulating) ;
* `self` refers to the current class as an instance ;
* `super` refers to the mother of the current class as an instance ;
* `_this` refers to the class `this` is an instance of ;
* `_self` refers to the class `self` is an instance of ;
* `_super` refers to the class `super` is an instance of ;

Besides, `static!<obj>` allows us to get a class in a static context from any of its instances. This means that  `static!<'Hello'>` will return the `string` class, so we can access its static properties (like `string.NIL` which is the NIL value for this class, an empty string).

Let's take a short example:

```sn
open class Mother {
  public func helloFromMother () => this.hello();
  public func hello () => println!('I am the mother class.');
}

class Child extends Mother {
  public func hello () => println!('I am the child class.');
}
```

* `this` refers to the current instance whatever the class it is written in is. ;
* `self` will refer to `Child` inside the `Child` class, and to `Mother` inside the `Mother` class ;
* `super` will refer to `Mother` inside the `Child` class, and throw an error inside the `Mother` class

But there is an important rule about `this`: if we write the following code:

```sn
val child = new Child();
child.helloFromMother(); // Prints: 'I am the child class.'
```

We can use the `helloFromMother()` method because `Child` inherits it from `Mother`. This method runs the `hello()` method of the _instance_'s class, not the current one. So it calls the `hello()` method from `Child` instead of `Mother`. To call the method of the _current_ class, we should have used `self.hello()` instead:

Note that these keywords can be used both in a dynamic and static way: we could write `this.staticMethod()` as well as `self.sayHello()`, which would have printed `'I am the mother class'`.

```sn
open class Mother {
  public func helloFromMother () => self.hello();
  public func hello () => println!('I am the mother class.');
}

class Child extends Mother {
  public func hello () => println!('I am the child class.');
}

val child = new Child();
child.helloFromMother(); // Prints: 'I am the mother class.'
```

#### Calling overloads

Classes can call their own overloads like standard methods:

```sn
class Test {
  public readonly id: int;
  public readonly name: string;

  private static readonly counter: int = 0;

  public func %construct () {
    @id = ++ self.counter;
    @name = ''; // The value of '@name' is now more explicit
  }

  public func %construct (name: string) {
    @name = name;

    this.%construct(id);
  }
}
```

This works for all overloads (even the constructor and the destructor) with all resolution keywords (`this`, `self` and `super`, as well as their `_this` `_self` and `_super` static equivalents).

Note that these overloads methods can only be accessed from the inside of the class, or from the inside of its children classes. Also, the call must be explicit: you cannot write `(true ? this : self).%construct()` for example.

Also, be aware that some languages use `this(...)` to call the current class' constructor (the same applies for the other resolution keywords), but here it calls the instance (with `this` and `super`) or the class (with `self`) as a function using the `%call` overload - which throws an error if it's not implemented.

### Constructor inheritance

A specificity about the constructor is that it is not inherited by default ; you will have to re-write your own constructor in every child class. But hopefully, it is possible to call the parent class' constructor, as we will see soon.

Still, if you _really_ want to inherit the constructors of the parent class (e.g. in the case there are many constructors to re-define in the child class), you can still use the `super(<arguments>)` syntax, which retrieves the specified constructor of the direct mother class (but not from of the grand-mother class):

```sn
class A {
  public func %construct (message: string) {
    println!(message);
  }
}

class B extends A {}

class C extends A {
  super%(message: string);
}

// Doesn't inherit mother's constructors
let b = new B('Hello !'); // ERROR (no such constructor)
// Inherit them
let c = new C('Hello !'); // Prints: 'Hello !'
```

To inherit all of them, we can use the `super%(...)` syntax:

```sn
class A {
  public func %construct (message: string) {
    println!(message);
  }
}

class B extends A {}

class C extends A {
  super%(...);
}

// Doesn't inherit mother's constructors
let b = new B('Hello !'); // ERROR (no such constructor)
// Inherit them
let c = new C('Hello !'); // Prints: 'Hello !'
```

#### Re-implementing the constructor

As we saw, the constructor can't be inherited, but we can use still call it from a child class. For example, if we have a child class which wants to have exactly the same constructor than its mother, we can do:

```sn
open class Mother {
  protected name: string;

  public func %construct (name: string) {
    @name = name;

    println!(`Hello ${name}!`);
  }
}

class Child extends Mother {
  public func %construct (name: string) {
    // Call the mother's existing constructor
    super.%construct(name);
  }
}
```

#### Private overloads

Like standard methods, overloads can be declared as protected or private. In this case, the overload will work only from the inside of the class.

For example, we could imagine a class we don't want to be instanciated from the outside: only its children classes can instanciate it. For that, we can declare the constructor of this class as protected, and call it only from the children classes:

```sn
class Mother {
  protected func %construct () {}

  public func sayHello () {
    println!('Hello!');
  }
}

class Child extends Mother {
  public static func getMotherObj () : _super {
    return new Mother(); // Works fine
  }
}

// Instanciate the mother class
new Mother(); // ERROR (no public constructor available)
Child.getMotherObj(); // Works fine

// Use the instance
Child.getMotherObj().sayHello(); // Prints: 'Hello!'
```

### Stated classes

_Stated_ classes have a keywording prefix the `class` one, called the _class' state_. They allow to change the behavior of the class, and notably to modify the way it can (or not) be inherited.

#### Opened classes

The `open` state allows the class it prefixes to be inherited.

#### Virtual classes

Virtual classes cannot be instanciated, so it must have at least one non-virtual child class. The class is automatically set as `open` to allow inheritance.

The keyword for this state is: `virtual`.

#### Static classes

Static classes are virtual and as they are sealed by default (like any class) they are not instanciable and not inheritable. This implies all the members of the class to be static.

The keyword for this state is: `static`.

#### Unique classes

Unique classes are 'self-instanciated' classes. Here is an example:

```sn
unique class tr {
  public func translate (text: str, lang: str) : string {
    // Do some stuff here
    return 'Bonjour';
  }

  public func %call (text: str, lang: str) : string {
    return @translate(text, lang);
  }
}

// Let's try it!
val instance = new Translation(); // ERROR
Translation('Hello', 'fr'); // ERROR

tr.translate('Hello', 'fr'); // Returns: 'Bonjour'
tr('Hello', 'tr'); // Returns: 'Bonjour'
```

As you can see, the `Translation` class does not even exist, in reality. There is only the `tr` instance.

Because of the self-instanciation, such classes can't have a constructor, or if they have they must have an empty one (which takes no argument).

#### A little table

|  Keyword  | Instanciable ? | Inheritable ? |
|-----------|----------------|---------------|
| `static`  |        No      |       No      |
| `virtual` |        No      |      Yes      |
| _nothing_ |       Yes      |       No      |
|  `open`   |       Yes      |      Yes      |

The `unique` keyword doesn't affect a class itself but makes an object from a ghost class, that's why it isn't in the table.

### Abstract methods

Like virtual classes are classes that must be inherited, abstract methods are methods that must be re-implemented in the children classes.

Basically, abstracting a method means that its signature is written in the class, but its body is not forced to. It also forces any children of this class to implement its own version of the method, and this method will be usable in the parent even though its body is in the child class.

Here is an example:

```sn
virtual class Hello {
  abstract public func sayHello() : string;
}

class World {
  abstract public func sayHello() : string {
    println!('Hello world!');
  }
}
```

The first difference we can see between these two classes is that the first one is virtual and not the second one. Why? Because, when we declare an abstract method without its body, it can't of course be used from this class - because the program doesn't know what to do. So it can't be instanciated, and because of it it is stated as a virtual class.

The second class declares an abstract method but with a body, this time. That means that any child class will be forced to implement its own version of this method, but the class is still instanciable because we written the method's body in the class. In this case, the class will be able able to use its `sayHello()` method from its own body, and it will use the body of the abstract function if we use `self`, or maybe the body of the re-implemented function in a child class if we use `this`.

Note that abstraction is reserved to methods ; attributes can't be abstracted.

### Final methods

Final methods are simply methods that can't be overwritten in children classes. They are prefixed with the `final` keyword and ensures the behavior will not be changed in any child class.

```sn
open class Mother {
  final public func sayHello () {
    println!('Hello from the mother class!!');
  }
}

class Child extends Mother {
  public func sayHello() { // ERROR (overwritting a final method)
    println!('Hello from the child class!');
  }
}
```

### Structures compatibility

Structures support sub-typing too, but in a very simplier way: any object that fully respects the structure's model is considered as being of the same type. Showcase:

```sn
struct A {
  x: int;
  y: int;
}

struct B {
  x: int;
  y: int;
}

let a: A = A { x: 1, y: 2 };
let b: B = a; // Works fine

b = B { x: 3, y: 4 };
a = b; // Works fine
```

Be aware though, the structure must **perfectly** respected: if a member is described as mutable or as plain, it must be respected.

```sn
struct A {
  x: int;
  mut y: int;
}

let a = A {
  x: 2,
  mut y: 3
};

let b = { x: 2, y: 3 /* 'y' is not mutable */ };

a = b; // ERROR
```

This example results in an error because, while `a` is typed as an `A`, so an `{ x: int, val y: int }`, `b` is typed as an `{ x: int, y: int }` (its `y` member is not forced to be constant). This is why an error happens.

Note that the following declaration would also fail:

```sn
let c: A = {
  x: 2,
  y: 3
};
```

As the object does not respect the constantness of `y`. But, this one works:

```sn
let c: A = A {
  x: 2,
  y: 3
};
```

Writing the structure's name before the opening brace makes an automatic check to fit the structure's exact definition.

### Sub-typing

Sub-typing is a very useful feature simply consisting in the following statement:

Any children class will be accepted if one of its ancestors is required.

To put it clearly: if a function asks for a `Vehicle` and we make a `Motorcycle` child class that inherits from `Vehicle`, the function will accept `Motorcycle` instances as well.

Here is an example:

```sn
open class Vehicle {
  public func accelerate () => println!('Vroom!');
}

class Motorcycle extends Vehicle {
  public func accelerate () => println!('vroom vroom!');
}

func acceleration (vehicle: Vehicle) {
  vehicle.accelerate();
}

acceleration(new Vehicle()); // Prints: 'Vroom!'
acceleration(new Motorcycle()); // Prints: 'Vroom vroom!'
```

As you can see, if you call an overwritten method from the mother type, it will call the child class' method instead (that's why `.accelerate()` doesn't produce the same effect for both `Vehicle` and `Motorcycle` even though they are both considered as a `Vehicle`).

Be aware though: when using a mother type, all members specific to its children classes becomes unavailable:

```sn
open class Vehicle {
  public func accelerate () => println!('Vroom!');
}

class Motorcycle extends Vehicle {
  public func accelerate () => println!('vroom vroom!');
  public func stunt () => println!('Wow!');
}

val motorcycle: Vehicle = new Motorcycle();
motorcycle.stunt(); // ERROR because `stunt` is not part of the `Vehicle` class
```

That may appear to be simple and not very useful at the moment, but as we will see later that's an extremly useful concept. Also, note there is a way to ask for a specific type and not its children, thanks to the `#=T` directive:

```sn
func precise (vehicle: #=Vehicle) {
  vehicle.accelerate();
}

let car        : Vehicle    = new Vehicle();
let motorcycle1: Vehicle    = new Motorcycle();
let motorcycle2: Motorcycle = new Motorcycle();

println!(precise(car));         // Prints: 'Vroom!'
println!(precise(motorcycle1)); // ERROR
println!(precise(motorcycle2)); // ERROR
```

#### Handling the `_this` keyword

The `_this` keyword is a little special. As we previously saw, it refers to the class of the _real instance_. This allows us to force children to implement a method returning an instance of themselves, for example.

As for any abstract method, we can call the methods using this keyword from all values typed as the mother class. For example:

```sn
virtual class Mother {
  public func getThis () : _this => this;
}

class Child extends Mother {
  public func getThis () : _this => this;
}

val obj: Mother = new Child();
a.getThis(); // Works
```

This works fine. Still, can you guess the type of the value returned by our call to `.getThis()`? Well, it returns a `Mother` value. Why?

Because our `obj` entity is typed as a `Mother`, the `_this` keyword in it will refer to `Mother`, as it's not possible to predict the _real type_ it will contain. Maybe it'll be a `Mother`, but maybe it'll be a `Child`, we cannot guess.

Still, our call to `.getThis()` will return a `Child` value 'disguised' in a `Mother` one. We will be able to convert it back by using an _unsafe typecasting_, a concept we'll see later.

Note that, if we had typed our `obj` entity as a `Child`, the return type of our call would have been a `Child`, as `_this` would have refer to the child class.

#### Sub-typing with structures

Structures support sub-typing in a simplier way: any structure that implements every member of another will be considered as its child. Note that, as for compatibility, the mutability and plainess must be respected. Here is an example:

```sn
struct A {
  name: string;
}

class B {
  name: string;
  age: uint;
}

let test: A = B { name: 'Jack', age: 24u }; // Works fine
```

### Safe typecasting

Typecasting allows to convert a value from a given type to another. But typecasting can either be safe or unsafe.

Safe typecasting consists in converting a value from a given type to a value from one of its parent types in the type hierarchy, or from a typecast-capable class.

The first one allows, for example, to convert an `i16` to a `number`, but also to a `Stringifyable`, which is technically one of its parent type in a hierarchy - though it does not _inherit_ from it as it's an interface.

The second one uses the _typecast overload_, which indicates that a class can be typecasted to a specific type. For example, integers are typecast-capable between all of them, meaning an `i16` can be converted to an `u32`, even though they are separate classes.

The high point of safe typecasting is that it is checked at build time: if a conversion is determined as valid by the builder, it could **never** fail at runtime. In the case it is not valid (e.g. trying to convert a `string` to a `i16`), the build fails.

Here is the syntax for safe typecasting:

```sn
let num32: i32 = 2;
let num16: i16 = cast!<i16>(num32);

// With inferred typing:
let num32 = 2;
let num16 = cast!<i16>(num32);
```

There is a shorter syntax we often encountered since the beginning of this book:

```sn
let num32 = 2;
let num16 = <i16> num32;
```

You now know how this 'magic' typecasting work between integers.

#### Numbers implicit upcast

When we give to a function that expects a given type a value of one of its child type, an implicit typecast is performed. This is also why we can give an `i16` where an `i32` is expected, as `i32` is a mother class of `i16`.

The type hierarchy of numbers is the following: `i8` is a child of `i16`, itself child of `i32` which is child of `i64`. Finally, it inherits from `vsint`. On its side, `u8` inherits from `u16`, itself child of `u32` whilch is child of `u64`. Finally, it inherits from `vuint`.

Both `vsint` and `vuint` inherits from `vint`, which itself inherits from `number`. Here is a little schema to summarize this complex inheritance model:

```plain
number
|
|- vint
|
|-- vsint
|--- i64
|---- i32 (int)
|----- i16
|------ i8
|
|-- vuint
|--- u64
|---- u32 (uint)
|----- u16
|------ u8
|
|- vfloat
|--- f64
|---- f32
```

### Typecasting overloads

Typecasting overloads are defined this way:

```sn
  [public|protected|private] func %to<Type> () : Type { /* code */ }
```

Here is an example:

```sn
class HelloWorld {
  public func %to<string> () : string {
    return 'Hello world!';
  }
}
```

We can now typecast any instance of this class:

```sn
// Instanciate the class
let helloWorld = new HelloWorld();

// Typecast it
let str = <string> helloWorld;

println!(str); // Prints: 'Hello world!'
```

There is a variant to perform _automatic_ typecasting. If an `A` example implements an automatic typecasting overload toi `B`, when we give an instance of it where a `B` is expected, the conversion will be performed implicitly, without requiring us to statically typecasting it. Example:

```sn
class A {
  #auto
  public func %to<B> () : B => new B()
}

class B {}

let a: A = new A();
let b: B = <B> a; // Works fine (static typecasting)
let c: B = a; // Works fine (automatic typecasting)
```

Note that some native types implement some automatic typecasting overloads. Here is the list:

* `u8` to `usize` ;
* `u16` to `usize` ;
* `u32` to `usize`

This allows to use some unsigned type numbers as size numbers, without a static typecasting - as we know their capacity will be respected. Also, `u64` isn't in the list because `usize` isn't guaranteed to contain 64 bits, as it will contain only 32 on 32-bit processors.

Automatic typecasting is also used on a well-known type: `Array`. In the native library, `Array<T, SIZE>` is a sub-type of `Array<T>`. That's why we can give an `int[3]` where an `int[]` is expected. But, if you try, you will see that we can also give an `int[]` where an `int[3]` is expected, without any conversion. That's all thanks to automatic typecasting:

```sn
class Array<T> {
  // ...

  #auto
  public func %to<Array<T, SIZE>, T, SIZE: usize> () : Array<T, SIZE>;

  // ...
}
```

This overload is a little bit complex. Its first parameter is the destination type (`Array<T, SIZE>`), but is also takes two other templates: the array's type (`T`), which is automatically inferred, and its size (`SIZE`), which is automatically inferred as well. Finally, with these two templates being automatically inferred, the first one can be inferred too to guess the whole type. Example:

```sn
func test <VALUE: T, T> () {}

test<2> (); // 'T' is inferred as being an 'i32'
test<8p> (); // 'T' is inferred as being a 'usize'
```

### Interfaces

Because understanding the concrete point of interfaces isn't always easy, let's take an example to introduce the concept.

Let's say we have a function that takes two arguments of any type, and add them as integers, then returns the result. In order to perform the addition, the two arguments need to be convertible to integers, of course. So our function will take any argument that implements the `%to<int> ()` overload. But how can we do that?

The first idea would be to make a virtual class called `ConvertibleToInt` with an abstract method called `%to<int> ()`, like this:

```sn
virtual class ConvertibleToInt {
  abstract func %to<int> () : int;
}
```

But that's a very bad idea because all classes would have to inherit from it to be used in our function so it would restrict the accepted type of arguments to the only classes that implement it. Right from the start it excludes all the native types (which doesn't inherit from your own class, of course) plus all the classes you haven't made yourself (which are part of a library, for example) and the classes that already inherits from a class, because a class can't inherit from more than one mothe rclass. Besides, this would be very heavy to write.

So, the solution is to use an interface. An interface is simply a list of functions and attributes a class **must** implement - though it can't write the body of functions. When declaring a class, you explicitly tell what interface(s) it uses, and not implementing any of the interface's members will result in an error.

Also, and that's the great point about interfaces, any class that implements all of its members (with the exact same signature) will be considered as implementing the interface itself. If we use it with sub-typing, you could easily imagine how to solve our problem.

Try to find the solution by yourself, we've what we just saw. Below is the solution:

```sn
interface ConvertibleToInt {
  func %to<int> () : int;
}

func add (left: ConvertibleToInt, right: ConvertibleToInt) : int {
  return int(left) + int(right);
}
```

An important point here is that interfaces can only declare public members ; that's why there is no accessibility keyword before them. Also, because all members are abstract (they must be implemented in every class that implements them), there is no `abstract` keyword before members.

**NOTE :** Writing `int(value)` calls the `int` class as a function with `value` as an argument to convert it to an integer. It accepts any value implementing the `%to<int> ()` value, like our interface.

If we try this code, it works perfectly fine.

We can also declare attributes in interfaces, and even give them a default value, like this:

```sn
interface ConvertibleToInt {
  value: int = 5;

  func %to<int> () : int;
}
```

Note that interfaces are not compatible with structures, which means the following code won't work:

```sn
interface Hero {
  name: string;
}

let jack: Hero = { mut name: 'Jack' }; // ERROR
```

#### Self-references

An interface can use the `_self` type to refers to the class that is implemeting it. Here is an exemple:

```sn
interface Duplication {
  func duplicate () : _self;
}

class Product implements Duplication {
  public readonly name: string;

  public func %construct (name: string) {
    @name = name;
  };

  public func duplicate () : _self {
    return new _self(@name);
  }
}
```

The `_this` type is also available and refers to the real class as a type. Be aware, `_super` is not available.

#### Native typecasting interfaces

Here are some native typecasting interfaces we can use in our programs:

* `BooleanConvertible`: typecastable to a boolean
* `IntegerConvertible`: typecastable to any integer, exposes `%to<u64>` (prefers `u64`) and `%to<i64>` (prefers `i64`)
* `FloatConvertible`: typecastable to any floating-point number, exposes `%to<f64>`
* `NumberConvertible`: typecastable to any number, exposes `%to<u64>`, `%to<i64>` and `%to<f64>`
* `Stringifyable`: typecastable to a string

#### Native manipulation interfaces

* `Clonable`
* `Serializable`
* `Randomizable`: forces to implement the `%random` overload that returns a random element of the current class.

#### Implementing interfaces in a class

To implement an interface in a class, simply use the `implements` keyword like the `inherits` one:

```sn
class Two implements IntegerConvertible {
  public func %to<int> () => 2;
}
```

Even though the class will automatically implement the interface if it respects its signature, it's always more clear to indicate that this class has this implementation in mind. Plus, it avoids to forget to implement any member of the interface (because it would throw an error at build time).

#### The `Any` interface

The smallest interface in SilverNight is `Any`. It allows us to take absolutely any instance of any class as an argument. Here is its full declaration:

```sn
interface Any {
  // Nothing here
}
```

Yes, this interface is empty. Because it is empty, every single class implements it. So every class will match the requirement of implementing the `Any` interface, so we can accept any kind of value with it.

But, because it is empty, we can't use **any** member of the values we get from it. So, how could we ever need it? That's mainly for flexs, like we'll see later. But most of the time, we simply won't use it. Simply remember that if you need to accept any type of value in one of your functions (or variable), this interface exists.

### Long safe typecasting

_'Long'_ safe typecasting is a method that uses a typecast path to convert a value from a type to another. For example, let's say we have the following class:

```sn
class Money {
  public amount = 0u;

  public func %construct (amount: uint) => @amount = amount;
  
  public func %to<u64> () : u64 => @amount;

  public func %to<u32> () : u32 => @amount;

  public func %to<u16> () : u16 => <u16> @amount;
}
```

We instanciate it:

```sn
let money = new Money(1000);
```

And now we want to convert it to a string. The simpliest way we saw to achieve this is to use a cast twice:

```sn
let str = <string> <uint> money; // '1000'
```

We first convert the instance to an `uint`, as it's capable of, and then we turn the `uint` to a `string`, as it's capable of too. But, this syntax is a bit heavy, so we can instead perform a _long safe typecasting_. It basically consists in doing a unique cast. But, for that, we must define a _typecasting path_. In an interface, it has the following syntax:

```sn
interface LongStringifyable {
  typepath string = (u64, i64, u32, i32, u16, i16, u8, i8, bool);
}
```

This indicates that, when the want to perform a long typecast to `string`, we first have to try to typecast the given value to a `string` (which is our destination type), else to an `u64` (the more precise type, which is the more respectful of the value). If we can't, we try the `i64` typecasting, and then the `u32` one, until we reach `bool` (1-bit only, the more lossy type).

Also, the interface accepts all classes that implement either `%to<string>`, `%to<u64>`, ... or `%to<bool>`. But, we won't be able to use any of the overloads described in the path ; only the one the path leads to (here, `string`).

Now, we can perform our long typecasting `<string>` on any `LongStringifyable` value. It goes like this:

```sn
// Declare a 'LongStringifyable' object
let money: LongStringifyable = new Money(1000);

// Long-typecast it
println!(<string> money); // Prints: '1000'
```

Note that we couldn't perform this typecast directly on a `Money` object. If we dealt with such as value, we would have to typecast it first:

```sn
// Declare a 'Money' object
let money: Money = new Money(1000);

// Explicit typecast
let strable = <LongStringifyable> money;
// Implicit typecast
let strable: LongStringifyable = money;

// Long-typecast
println!(<string> strable); // Prints: '1000'
```

A concrete example of using this is when we want to convert any class that can be converted to an integer to a string. This is how the `Stringifyable` interface works. Here is its declaration:

```sn
interface Stringifyable {
  typepath string = (u64, i64, u32, i32, u16, i16, u8, i8, bool, void);
}
```

The `println!` flex uses this interface to display values in the console.

### Extensions

Extensions are functions we add to a class. They are public and cannot access the protected neither the private members of the function ; they also can't overwrite an existing method of the class.

An example of the usefulness of extensions is if we often have to reverse strings. If we want this modification to be available from everywhere and to be usable as a method of the class (like `myString.reverse()`) we need to make a child class. But that's not very convenient and `string` is sealed, so we're blocked.

The solution is to create an _extension_ of the class, which goes like this:

```sn
extension<string> func reverse () : string {
  let reversed = '';

  for i = this.length - 1; i >= 0; i -- {
    reversed += this.charAt(i);
  }

  return reversed;
}

println!('!dlrow olleH'.reverse()); // Prints: 'Hello world!'
```

Note that extensions are available from the original class as well as from its children. Also, they are forbidden on dictionary classes.

### Traits

Traits act like interfaces, expected they need to write the body of the function they declare.

A good example of traits is when you want to inherit from multiple classes. This is absolutely impossible using any way we've seen so far, but there is a 'cheat' that consists in implementing multiple traits. Here is how it goes:

```sn
trait Vehicle {
  val speed: f32;
  func accelerate () : string => 'Vroom !';
}

trait Wheeled {
  val wheels: uint;
}

class Car {
  use Vehicle, Wheeled;
}
```

We can now try it:

```sn
// Sub-typing works fine
let car: Vehicle = new Car();
// Try a function
printlnl!(car.accelerate()); // Prints: 'Vroom!'
```

As you can see, there is no need to re-declare the members in the function. That's the second difference: while interfaces provides a model that needs to be implemented by a class, traits is more to consider like a small library that comes with methods and attributes.

## Templates

Here we are, another important concepts of Object-Oriented Programming: the templates. In many other programming languages, this concept is called **generics** instead of **templates**, but we'll see why later.

Templates are used _implicitly_ a lot. To be exact, you already use them implicitly as arrays and lists use templates. Remember when we talked about `Array` and `List` as _templated_ types? This meant these two classes were taking a class reference, called a _template_, to work - plus an integer for `Array`.

To put it simply, a template is a value the class can used in its signature. For example, if we use a class template, one of our function can tell it will return an instance of the given class - which is of course not possible if the class was an argument of the constructor, for example.

To take an example, let's say we have a structure which associates any value with an identifier, and still allows us to use the members of the value (so `Any` is not a possible way). With what we saw until now, it's impossible. This is where we use templates:

```sn
struct ValueWithID<T> {
  id: int;
  value: T;
}
```

Here, we have a structure, called `ValueWithID`, with two attributes: `id`, which is an integer, and `value`, which is an instance of `T`. Both are constants to ensure they won't change after the structure's creation.

Here, `T` is called the structure's _template_. When a structure is declared with a template, we can't just write `val something: ValueWithID`, but `val something: ValueWithID<SomeClass>`. Then, `T` will simply refer to `SomeClass`, so `value` will need to be an instance of `SomeClass`. Here is an example:

```sn
struct ValueWithID<T> {
  id: int;
  value: T;
}

val test = ValueWithID<string> {
  id: 1,
  value: 'Hello !'
};
```

There's also a feature in SilverNight called _Inferred Templating_, which acts like IST for structures and ICT for callbacks: it _guesses_ the template's type, and can be combined with both IST and ICT. It allows to declare our `test` constant like this:

```sn
val test = ValueWithID {
  id: 1,
  value: 'Hello !'
};
```

That's more simple, right? Now, let's see an application in classes. We will make a class that acts like a dictionary: it will associate a key (of any type) to a value (of any type). Here is how it could look like:

```sn
class KindOfDict<K, V> {
  // The list of keys
  private keys: List<K>;
  // The list of values
  private values: List<V>;

  // Check if a key exists
  public func has (key: K) : bool => @keys.has(key);

  // Associate a value to a key
  public func set (key: K, value: V) {
    // If this key is not already known...
    if ! @has(key) {
      // Create it
      @keys[] = key;
      // Add the new value
      @values[] = value;
    } else {
      // Else, associate the new value to the existing key
      @values[@keys.indexOf(key)] = value;
    }
  }

  // Get a value from a given key
  public func get (key: K) : V {
    // Return the value associated to the key
    return @values[@keys.indexOf(key)];
  }
}
```

Here, we use two templates for our class: `K`, which refers to the keys, and `V` for the values. We can know make a new 'dictionary' like this:

```sn
val myDict: KindOfDict<string, int[3]>;

myDict.set('Key1', [ 2, 5, 7 ]);
myDict.set('Key2', [ 4, 8, 3 ]);

println!(myDict.get('Key1')[0]); // Prints: '2'
```

As you can see, templates can even accept other templated classes.

A final word about template inference: be **really** aware about ambiguities that prevent the code from working. For example, the following code is considered as invalid:

```sn
class KindOfDict<K, V> {
  public func %construct (theFirstKey: K) { /* ... */ }
  public func %construct (theFirstValue: V) { /* ... */ }
}

new KindOfDict(2); // ERROR: Template inference ambiguity
```

This error happens because the builder can't guess what template to infer. Here, `K` could be an `int` and so the first constructor should be called, but it could also be `V` and so the second constructor should be called instead.

Because of the program not being able to decide on the template to infer, an error is thrown because of template ambiguity. Be aware of that!

Another ambiguity problem is when we deal with this kind of code:

```sn
func newValue (value: int) : int {
  return value * 2;
}

func newValue<T extends number> (value: T) : T {
  return value * 4;
}

doubleValue(8); // ERROR: Template inference ambiguity
```

The above code can't be built because of a template inference ambiguity. We saw a moment before the builder chooses the most precise function to call, but in this case they're both precise. So, how to decide on the one we should call?

To avoid an error, we must explicitly tell the templates we want to give to the function. If we want to call the first function, we explicitly tell we don't want any templates to be given (so no template inference will be performed). In the second case, we simply explicitly tell the type of number we are using:

```sn
// Call the first function
newValue<>(8); // Returns: 16

// Call the second function
newValue<int>(8); // Returns: 32
```

The first syntax is called a _void-templating_. This feature is also useful for the resolution keywords, as they refer to their respective classes with all their templates. To get the class without them, suffix them with `<>`:

```sn
class KindOfDict<string, int> {
  // _this   == KindOfDict<string, int>
  // _this<> == KindOfDict
}
```

### Optional templates

Optional templates work the same way than optional arguments for functions:

```sn
struct Data<T = f32> {
  id: int;
  value: T;
}

val test = Data {
  id: 5,
  value: 2.8
}; // Would work fine even without inferred templating
```

### Restricting templates

Because the chosen template is not predictable, we can't instanciate it nor use its methods/attributes. But we may want to interact with the template or its instances, by ensuring it implements some methods or attributes. That's possible, and here is the syntax:

```sn
// Make a structure
struct Data<T implements Stringifyable> {
  value: T;
  stringify: func () : string = () => <string> value;
}

// Make a class that works with the structure
class Working {
  public func %to<string> () => 'It\'s working!';
}

// Make a class that doesn't work with the structure
class NotWorking {
  public func %construct () : _self => println!('It\'s not working!');
}
```

Let's try this code:

```sn
// This works
val workingTest = Data<Working> {
  value: new Working();
};

println!(workingTest.stringify()); // Prints: 'It's working!'

// This doesn't work
val notWorkingTest = Data<NotWorking> {
  value: new NotWorking()
}; // ERROR (`NotWorking` does not implement `Stringifyable`)
```

Here are some examples of constrained templates:

```sn
// Inheritance (class)
T extends SomeClass;

// Reversed inheritance (class)
// `true` if `T` is the given class or one of its parents
T parentof SomeClass;

// Implementation (interface)
T implements SomeInterface;
T implements SomeInterface1, SomeInterface2;

// Implementation (trait)
T uses SomeTrait;
T uses SomeTrait1, SomeTrait2;

// Exclusion (class, interface, trait, ...)
T isnt SomeForbiddenClass;

// A mix
T isnt SomeForbiddenClass extends SomeClass implements SomeInterface uses SomeTrait;
```

Pretty powerful, right? We can use this to make very specialized classes, like this:

```sn
// open class KindOfDict<K, V> { /* ... */ }

class StringDict<K, V implements Stringifyable> extends KindOfDict<K, V> {
  public func stringify(key: T) : string => string(@values[@keys.indexOf(key)]);
}
```

Note that inheritance is a little special with templates: writing `T extends SomeClass` will of course accept all classes inheriting from `SomeClass`, but also `SomeClass` itself. Be aware of that. Writing `T` alone will accept anything.

Also, there is a shortened syntax to mix several type checkings that checks inheritance, implementation, and usage all at a time:

```sn
// open class KindOfDict<K, V> { /* ... */ }

class StringDict<K, V ~ Stringifyable> extends KindOfDict<K, V> {
  public func stringify(key: T) : string => string(@values[@keys.indexOf(key)]);
}
```

Note: the `~` operator allows to check if the type on its left either implements, uses or inherits from the one on its right. It also works on values and then check if they either implement, use or be an instance of the type on its right.

For information, the `T`, `X`, `Y`, `Z`, `K` and `V` names are reserved to templates, so you can use it as you want. Conventionally, `T` is used when there is only one template to use, `T` and `X` for two templates, `T` `X` `Y` for three templates, `T` `X` `Y` `Z` for four templates, and `K` and `V` for keys and values.

#### Type-checking operators on values

Most of the type-checking operators can also be applied on values. Showcase:

```sn
let str = 'Hello';

str instanceof string; // true
str instanceof Primitive; // true
str implements Stringifyable; // true
str uses SomeTrait;
```

The short `~` operator also works there:

```sn
let str = 'Hello';

str ~ string; // true
str ~ Primitive; // true
str ~ Stringifyable; // true
str ~ SomeTrait;
```

### Dynamic return types

Here is a problem we may encounter soon: we have a function, that takes a single argument of any type, do some things with it (like putting it in a list or something) and returns an instance of the exact same type. A first implementation of this idea could be this one:

```sn
func treat (something: Any) : Any {
  // Do some stuff
  return something;
}
```

But we're wrong, because the following code won't work:

```sn
let height = 8;
height = treat(hello); // ERROR
```

An error will be thrown because `height` is typed as an `int` but `treat` returns an instance of `Any`. This is where we block: the function tells it can return absolutely any type of values. To solve this problem, we'll simply use templates with inferred templating:

```sn
func treat<T> (something: T) : T {
  // Do some stuff
  return something;
}

let height = 8;
height = treat(hello); // Works fine
```

This works because when we call the `treat()` function, inferred templating guesses that `T` refers to `int` thanks to `something` being one. So, this function's call will return an `int`.

#### Templates in lambdas

Templates can be used in lambdas using the following syntax:

```sn
let arrayLength = <T> (value: T[]) : void => value.length;

arrayLength([ 3, 5 ]); // Prints: '2'
```

### Templates are instances

In reality, templates are instances of a class. Consider the following code:

```sn
// This line:
func something<T> () : void {}

// Is strictly equivalent to:
func something<T: #pln<Type>> () : void {}
```

We are specifying the template's _type_. Here, `T` is an instance of a plain `Type` value. `Type` is a special class that refers to any valid type a value can take. Still, we can ask our template to be of any type:

```sn
func createEmptyList<T, SIZE: uint> () : T[SIZE] { /* ... */ }

val list1: int[8] = createEmptyList<int, 8>();
val list2: int[]  = createEmptyList<int, 8>();
```

This will work as expected. This is also how the `Array` type work:

```sn
// Writing this:
val list1: int[8];

// Is exactly the same than:
val list1: Array<int, 8>;
```

Also, always remember templates are _constants_: they cannot be modified in any case.

**NOTE :** The fact templates can be of any type is the main reason why they aren't called 'generics', unlike many programming languages.

**NOTE :** In classes, methods are plain functions. This means that the following code:

```sn
class A {
  public func hello () : string {
    println!("Hello world!");
  }
}
```

Is equivalent to:

```sn
class A {
  public pln hello = func () : string {
    println!("Hello world!");
  }
}
```

### Fixed templates

In specific cases like typecasting overloads, it can be useful to have a function working for a fixed template:

```sn
func test <int> () {}

test<int>(); // Works fine
test<string>(); // ERROR
```

When providing the name of an existing type, the templated is considered as _fixed_, which means this specific type must be provided at this place in order to run the function or access the class. Also, this type cannot be inferred ; it has to be written manually.

Still, in order to avoid our template to have the same name than another class in the code and so to result in troubles at build time, we should always specify the template's type (at least when it doesn't use a reserved template name like `T`, which explicitly indicates it's a template). Example:

```sn
func test <SIZE> (); // Not ok (could be a class' name)
func test <SIZE: usize> (); // Ok (no ambiguity)

func test <V> (); // Ok ('V' is a reserved template name)
```

### Segments

Segments are parts of a class that provides some methods only if some conditions are matched about the templates. For example, we can consider the `Vector<T>` class that implements a `.sum()` function if `T` is a `Number`. Here is how it goes:

```sn
class Vector<T> {
  // ...
  segment (T extends number) {
    public func sum () : T { /* ... */ }
  }
}
```

We specify between the parenthesis that follow the `segment` keyword the segment's _condition_. This means the segment will be available **only if** the condition is satisfied.

This also means the condition must be evaluable just by giving the class' templates. For example, `segment (self.data > 2) { /* ... */ }` wouldn't work because we are evaluating a non-predictable data.

Note that segments can also implement an interface or use a trait, as follows:

```sn
class Vector<T> {
  // ...
  segment (T extends number) implements Randomizable {
    public func %random () : T  { /* ... */ }
  }
}
```

It's even possible to override an existing method or attribute in a segment:

```sn
class SomeClass<T> implements Randomizable {
  // ...
  func %random () : T { /* ... */ }
  // ...
  segment (T extends number) {
    func %random () : T { /* other code */ }
  }
}
```

### Templated overloads

It's possible to use templates on overloads, but only if these templates are part of the type of at least one argument of the function. Here are some examples of valid and invalid templated overloads:

```sn
class BankAccount {
  // ...

  // Doesn't work because 'T' cannot be guessed
  public func %plus<T> (left: string, right: int) : int[];

  // Doesn't work because 'T' cannot be guessed
  public func %plus<T> (left: string, right: int) : T;

  // Works fine
  public func %plus<T> (left: T, right: int) : bool;

  // Works fine
  public func %plus<T> (left: string, right: Map<int, T>) : string[];

  // ...
}
```

In more precise terms, if the template cannot be inferred_ the overload's signature will be invalid.

## Dictionaries in depth

Let's see the final part about classes: dictionaries. As you already know, dictionaries link unique keys with values. We will see how they work in this chapter, as well as how to make our own dictionary classes to change the behaviour of dictionaries.

### Dictionary classes

First, what's a dictionary, exactly? A dictionary is any instance of a special class called a _dictionary class_, which provides a way to link keys and values.

#### A deeper view of vectors

The `List` and `Array` classes are in fact dictionary classes. They both inherit* from the `Vector` dictionary class, which associates integers to any type of value. The integers in question cannot be directly manipulated, they are handled by the dictionary class, which keep keys from 0 to any positive integer.

#### How to make dictionary classes

Dictionary classes are defined this way:

```sn
// K = type for keys
// V = type for values
dict Custom<K, V> {
  // Code here
}
```

Dictionary classes have two specificities: first, they need to be defined using the `dict` keyword, which automatically make them implement from the `Dictionary<K, V>` interface. `K` is considered as being the type for the keys and `V` as the type for the values. To change this, it's also possible to manually implement this interface:

```sn
// V = type for keys
// K = type for values
dict Custom<V, K> implements Dictionary<K, V> {
  // Code here
}
```

Secondly, we can use on them several syntax sugars, as we will see later.

The members specified by the `Dictionary` interface are only overloads. These are `%get`, `%set`, `%size`, `%unset`, `%has`, `%keys` and `%values`, which are specific to dictionaries and can't be used in standard classes. All other overloads (like `%clone` or `%random`, even `%construct` and `%free`) can be implemented but are not required.

Let's detail these overloads:

```sn
// K = type for keys
// V = type for values
dict Custom<K, V> {
  // Get a value from a key
  public func %get (key: K) : V;
  // Associate a value to a key
  public func %set (key: K, value: V);
  // Get the number of key/values pairs in the dictionary
  public func %size () : usize;
  // Delete a key (and the value it refers to)
  public func %unset (key: K);
  // Check if a key is known
  public func %has (key: K) : bool;
  // Check if a value is contained in the dictionary
  public func %contains (value: V) : bool;
  // Get an iterator on all keys
  public func %keys () : Iterator<K>;
  // Get an iterator on all values
  public func %values () : Iterator<V>;
}
```

Most of the time, custom dictionaries should inherit from the `Map` class (the same one that is used by the builder when using `#` in a key/value association thanks to IST). The syntax is the same as for classes:

```sn
dict Custom<K, V> extends Map<K, V> {
  // Do some stuff here
}
```

This will inherit all functions that comes with basic dictionaries, like `.filter()` or `.map()`. It will grant access to two protected members, `keys` and `values`, which are lists referring respectively to the dictionary's keys and its values, plus many additional functions and overloads.

Also, because `Map<K, V>` inherits itself from `Dictionary<K, V>`, you won't have to specify this inheritance - `Map` always dit it.

#### Static templates

Sometimes we want to force one of the dictionary's types, like `Vector<T>` do.

Basically, `Vector<T>` inherits from `Map<K, V>` with `K` **always** being a `usize` integer and `V` being `T`:

```sn
open dict Vector<T> extends Map<usize, T> { /* ... */ }
```

### Iterators

The `%keys()` and `%values()` overloads respectively return an `Iterator<K>` and an `Iterator<V>`. It's simply a class that implements a few members, like a `next()` function that returns the next iterated value. To put it simply, iterators can be _iterated_ and at each step they return a new _value_, until they are _done_.

Iterators are defined like this:

```sn
class MySuperIterator<T> extends Iterator<T> {
  // Start a counter
  private counter = 0;

  // Generate a new value
  public func next () : Iteration<T> {
    // Increase the counter
    // If it's lower than 10...
    if ++ @counter < 10 {
      // Return this value
      return { value: @counter, done: false };
    } else {
      // Else, return a null value and tell the iterator is done
      return { value: null, done: true };
    }
  }
}
```

Then, we simply instanciate it and use it like this:

```sn
let iterator = new MySuperIterator<int>;
let iteration: Iteration<int>?;

loop {
  // Get the next value
  iteration = iterator.next();

  // Exit the loop if it's done
  break if iteration.done;

  // Else, print the value
  println!(iteration.value);
}
```

But the syntax of the iterators is really heavy... So, there's a syntax sugar to write iterators as functions:

```sn
iter mySuperIterator () : int {
  for i in 0..10 {
    yield i;
  }
}
```

This code is equivalent to the class we wrote before. We'll, its a lot more simplier here, right? Let's detail this.

The function is marked with the `iter` keyword to indicate it's an iterator, as well as the `func` keyword because it's a function (even if it will be converted to an `Iterator<T>` class). Its signature also tells it returns an iteration. In its body, it simply makes a loop that _yields_ some values. To be exact, each time the `yield` keyword is encountered, the value is returned and the function is _paused_ until the program asks to generate values again. So, all resources locally defined by the function stays in memory.

We can use a loop to explore an iterator's values:

```sn
iter oneAndTwo () : int {
  yield 1;
  yield 2;
}

for i in mySuperIterator {
  println!(i); // Prints: '1' then '2'
}
```

### Exploring dictionaries

#### Dealing with public members

As we saw before, dictionaries associate a key to a value. So, getting any index from the dictionary, like `mydict.someIndex` will return a value. But, what about public members?

For example, the `Map` class implements a `.fill()` function, so we can do `mydict.fill('hello')`. But then, `mydict.fill` doesn't return a value of the dictionary, right?

This problem hopefully has a solution if we want to access any index. In order to be assured to get the value corresponding to the key we have, we simply have to do: `mydict[index]`, where `index` is an instance of `K` (the dictionary's key type). Getting an index between brackets means we're explicitly trying to get an index, not a public member, while `mydict.index` means we are first trying to get a public member if it exists, else to get the value associated to this key. Showcase:

```sn
// Declare a Map<string, int>
let data = { # fill: 2 };

// Dot notation
println!(data.fill); // ERROR (argument is not Stringifyable)

// Dynamic index notation
println!(data['fill']); // Prints: '2'
```

#### Using loops to iterate dictionaries

Loops are our best friends when exploring dictionaries. The most simple way is to use a `for` loop:

```sn
// Explore a dictionary using its keys
for key of myArray {
  println!(key);
}

// Explore a dictionary using its values
for value in myArray {
  println!(key);
}

// Explore a dictionary with both its keys and its values
for key -> value in myArray {
  println!(key, value);
}
```

Asking a dictionary for its keys or values using a `for` loop will call its `%keys()` and/or `%values()` overloads. They then respectively return an `Iterator<K>` and an `Iterator<V>`, remember? The `for in` and `for of` loop acts on these iterators.

In fact, there are three syntaxes for this loop:

```sn
// Simple iteration
for i = 0; i < 10; i ++ { /* ... */ }

// Iterating an iterator
for value in 0..10 { /* ... */ }

// Exploring a dictionary
for key          of dict { /* ... */ }
for value        in dict { /* ... */ }
for key -> value in dict { /* ... */ }
```

As you can see, number ranges produce, in reality, an iterator (of integers, in our case).

The last syntax (`for key -> value in ...`) we used is a syntax sugar, which gets translated to:

```sn
for (key, value) in myArray.iterate() {
```

The `iterate` function, implemented by default in all dictionary classes, returns for a `Dictionary<K, V>` an `Iterator<(K, V)>`.

#### Collections

There is a native type called `Collection<T>`, which is a strict equivalent to `Map<string, T>`. This is, in reality, the one used by IST on extensible objects, as keys must be plain strings in these objects.

So, to recap all syntaxes of dictionaries IST:

* `[ a1, a2 ]` produces a `Array<T>` ;
* `[ # a1, a2 ]` produces a `List<T>` ;
* `{ a1, a2 }` produces a ghost structure ;
* `{ # key: a1 }` produces a `Collection<T>`

### Manipulating dictionaries

Data in dictionaries can be manipulated several ways. The first one is using their overloads:

```sn
let personsAge: { # me: 18 };

// Get a value from a key
personsAge.%get('me'); // Returns: 12

// Associate a value to a key
personsAge.%set('john', 24);

// Get the size of the dictionary
personsAge.%size(); // Returns: 2

// Delete a key(and the value it refers to)
personsAge.%unset('john');

// Check if a key is known
personsAge.%has('john'); // Returns: false

// Check if a value is contained in the dictionary
personsAge.%contains(18); // Returns: true

// Get the array of all keys
personsAge.%keys(); // Returns an Iterator<K>

// Get the array of all values
personsAge.%values(); // Returns an Iterator<V>
```

The other is to use native flexs, keywords and syntax sugars:

```sn
// Get a value from a key
personsAge.me;
personsAge['me'];

// Associate a value to a key
personsAge.john = 24;
personsAge['john'] = 24;

// Get the size of the dictionary
size!(personsAge); // Returns: 2

// Delete a key (and the value it refers to)
delete personsAge.john;
delete personsAge['john'];

// Check if a key is known
'john' keyof personsAge; // Equal to 'false'

// Check if a value is contained in the dictionary
18 in personsAge; // Equal to 'true'

// Get the array of all keys
keys!(personsAge); // Iterator<K>

// Get the array of all values
values!(personsAge); // Iterator<V>
```

### `%contains` for non-dictionaries

The `%contains` overload can be implemented even in non-dictionary classes, like it is in `string`, which allows the following behavior:

```sn
'a' in 'abc'; // Works even though `string`
              // is not a dictionary class
```

## Nullable types

Here is a short chapter to show another of the most useful concepts of the language: the nullable types. These are types that can either be an instance of the class they refer to, or the `null` value, so they provide a way to not initialize an entity or to return nothing from a function.

### An example with points

To take an example, let's imagine we have a function that look for a point with `x` and `y` attributes both equals to zero. It could look like this:

```sn
struct Point {
  x: int;
  y: int;
}

func getNilPoint (array: Point[]) : Point {
  for point in array {
    if point.x == 0 && point.y == 0 {
      return point;
    }
  }
}
```

This works fine. Now, what if we run this code:

```sn
val point: Point = getNilPoint([]);
```

Our program will crash because `getNilPoint` returned a `void` while a `Point` was expected. This is simply due to the fact no point matched the condition in the `for` loop, so the function ended without returning anything (which is equivalent to returning an instance of `void`). So, in order to make this function work anyway, and without returning a whole structure with a `success` boolean or anything ugly, we can use a nullable type:

```sn
func getNilPoint (array: Point[]) : Point? {
```

This allows the function to return a `Point` instance **or** a `void` instance. But, our program will still crash with an error message telling that a `void` cannot be converted to a `Point`. That's simply because we declared our constant with the `Point` type, but we must now tell it can also contain a `void`:

```sn
val point: Point? = getNilPoint();
```

This now works fine. Also, inferred typing can do it automatically, like this:

```sn
val point = getNilPoint();
```

Note that writing:

```sn
val point: Point?;
```

Will, as for a standard type, be understood as this:

```sn
val point: Point? = new Point?();

// Strict equivalent to:
val point: Point? = null;
```

Instanciating a nullable type will return the `null` value by default.

Our example would have worked even with `point` being a `Point` value, if the function hadn't return a `null`. That's only because of that we had to give it the `Point?` type.

### The `null` value

As we saw, the `getNilPoint()` function can now return an instance of `void` (the famous `null` value).

A strict equivalent to the function we saw would be:

```sn
func getNilPoint (array: Point[]) : Point? {
  for point in array {
    if point.x == 0 && point.y == 0 {
      return point;
    }
  }

  return null;
}
```

This would do exactly the same thing. There's also a native value, named `null`, which is an instance of `void`. We can use it, as all instances of `void` are the same:

```sn
func getNilPoint (array: Point[]) : Point? {
  for point in array {
    if point.x == 0 && point.y == 0 {
      return point;
    }
  }

  return null;
}
```

The function still works as expected. In fact, `null` is defined natively with the following statement:

```sn
val null = new void();
```

Be aware though, using inferred typing with `null` could result in the following behavior:

```sn
let point = null;
point = getNilPoint([]); // ERROR
```

This will result in an error because inferred typing gave the `void` type to `point`, so it can't receive a `Point?` value. Replace this code with:

```sn
let point = new Point?();
// Or:
let point: Point?;

point = getNilPoint([]); // Works fine
```

Now we've seen all this, let's try our function:

```sn
val point1 = getNilPoint([ { name: 'Test point', x: 0, y: 0 } ]);
println!(point1.name); // Prints: 'Test point'

val point2 = getNilPoint([]);
println!(point2.name); // ERROR
```

The second call to `getNilPoint()` makes our program crash. Why? Simply because `point2` is a `void` instance, so it has no `name` member. We have to check first if our constant contains a `null` value or not, thanks to the equality operator `==` or the difference operator `!=`. This can be done thanks to the fact two instances of the same class can be compared with these two operators (we'll see that in details in the pointers chapter). So we can write:

```sn
val point = getNilPoint([]);

if point == null {
  println!('No point found.');
} else {
  println!(`A point was found: ${point.name}`);
}
```

Note that we can still use some native operators like `!` or `point ? doSomething() : doSomethingElse()` on our constant, as they don't care about the value's type - only if it's NIL or not.

### The nullable operator

Here is an operator we can use to do something only if the value is not null. Here is an example:

```sn
val point = getNilPoint([]);
println!(point?.name);
```

Here, because `point` is null, the program won't try to access its `name` field thanks to the `?` operator. Instead, it will return a `void`, so the return type of the expression, whatever `name` is null or not, will be `string?`. This operator avoids crashes when accessing a value's attribute, and will always return null if the value it is applied on (the value on its left) is `null` - not NIL, it won't have this behavior with `false` or `0`, for instance.

```sn
// Make a 'Hero' structure
struct Hero {
  name: string;
  hp: int;
  attack: int;
}

// Make a 'Data' structure
struct Data {
  id: int;
  hero: Hero?;
}

// Make a nullable constant
val someData: Data? = null;

// Get the hero object
val dataHero = someData?.hero; // dataHero == null

// Prints the hero's name
println!(dataHero?.name); // Prints: '' (stringified 'null' value)
```

What happened here? Well, doing `data?.hero` returned `null` because `data` was null. Then, doing `dataHero?.name` also returned a `void` because `dataHero` was null. So the final expression between the `println!`'s parenthesis is a `string?` which is equal to `null`.

### Automatic conversion

Let's take an example for this one: we have a function that takes a `string` as an argument, but we want to use on it a constant that was declared as a `string?`. Because the function may not be able to handle the `null` value, this should result in an error.

But there's a specific typecasting for nullable types. When giving a nullable type where a standard type is expected, it is automatically cast into the standard type, and an error will be thrown if the value was `null`. Let's take an example:

```sn
func inc (num: int) : int => num + 1;

val one: int = 1;
val two = inc(one); // Returns: 2

val three: int? = 3;
val four = inc(three); // Returns: 4

val nothing: int? = null;
val result = inc(nothing); // ERROR
```

Note that `two` and `four` automatically gets the `int` type, which is `inc`'s return type, not `int?`.

The last call to `inc` fails because a `null` value was gave, so the typecasting to an `int` failed.

### Nullables typecasting

There is a flex to turn a nullable value into a standard value without any assignment, which is `strict!`, and another to turn a standard value into a nullable value still without any assignment, which is `nullable!`. Here is how they go:

```sn
val standard: int = 1;
val nullable: int? = 2;

val one = nullable!(standard) + 3;
val two = strict!(nullable) + 3;
```

Now, `one` has the nullable type `int?` and `two` has the standard `int` type.

### Really optional arguments

We previously saw how to make optional arguments in functions thanks to a default value. But now let's see how to make _really_ optional arguments using nullable types:

```sn
func sayHello (name: string, age?: int) {
  println!(`Hello ${name}` + (age == null ? '!' : `, you are ${age} year-old.`));
}

println!('Jack'); // Prints: 'Hello Jack!'
println!('John', 28); // Prints: 'Hello John, you are 28 year-old.'
```

Note that the `?` symbol has been put after the argument's name, and not after its type. If you had written `age: int?`, the argument wouldn't have been optional, but it would have accepted the `null` value.

Here, `age` is an `int?` that can also be omitted (in this case it is equal to `null`). That's as simple as that.

### Nullable members

The same applies for structures: while we can provide a default value for structures' members, we can also make really optional members:

```sn
struct Hero {
  name: string;
  age?: int
}

val jack = Hero { name: 'Jack' };

println!(jack.name == 'Jack'); // Prints: 'true'
println!(jack.age == null) // Prints: 'true'
```

### The null-checker operator

Another useful operator when dealing with nullable types is the `??` operator. How does it work? Well, that's really simple: let's imagine we have an entity with a nullable type, and that we want to use a value _only if_ the entity contains `null`. Here is a first idea:

```sn
val a: int? = 0;
val b: int? = null;

println!(a || 1); // Prints: '1'
println!(b || 1); // Prints: '1'
```

But, as you can see, it even uses 1 when the entity is equal to 0, because, when converted to a boolean, 0 is equal to `false`, so the second member is used. The same applies for `null`, which is converted to `false` too.

So, the way to solve this problem without using a heavy ternary condition is to use the `??` operator:

```sn
val a: int? = 0;
val b: int? = null;

println!(a ?? 1); // Prints: '0'
println!(b ?? 1); // Prints: '1'
```

Or more technically:

```sn
0    || 1; // 1
null || 1; // 1
0    ?? 1; // 0
null ?? 1  // 1
```

Note that the value specified on the right of the operator must be of the same type than the value on its left. So here, it must be an `int?` (meaning it can be an `int` or a `void` too).

### A concrete example

A concrete example of nullable types usage: the problem of array initialization.

Here is the program we want to make:

1. Create a virtual `Vehicle` class representing a vehicle
2. Creating two sealed classes `Car` and `Motorcycle`, both inheriting from `Vehicle`
3. Declare an array of `Vehicle` instances with 1000 cells.
4. Fill the the array with randomly `Car`s and `Motorcycle`s

The problem is: if we simply declare the array with `let` or `val`, we will create a `Vehicle[1000]` instance that will be filled with vehicles later. So this will generate 1000 instances of the `Vehicle` class at the same time the array is declared, and then we will make again 1000 instances in our `if` block. Performances are so divided by 2.

In order to avoid this problem, we can declare the array using an optional type. When the resource is declared, only an array instance is created, and we will only instanciate the vehicles in our conditional block, so 'only' 1000 instances of `Vehicle` will be created, instead of 2000 with the previous method - this near to doubles the performances.

Here is how it works:

```sn
// Declare an array of 1000 instances of 'Vehicle?'
// Which is equivalent to getting 1000 'null' values (no instanciation)
let array: Vehicle?[1000];

for i in 0..1000 {
  array[i] = rand!<bool> ? new Car() : new Motorcycle();
}
```

But, because it's always preferable to avoid using nullable types as they can cause errors if not manipulated correctly, and because the code above is not optimized, we should write this one instead:

```sn
val array = (rand!<bool> ? new Car() : new Motorcycle() for i in 0..1000);
```

Even though this code is not pretty, it's more optimized and avoid using a nullable type. Plus, our `array` resource is now a constant instead of being a mutable. Always think of other solutions when dealing with nullable types, to avoid getting errors due to the value being `null`.

### Constructable attributes

Because attributes are instantly instanciated in classes, some require to be nullable to avoid errors. Example:

```sn
class Container<T> {
  public value: T;

  public func %construct (value: T) => @value = value;
}

class ComplexClass {
  public readonly name: string;

  public func %construct (name: string) => @name = name;
}

let cmp = new ComplexClass('John');
let var = new Container<ComplexClass>(cmp); // ERROR
```

An error is thrown when we instanciate `Container<ComplexClass>`, because `ComplexClass` cannot be instanciated without any argument. Its only constructor **requires** a string and so this code doesn't work.

A solution could be to make the `value` attribute nullable:

```sn
class Container<T> {
  public value: T?;

  public func %construct (value: T) => @value = value;
}

class ComplexClass {
  public readonly name: string;

  public func %construct (name: string) => @name = name;
}

let cmp = new ComplexClass('John');
let var = new Container<ComplexClass>(cmp); // Works fine
```

But that's a bad practice, as the `null` value could be assigned to the attribute anywhere. Plus, it forces the program to typecast the attribute when we want to assign it to a `T` entity, for example.

So, the solution is to use the `#future` directive, which makes the attribute nullable _until_ the end of the constructor. This means that, from the instanciation to the end of the constructor, it will have the `T?` type, and then constructor ends it will be a `T`.

Of course, we must then be aware to not assign a value to the attribute, else an `NullFutureAttributeError` error will be thrown at the end of the constructor.

```sn
class Container<T> {
  #future
  public value: T;

  public func %construct (value: T) => @value = value;
}

class ComplexClass {
  public readonly name: string;

  public func %construct (name: string) => @name = name;
}

let cmp = new ComplexClass('John');
let var = new Container<ComplexClass>(cmp); // Works fine
```

## Errors

In the language, behaviours that can't natively be handled throw errors. For instance, dividing a number by zero will throw an error because the program doesn't know how to handle it - we can't let the division return a `0` for instance, as it's an incorrect value. And, if we don't do anything, such errors make the program crash.

Here is a chapter to understand how errors are thrown, work and can be handled to avoid these crashes.

### How errors are thrown

Throwing an error consists in throwing an _instance_ of an error class, which is simply a child class of the native `Error` class, or an instance of `Error` itself. After instanciating it, the error is thrown using the `throw` keyword, like this:

```sn
throw new Error('Something bad happened.');
```

The `throw` keyword indicates we want to throw as an error the value put on its right. So the instance we use here is the error we want to throw. If we write the code above in a program, it will crash with the error message we have specified.

Here is the signature of the `Error` class (and the structure it uses):

```sn
struct ErrorStep {
  val file: string;
  val line: int;
  val function: int;
  val column: int;
}

class Error {
  public readonly message: string;
  public readonly traceback: ErrorStep[];

  public func %construct (message: string, traceback: ErrorStep[]);
  public func %to<string> ();
}
```

As you can see, an error instance has a `message` attribute that is the message we give to it when we instanciate the class, and a `traceback` attribute which is a trace of all functions that were ran until the error. Here is an example:

```sn
func a () throws Error {
  b();
}

func b () throws Error {
  c();
}

func c () throws Error {
  throw new Error('Test');
}
```

Note that functions must always declare the type of error they may throw using the `throws` keyword. Errors thrown by superoverloads are excluded - doing a division doesn't require us to dedclare an `DivisionByZeroError` throw in the function's signature ; as well as _native errors_ (which inherits from `RuntimeError`) that are triggered automatically by the program like `OutOfMemoryError`.

As `c` throws an error automatically, it indicates it in its declaration. But then, because `b` calls `c`, it may throw the same error. And that's also the case for `a`, which calls `b` that indicates it may throw an error.

If the function may throw several types of errors, we indicate them all separated by a comma:

```sn
func c () : throws A, B {
  if rand!<bool> {
    throw new A('Hello !');
  } else {
    throw new B('Goodbye !');
  }
}
```

Also, we can throw as many errors as we want in the main scope.

If we call the `a` function at the end of the file, named `src.sn`, an error will appear at build time because we don't _catch_ the error ; we will see that soon. But if we did, `traceback`'s content would be:

```sn
[
  ErrorStep {
    file: 'src.sn',
    line: 3,
    column: 20,
    function: 'global.c'
  },

  ErrorStep {
    file: 'src.sn',
    line: 2,
    column: 20,
    function: 'global.b'
  },

  ErrorStep {
    file: 'src.sn',
    line: 1,
    column: 20,
    function: 'global.a'
  },

  ErrorStep {
    file: 'src.sn',
    line: 5,
    column: 1,
    function: 'global.main'
  }
]
```

The `global` object refers to resources that are defined in a global context, which means they aren't defined inside a class for example. The `line` and `column` values refer to the location where the current `function` called another one. For the last function, it refers to the location of the `throw` keyword that thrown this error.

### How to handle errors

Errors can either be automatically thrown (e.g. when dividing by 0) or manually (thanks to the `throw` keyword). But errors does not only aim to make the program crash when something goes wrong ; it also provides a way to understand that something hasn't worked as expected and do something in consequence.

For exampe, we could imagine using a function to read a file in a notepad application. Reading the file could fail because of numerous reasons (file does not exist, error while reading the disk, invalid files table, etc.). Still, we don't want our program to stop just because the reading failed - instead, we'll show an error message telling what happened.

The same thing applies if we do a division, we want to be able handle division errors. In this example:

```sn
func divide (left: int, right: int) : f32 {
  return (<f32> left) / right;
}

divide(2, 5); // Returns: 0.4
divide(2, 0); // ERROR
```

We didn't catch the error, and so the program crashed.

To catch errors, we use a couple of blocks named `try` and `catch`. In the first one, which has no block head, we put the code that _could_ throw an error. In the second one, which takes a single parameter (the error which _could_ have been thrown) we put a code that is ran only if an error was thrown. If no error occured, this code will simply be ignored. Here is how it goes:

```sn
try {
  divide(2, 0);
} catch (e: Error) {
  println!('Division failed');
}
```

In this example, a message is displayed because an error has been automatically thrown when `divide` attempted to divide two by zero. But the program doesn't crash.

The great point of `try` and `catch` blocks is that the error is _caught_ by the second block, so our program won't crash.

We can also use the `catch` block's argument to get additional informations about the error, like its message or traceback.

There is also a third block called `finally`, which goes just after the `catch` block and executes whatever happens in the `try`/`catch` block.

This block matters because we can for example clear the `try`'s data after it is fully ran even though the `catch` block contains a `return` instruction or something:

```sn
func test () {
  try {
    println!('Hello from the try block.');
    someInvalidCall();
  }

  catch (e: Error) {
    println!('Hello from the catch block.');
    return ;
  }

  println!('Hello from the end of the function.');
}
```

If we run the code above and call the `test` function, the last `println!` won't show, because our `catch` block did exit the function. So, if we had some data from the test, we couldn't clear them.

```sn
func test () {
  try {
    println!('Hello from the try block.');
    someInvalidCall();
  }

  catch (e: Error) {
    println!('Hello from the catch block.');
    return ;
  }

  finally {
    println!('Hello from the finally block.');
  }
}
```

In this example though, the last `println!` call is ran because the `finally` block is executed no matter what. This way, it's possible to clear some data (like entities) used by the `try` block (or even the `catch` one).

Note that, when we call a function which indicates it may throw an error, we must either wrap the call inside a `try`/`catch` block (which is the best thing to do) or indicates the function we are calling the function from may also throw the same error type - in this case, if an error is thrown during the call, it will immediatly stop our function's execution too. That's exactly what we did in our first `a`/`b`/`c` example previously.

Also, if we call a function that may throw an error inside the main scope, we must wrap the call between a `try`/`catch` block, as we cannot indicate the main scope may throw an error itself.

### Sub-typing with errors

As `catch` blocks ask for an error type, they support sub-typing. There are several native error classes, like `DivisionByZeroError` or `OutOfMemoryError` (which occurs when the memory is filled). So, if we want to catch only some type of errors, we can use sub-typing in the `catch`, like this:

```sn
try {
  divide(2, 0);
}

catch (e: OutOfMemoryError) {
  println!('Program is out of memory.');
}
```

We can also chain multiple `catch` blocks, to catch distinctly several types of error.

```sn
try {
  divide(2, 0);
}

catch (e: OutOfMemoryError) {
  println!('Program is out of memory.');
}

catch (e: DivisionByZeroError) {
  println!('Division failed because we can\'t divide by zero.');
}
```

Thanks to sub-typing (again), we can also use a final `catch` block that will catch absolutely any type of error:

```sn
try {
  divide(2, 0);
}

catch (e: OutOfMemoryError) {
  println!('Program is out of memory.');
}

catch (e: DivisionByZeroError) {
  println!('Division failed because we can\'t divide by zero.');
}

catch (e: Error) {
  println!('An unknown error occured. Here is its message:');
  println!(e.message);
}
```

Also, thanks to inferred typing, if we give no type to the block's argument, it will automatically be considered as an `Error`:

```sn
try {
  divide(2, 0);
}

catch (e) {
  println!('Some error occured. Here is its message:');
  println!(e.message);
}
```

A last version of this syntax is if we don't care about getting the error object. In this case, we can simply omit the block's head:

```sn
try {
  divide(2, 0);
}

catch {
  println!('Some error occured.');
}
```

### Making custom errors

Throwing custom errors simply consists in throwing an instance of a child class of `Error`. This allows us to make a distinction between native error types and our own ones. Here is an exemple:

```sn
func divide (left: int, right: int) : f32 throws CustomError {
  if right == 0 {
    throw new CustomError('Cannot divide by zero.');
  }

  return f32(left) / right;
}
```

The `CustomError` class could look like this:

```sn
class CustomError extends Error {
  // Make a constructor
  public func %construct (message: string, traceback: ErrorStep[]) {
    // Call the parent constructor
    super.%construct(message, traceback);
  }

  // A sample function
  public func why () : string {
    return 'This is a custom error class';
  }
}
```

We can now use our custom error class:

```sn
try {
  divide(5, 0);
}

catch (e: CustomError) {
  println!(e.why()); // Prints: 'This is a custom error class'
}
```

Here, `CustomError` can be caught apart from other errors like `OutOfMemoryError`. Still, it inherits from `Error`, so catching with `catch (e: Error) {` will catch this error too.

### Inline catching

These blocks are quite useful, but they can be heavy to write. Like `for` and `while` loops, there is an _inline_ version of the `try` and `catch` blocks. The value expressed in the `try` block is automatically returned by the block - if no error is thrown in it, of course. It goes like this:

```sn
val result = try { divide(5, 0); } catch (e: CustomError) { println!(e.why()); };

val result = try { divide(5, 0); }
             catch (e: CustomError) {
               println!(e.why());
             }
```

But be aware here. Because the `catch` block does not return anything, the return value could be nothing. In this case, the `null` value is returned, which makes the return data either the specified type (here, `f32`) or a `void`. See the problem? This makes our return value having a _nullable type_, so `result` will be typed as a `f32?` instead of a `f32`. Remember this, else this could lead to unexpected behaviours when using these inline blocks.

Note that type inferring works here because the `try` block is followed by a **single** instruction. So, its return type is fixed and can be guessed ; it wouldn't work with a `try` containing several instructions - that's why we can't do an assignment from a multiple-instructions `try` block.

Except this point, this will work as expected. If you don't care about getting an error object, you can omit the `catch` block's head:

```sn
val result = try { divide(5, 0); } catch { println!(e.why()); };
```

Note that this last block can also return a value. Thanks to this, if an error occurs, it is still possible to return an alternative value:

```sn
val result = try { divide(5, 0); } catch { -1f; }

// With a callback (to run several instructions)
val result = try { divide(5, 0); } catch () : f32 => {
  println!(e.why());
  return 0f;
};
```

The second syntax is a little heavier as it uses a callback which cannot have an inferred return type. These two syntaxes also fix the type of `result`. It won't be a `f32?` anymore but a strict `f32` because in all cases it receives a floating-point number.

Note that, if the `catch` block returns a different type than `try`'s one, it won't throw an error but use an _union type_, a concept we'll deal with later.

## Pointers

### The Object Identifier

In SilverNight, each object (expecting primitives) has a unique identifier associated to it, called the OID (Object Identifier), which is unique. This means that when we do a `new SomeClass()` or create an object from a structure (ghost or not), an invisible identifier is put on it. We cannot access it ourselves, but it allows the program to compare if two objects are equal, by comparing their OID.

The native `is_same!` flex compares two objects (it doesn't work with primitives) and tells if they are identical by comparing their OID. Of course, this could not be done manually because we can't access the OID, but this is a native flex so the builder understands it.

One of the key-concepts of SilverNight is the OESM (Object-Entity Sharing Model) that shares equal objects across entities. To take an example, when an object is gave to a function, the object is not cloned automatically, so it keeps the same OID. That's why modifying an object given as an argument inside a function will also modify the original one.

Primitives don't have this problem, has they are very special classes. When a primitive is gave to a function or assigned to another resource, it is automatically be cloned - and there's no way to prevent it.

Pointers aim to provide a new way to deal with OESM. Let's take the following code:

```sn
// Make a 'Hero' structure
struct Hero {
  name: string;
  mut attack: int;
}

// Make a function that changes a single field of the object
func changeProperty (obj: Hero) {
  obj.attack = 20;
}

// Make a function
func assignSomethingNew (obj: Hero) {
  obj = {
    name: 'John',
    mut attack: 50
  };
}

// Create a 'Hero' object
val hero = {
  name: 'Jack',
  mut attack: 10
};

// Test the two functions
changeProperty(hero);
assignSomethingNew(hero);

// Show the result
println!(hero.name); // Prints: 'Jack'
println!(hero.attack); // 20
```

So, what happens here? After creating a `hero` object, we send it to the `changeProperty` function. But technically, only a link to `hero` was sent to the function, which was assigned to its `obj` argument. This way, when the function changed one of the `obj`'s properties, it also changed `hero`'s one, because they are exactly the same object.

In the second function, `assignSomethingNew`, another link to `hero` is sent and assigned to `obj`. But no changes is made to the original `hero`. Why? Because, while the two entities share the same _OID_, they are still two separate entities. So assigning something new to `obj` grants it a new OID that replaces the previous one (note that, if we assigned a primitive to it, it wouldn't have an OID at all).

But what if we wanted to make the whole `hero` object change within a function? Well, for that, we use _references_.

#### The tuples case

Note that, as tuples are primitives, their respective content is fully copied when being assigned to another entity for example:

```sn
let tupleA = ( 'A' );
let tupleB = tupleA;

tupleB[0] = 'B';

println!(tupleA[0]); // Prints: 'A'
println!(tupleB[0]); // Prints: 'B'
```

This is why tuples can be used in plain constants, at the opposite of objects.

This behavior is also why primitives are immutables: each time we manipulate a primitive, it is cloned to avoid being modified. That's why writing `2 + 1` doesn't modify a `2` value, but creates a whole new number, `3`, that is the result of the addition.

### References and pointers

While entities simply share a OID referring to a specific object in the memory, pointers share an EID, which stands for Entity Identifier - unique like the OID. The difference between an OID and an EID is that a OID simply refers to an object, while an EID refers to an entity - including entities containing primitives.

If we take the following entity:

```sn
let person = { name: 'Jack' };
```

The OID refers to `{ name: 'Jack' }`, while the EID refers to `person`. That's the difference.

By default, each entity has its own EID. References are based on it: they provide a way to create a value that points to the EID of an existing entity. To create one, we use the `&` symbol followed by the entity's name, which returns a _reference_ pointing to the provided entity.

To create a reference, we first need an entity. We won't use inferred typing to make the examples more clear:

```sn
// Declare a sample entity
let str: string = 'Hello !';
```

Then, we can make a reference from it using `&str`, and a pointer by assigning it to another entity:

```sn
// Create a reference
// Then assign it to a pointer
let ptr: *string = &str;
```

Note the `*` symbol before the type: it indicates that `ptr` is a _pointer entity_, which means it can (and must) contain a reference.

By using the `&` symbol immediatly followed by the entity's name, we create a **constant** reference, meaning we can't change the value of `str` by using this reference.

We can now print the value of `str`. But we have to use a special syntax for that: when we write `ptr`, we get the pointer's value, which is a reference. The problem is we don't want to display the reference itself, but the reference's value.

To display the reference's value, we have to use the `*` symbol before the reference we want to get the value of. In our case, because it's stored in `ptr`, we write `*ptr`. This is called a _depointerization_. In fact, when we write `*ptr`, it is an equivalent to writing `*(&str)` here, because the pointer is simply made of a value (which is a reference), and the `*` symbol works on values (references), and on entities _by extension_. This means it would be fine to write `println!(*(&str));`.

We can now print the value of `str` by only using the reference stored in `ptr` (`str` is then called the _referred_):

```sn
// Display the pointer's value
println!(*ptr); // Prints: 'Hello !'
```

Writing `*ptr` indicates we are getting the entity pointed by the reference stored in `ptr`, which is `str` here.

If we change `str`'s value:

```sn
// Change the referred's value
str = 'Goodbye !';
```

The value of `*ptr`, as it points on `str`, will be affected too:

```sn
// The changes are reflected on the pointer
println!(*ptr); // Prints: 'Goodbye !'
```

Note that, because our reference is constant, we can't write `str` by using `*ptr`:

```sn
*ptr = 'Hello !'; // ERROR (constant reference is not writable)
```

But sometimes, we simply want to get a pointer we can write to change the referred's value. For that, we use the `&mut` symbol, still followed by the referred's name:

```sn
// Declare a variable
let hero: string = 'Jack';

// Create a *mutable* pointer to it
let ptr: *mut string = &mut hero;

// Assign a new value to the pointer
*ptr = 'John';

// The changes are reflected on the referred
println!(hero); // Prints: 'John'
```

In this example, because the reference is mutable, we can write the referred's value, still by using the `*` symbol.

Note that references work on entities, which includes an object's field or a class' member:

```sn
let hero = {
  name: 'Jack',
  attack: 20
};

let ptr: *mut = &mut (hero.name);
*ptr = 'John';

println!(hero.name); // Prints: 'John'
```

The syntax is as follows:

```sn
&object.field;   // Make a pointer to `object` and get `field` from it
&(object).field; // Make a pointer to `object` and get `field` from it
(&object).field; // Make a pointer to `object` and get `field` from it
&(object.field); // Make a pointer to `object.field`

&mut object.field;   // Make a pointer to `object` and get `field` from it
&mut (object).field; // Make a pointer to `object` and get `field` from it
(&mut object).field; // Make a pointer to `object` and get `field` from it
&mut (object.field); // Make a pointer to `object.field`
```

A specificity about references is that they can only be half-type-inferred. This means that their type (e.g. `int`, `string`...) can be type-infered, but not their pointer nature (e.g. `&mut`, ...), so this last one have to be written explicitly:

```sn
let i = 1;

// Explicit
let ptr1: *int = &i;
// Implicit
let ptr1: * = &i;

// Explicit
let ptr2: *mut int = &i;
// Implicit
let ptr2: *mut = &i;
```

This allows to keep the code clear about what assignable entity is a pointer or not. An exception, though, is for properties: we can assign a pointer to a flying structure without specifying it's a pointer.

Here is a recap of the terminology:

* A _reference_ refers to an entity called the _referred_. It can either be mutable (`&mut`), which means we can set the value of the entity if refers to, or constant (`&`), so we can only read it.
* A _pointer_ is an entity (variable or constant) containing a pointer.

### References on values

It is also possible to create references from simple values. For that, we can use the `wrap!` flex, which creates an entity containing the value we give to it and allows us to make a reference from this entity:

```sn
// Create a constant pointer
let ptr1: * = & wrap!(2);

// Create a mutable pointer
let ptr2: *mut = &mut wrap!(2);
```

These flexs create a new assignable entity (variable or constant) and return a reference to it so we can read and eventually write it.

### Type compatibility

Type compatibility is simple with pointers: mutable pointers can be used as constant pointers, but constants pointers cannot be used as mutables - which is logic, because we want to be able to write the referred's value. Here is an example:

```sn
let i = 1;

let ptr1: *mut = &mut i;
let ptr2: * = &i;

let mut_ptr: *mut = ptr1; // Works fine
let mut_ptr: *mut = ptr2; // ERROR (incompatible types)
let val_ptr: *    = ptr1; // Works fine
let val_ptr: *    = ptr2; // Works fine
```

To be exact, when a mutable pointer is found where a constant pointer is expected, it is automatically cast.

This behavior makes that, if we want to make a function that takes both constant pointers and mutable pointers, we simply have to make a function that accepts constant ones - mutable pointers will be automatically typecasted:

```sn
func printPointer (ptr: *int) : void {
  println!(*ptr);
}

val n = 2;

printPointer(& n); // Prints: '2'
printPointer(&mut n); // Prints: '2'
```

### Pointers typecasting

Note that safe typecasting works between equivalent pointers: it's possible to convert an `*i16` to an `*i32` or an `*mut i16` to an `*mut i32`:

```sn
<*i16> & wrap!(2s);
<*mut i16> &mut wrap!(2s);
```

### Pointers in functions

First of all, by langage abuse, we often say that a function requires a pointer where it asks for a reference. Technically, a function **cannot** ask for a pointer because a pointer is an entity and a function cannot ask for entities but only for values, so it can ask for references but not for pointers. When you read that a function asks for a pointer, it's in reality a reference - but the argument, as being an entity itself, will be a pointer whatever.

So, references can be used to manipulate data in functions:

```sn
func increment (counter: *mut int) => *counter += 1;

let counter = 0;
increment(&mut counter);
println!(counter); // Prints: '1'
```

Functions can also return references, of course:

```sn
func increment (counter: *int) : *int => & wrap!(*counter + 1);

let ptr: * = increment(& wrap!(0));

println!(*ptr); // Prints: '1'
```

This example is a little bit complex. First, we define a function that takes a reference, and returns another. In its body, it creates a reference from the value of its argument, and adds 1 to it (without assigning anything). Then, it returns the new reference by transparently creating a new assignable entity containing this value and returning a reference to it. So `ptr` receives a new reference.

Of course, the function could also have returned a simple number, without making a pointer from it, but it would then have been needed to make turn this integer into a pointer in order to assign it to `ptr`.

Also, be aware of depointerization: when a function asks for an `int` for example, it won't accept an `*int`!

```sn
// Make an addition function
func add (left: int, right: int) : int {
  return left + right;
}

// Declare two numbers
val i = 1;
val j = 2;

// Make two constant references and pointers to them
val i_ptr: * = &i;
val j_ptr: * = &j;

// Try them out

// Works fine
add (i, j); // Returns: 7

// 'left' must be an 'int' not an '*int'
add (i_ptr, j); // ERROR

// 'right' must be an 'int' not an '*int'
add (i, j_ptr); // ERROR

// 'left' and 'right' must be of type 'int', not '*int'
add (i_ptr, j_ptr); // ERROR

// Works fine
add (*i_ptr, j); // Returns: 7

// Works fine
add (i, *j_ptr); // Returns: 7

// Works fine
add (*i_ptr, *j_ptr); // Returns: 7
```

### Reassigning pointers

A pointer can be reassigned to a new entity easily:

```sn
// Make two simple integers
let i = 0;
let j = 0;

// Make a pointer from it
let ptr: *mut = &mut i;

// Assign a new value to the pointer (its target remains the same)
*ptr = 8;
println!(i); // Prints: '8'
println!(j); // Prints: '0'

// Assign a new reference to the pointer
ptr = &mut j;

// Assign a new value to the pointer
*ptr = 3;
println!(i); // Prints: '8'
println!(j); // Prints: '3'
```

Commonly, the _pointer's referred_ is the entity pointed by the reference stored in the pointer, and the _pointer's value_ is the value of the referred.

### Impact on scope dropping

When a reference is created on an entity, the entity will not be dropped until the reference is dropped too. So, if the reference is created and isn't in use by another scope, the value will be dropped at the end of the scope it belongs to. But, if a reference is created and is in use in another scope at the end of the current scope, the entity will not be dropped as a reference still targets it.

Here is an example to clarify this behaviour:

```sn
let ptr: *mut = &mut wrap!(0);

{
  let i = 2;
  ptr = &i;
} // 'i' is not dropped here as there is still a pointer referencing it

println!(ptr); // Prints: '2'

free!(ptr); // 'i' is dropped here
            // because there are no reference to it anymore
```

### Checking a pointer

It is possible to check if an entity is a pointer, thanks to the `is_ptr!` flex:

```sn
let i = 0;
let ptr: * = &i;

println!(is_ptr!(i)); // Prints: 'false'
println!(is_ptr!(ptr)); // Prints: 'true'
```

The target of a pointer can also be checked using the equality operator, thanks to the fact a pointer and its referer always have the same EID:

```sn
let i = 0;
let j = 0;

let ptr: * = &i;

println!(ptr == &i); // Prints: 'true'
println!(ptr == &j); // Prints: 'false'
println!(*ptr == 0); // Prints: 'true'
```

### Reference's state

Like any entities, pointers have a state (mutable or constant), though it is not related to the state of their reference.

For example, the pointer itself can either be mutable, which means we can change its reference and so its target, or constant, to make its reference immutable. Still, the reference it contains can either be mutable or a constant. And, though in the first case the referred must be mutable, in the second case it can either be mutable or constant.

Showcase:

```sn
let i = 1;
let j = 2;

let ptr1: *mut = &mut i;
val ptr2: *mut = &mut i;

*ptr1 = 3; // Works fine
*ptr2 = 4; // Works fine

ptr1 = &j; // Works fine
ptr2 = &j; // ERROR (pointer is constant)

let ptr3: * = &i;
val ptr3: * = &i;

*ptr3 = 5; // ERROR (reference is constant)
*ptr4 = 6; // ERROR (reference is constant)

ptr3 = &j; // Works fine
ptr4 = &j; // ERROR (pointer is constant)
```

The referred's state is considered when the reference is created. We can make a constant reference from a constant, a constant reference from a mutable, a mutable reference from a mutable, but not a mutable reference from a constant:

```sn
let i = 1;
val j = 2;

&i;     // Works fine
&mut i; // Works fine
&j;     // Works fine
&mut j; // ERROR (referred is constant)
```

Following this rule, don't forget that everything in a constant is considered as a constant too.

```sn
val obj = {
  value: 2
};

let ptr: *mut = &mut (obj.value); // ERROR
```

Summary of possible states:

|          Pointer       |    Reference    |         Referred        |
|------------------------|-----------------|-------------------------|
| Mutable  `let pointer` | Mutable  `&mut` | Mutable  `let referred` |
| Mutable  `let pointer` | Constant `&`    | Mutable  `let referred` |
| Mutable  `let pointer` | Constant `&`    | Constant `val referred` |
| Constant `val pointer` | Mutable  `&mut` | Mutable  `let referred` |
| Constant `val pointer` | Constant `&`    | Mutable  `let referred` |
| Constant `val pointer` | Constant `&`    | Constant `val referred` |

The only impossible situation is when we have a pointer (mutable or constant) containing a mutable reference to a constant entity, simply because we can't make mutable references on constant entities.

### Multiple-level pointers

Pointers can refer to an entity, but they can also refer to other pointers (which also are entities, after all). In this second case, though, we have to consider they are pointer and a level to ours. Here is how it goes:

```sn
let i = 1;
let j = 2;

let ptr: *mut *mut = &mut &mut i;
// `ptr` refers to an 'intermediate reference' itself referring to `i`

**ptr = 8;
println!(i); // Prints: '8'

ptr = &mut i; // ERROR
ptr = &mut &mut j; // Works fine

println!(**ptr); // Prints: '2'
```

Now, let's take two examples to detail this because this is a bit complex:

```sn
*ptr = &mut j; // Works fine
println!(ptr); // Prints: '2'
```

This first code rewrites the _intermediate reference_ `ptr` was referring to. So, the value pointed by the reference contained in the intermediate reference (`*inter_ref`) and the value pointed by the intermediate reference of `ptr` (`**ptr`) will be the same.

```sn
ptr = &mut &mut i; // Works fine
println!(ptr); // Prints: '8'
```

This second code makes `ptr` referring to a brand new intermediate pointer, which refers to `i`. So it removes the intermediate pointer we had just before.

Note that the `*` symbol, when used on a reference, retrieves the referred itself, which allows us to retrieve the intermediate pointer:

```sn
let i = 1;
let j = 2;

// Declare the global pointer
let ptr: *mut *mut = &mut &mut i;
// Get the intermediate pointer
let inter: *mut = *ptr;

*inter = 8;
println!(**ptr); // Prints: '8'

// The two lines above are strictly equivalent
*ptr = &mut i;
inter = &mut i;

// Use a brand new intermediate pointer
ptr = &mut &mut i;

*inter = 3;
println!(**ptr); // Prints: '3'
```

Even though `ptr` isn't using `inter` as its intermediate pointer anymore, it stills point to `i`, just like `inter`. So, when we affect something to `*inter`, it affects the given value to `i`. Then, when we access `**ptr`, which retrieves `i`, we see the value that was just assigned using `*inter`.

This part is complex, so don't hesitate to read it again until you understand it.

### Depointerization dangers

Depointerization, as we already saw, consists in getting the referred of a reference. But here is the thing: when we _write_ through a reference, we retrieve its referred to change the referred's value. But, when we _read_ through a reference, we retrieve its referred's value, and not the referred itself (because we don't want to get an entity but a value to deal with it). Because of that, when we read through a reference, there's no EID involved, only a (potential) OID.

But what does this change, after all? Simply the fact we can, in the case it's a primitive, for example, make a mutable from a constant reference, or anything related. Here is an example:

```sn
// Declare a pointer
let ptr: *int = & wrap!(2);

// Assign something to the pointer
*ptr = 8; // ERROR (referred is constant)

// Depointerize
let i: int = *ptr;

// Assign something to the mutable
i = 5; // Works

println!(i);   // Prints: '5'
println!(*ptr); // Prints: '2'
```

Here, the `& wrap!(2)` creates a reference to an invisible assignable entity containing an `int`. The reference is stored into a pointer called `ptr`. We then try to assign something to the referred, it fails because the reference stored in `ptr` is constant. Note that we could have changed the reference `ptr` contains, because the pointer itself is mutable.

In a second time, we depointerize `ptr` (meaning we get its reference's referred's value, which is the transparent assignable entity's value). We then assign it to a mutable called `i`, of the same `int` type, and we assign it a new number just after.

At the end, we print both `i` and `ptr`, which have two distinct values, because they are not related - each of them has its own EID, thanks to depointerization returning the value of the referred, not a reference to it.

Now, let's see a last example, with objects (which are not primitives):

```sn
// Declare an objet
let obj = { name: 'Jack' };

// Declare a pointer
let ptr: * = &obj;

// Depointerize
let hero = *ptr;

// Assign to a field
hero.name = 'John';

println!(hero.name); // Prints: 'John'
println!(*ptr.name); // Prints: 'John'
```

It works, despite the fact `ptr` contains a constant reference. How could this work?

Well, the object `ptr` targets is not defined as constant, even if the reference we assign to the pointer is. So, if we get a reference to this object, we can modify its value. This is why having a constant pointer does not mean having a constant referred or preventing any modification on it. Be aware of this!

Conventionally, even if you only want to modify an object's field and not assign something new to the object itself, you should ask for a mutable pointer, to clearly indicate you will modify the object.

### Nullable pointers

By design, pointers aren't nullable, unlike some languages does. The famous `NULL` pointer, which is used to indicate a pointer doesn't refer to anything, is a common source of bugs and requires to check too often if the pointer refers to an entity or not.

Still, it's possible to make nullable pointers, by making a reference to a nullable type. This simple trick works as expected:

```sn
// Make a nullable pointer
let ptr: * = nullable!(2);

println!(*ptr); // Prints: '2'

// Change its referred
ptr = & wrap!(3);

println!(*ptr); // Prints: '3'

// Null it
ptr = NULL;

println!(*ptr); // Prints: '' (stringified 'null')
```

In this code, we use the `NULL` pointer as it's a reference to the `null` value. Note that `NULL` contains a mutable reference, but it only accepts voids of course (which are all the same `null` value).

## Advanced concepts

The notions we will see here may not be used in every single program, be they can still be useful.

### Scope bindings

A useful concept when using libraries with a lot of resources is the _scope binding_. It consists in making an alias for each attribute in an object (class, structure, ...).

For example, let's imagine we have an `engine` class instance with a `run` function, which takes as an argument a function. This game engine runs the function but it also wants to provide a huge number of functions to manage the scene, the collisions, the geometry, the physics, etc.

A first solution would be to provide every function as a single argument. But this would result in a lambda with thousands of arguments, so that's not a good idea, even with the ICT (because we still have to write the argument's name and order).

Another solution would be to make a structure with functions in it, like:

```sn
struct EngineFunctions {
  init = engine.init;
  createScene = engine.createScene;
  getScene = engine.getScene;
  /* ... and so on */
}

val functions: EngineFunctions;
```

This works but involves to create a large structure, and then make an object with it, then give it as an argument.  Putting aside the fact it is really heavy, all the functions would need to be called with `functions.init()`, `functions.createScene()` etc. which is long to write and heavy too if we call them multiple times. Plus, there's no difference between writing `engine.init()` than `functions.init()`.

That's where we use scope bindings:

```sn
engine.run(() => {
  #bind engine;

  init(); // Works fine
});
```

The scope binding must be the very first instruction of the function, as must be followed by an explicit object (we can't write `#bind (rand<bool> ? firstObject : secondObject)`). Also, it only accepts _static objects_, which means a dictionary won't be allowed for example.

Note that attributes are simply _aliased_ here. This means that writing `init()` will in reality be understood as `engine.init()`.

Also, be aware of conflicts, you can't re-define an existing entity:

```sn
engine.run(() => {
  #bind engine;

  let init = 2; // ERROR ('init' already declared)
});
```

In this specific case, we can exclude some attributes from the scope binding:

```sn
engine.run(() => {
  #bind engine \ init, run;

  let init = 2;
  let run = lambda () : void { println!('Hello world!'); }

  run(); // Prints: 'Hello world!'
});
```

### Conditional directives

Sometimes, we will want to use a piece of code for a specific platform or language. For that, we can use the _conditional directives_: `#if`, `#else`, `#elsif`, `#end`. The code located in them is simply removed from the source code if the condition is (or is not) filled, before the program starts to run. They can only use plain values, as well as native constants, which give informations about the type of execution (interpreted, compiled, ...), the platform (Windows, Linux, ...) the processor's architecture (ARM, x86, ...).

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

That's as simple as that.

### Superoverloads

Superoverloads are overloads that don't act only as a class level, but as the whole program's level.

How do they work? That's simple: each operator superoverload overwrites the behaviour of an operator, but globally. For example, defining a `%plus` function globally will act in the whole program. The point is mainly to implement operators on classes that don't implement them natively, plus to allow operations from the right: when overloading the `+` operator in a class with `%plus(cmp: int)`, for example, it will only support operations with the `myInstance + 2` syntax but not with `2 + myInstance`. Superoverloads allow to reverse this behavior:

```sn
class MyClass {
  public readonly value: int;
  public func %construct (value: int) => @value = value;
  public func %plus (cmp: int) : int {
    return @value + cmp;
  }
}

func %plus (cmp: int, inst: MyClass) : int {
  return inst + cmp; // Use the implemented superoverload
}
```

Otherwise, operators superoverloads work exactly as operators overloads for classes.

### The reduction directive

Sometimes we want a function to take as an argument any function, as well as its arguments, in order to be able to call it later.

Problem is: there is no type to catch every existing function. We would have to use the `Any` type, that opens the door to non-function types. So, we wouldn't be able to call the function later. The second problem is that the arguments we would want to give to the function later would have to be an array of `Any`, so the builder would reject the call because its arguments may not fit the `Any` type.

The solution to this problem is to use the `#reduced` directive. Prefixing the `func` keyword in the argument's type, it allows to call the function with a tuple contaning the callback and all of its arguments, prepared in advance. Then, the argument is turned into a lambda with no arguments that can be called without worrying about arguments. To make this more clear, let's take an example:

```sn
func repeatedCall (callback: #reduced func (), times: int) {
  // Do some amazing stuff here
  for i in 0..times {
    callback();
  }
}

repeatedCall (
  (lambda (name: string) : void { println!(name); }, 'Jack '),
  2
); // Prints: 'Jack Jack '
```

Here, `callback` is a reduced function that can be called without any arguments. When it's called, the program will transparently call the real callback, which takes one argument, and gives it the name we gave in the tuple ('Jack').

Note that, because the callback hadn't a specific signature in the `repeatedCall`'s declaration, its arguments' type as well as its return type couldn't be guessed, so they must be provided - that's why we doesn't use ICT here.

It's also possible to ask for a specific return type in a returned function:

```sn
func summation (callback: #reduced func () : int, times: int) : int {
  let sum = 0;

  for i in 0..times {
    sum += callback();
  }

  return sum;
}
```

If we want to match absolutely any possible reduced function:

```sn
func takeAny<T> (callback: #reduced func () : T, times: int) : T[] {
  return (callback() for i in 0..times);
}
```

A last use is when we want to be able to give some data to the callback, so we want to require it having some arguments. Here is an examplpe:

```sn
func summation (callback: #reduced func (num: int) : int, times: int) : int {
  let sum = 0;

  for i in 0..times {
    sum += callback(i);
  }

  return sum;
}

println!(summation(
  // The reduced function's tuple
  (
    // The callback
    lambda (num: int, coeff: int) : int { return num * coeff; },
    // Its only argument (`coeff`)
    3
  )
)); // Prints: '18'
```

As we can see here, the callback's argument required in the `summation`'s signature must be its first argument. We couldn't have written `lambda (coeff: int, num: int) : int` for example.

### Flexs

Remember when we saw `println!` at the beginning? We told that it was a _flex_. And it's now time to see what's this!

Flexs, as their long name _flexible functions_ indicates, are functions. And as functions, they take arguments, use a return type, as get a body.

Still, flexs have a double specificity (in addition to the fact we write a `!` after their name to call them). First, their content is evaluated only when they are called. Secondly, type checking is done only at this time.

What does that mean? Well, let's take an example:

```sn
func sayHello (name: Any) : void {
  println!(name);
}

flex sayHelloFlex (name: Any) : void {
  println!(name);
}

sayHello('John'); // ERROR
sayHelloFlex!('John'); // Works
```

The first call fails while the second works. Why? In the first call, we use a standard function which provides an `Any` value to `println!`, which only accepts `Stringifyable` values. So, it fails.

But in the second one, the call to `sayHello!` is replaced by the flex's content, just like that:

```sn
sayHello!('John');

// The evaluated content will be like:
{
  val name: string = 'John';
  println!(name);
}
```

In flexs, arguments' type are only _indicators_, they simply tells an absolute mother type. But, when the function is built, their real type (here, a simple `string`) is used instead of this indicator. This means that `name` is, here, a `string` and not an `Any`.

That's where flexs shine: they provide a way to accept all kind of arguments and use them depending on their real type, thanks to types being checked only at usage.

Our `sayHello!` flex _could be_ invalid in some cases, but because type checking is performed only at calls, it won't be reported at invalid in our case. That's as simple as that. Of course, if we call it with a non-stringifyable type, it won't work.

Be aware though: flexs' scope are the same as for standard functions: they can only access the scope they are defined in, plus all its parent scopes and their own scope (which contains their code). This means that, if they are declared in a class for example, they will be able to use `this` and `self`. This also means they won't be able to access the scope from where they are called (just tlike standard functions). Let's take an example:

```sn
class Hello {
  private static name = 'Hello';

  public static flex printName () : void {
    println!(@name);
  };

  public static flex printLocal () : void {
    println!(local_name);
  }
}

{
  val local_name = 'Hello !';

  Hello.printName!(); // Prints: 'Hello'
  Hello.printLocal!(); // ERROR because 'local_name' is not defined
}
```

Here, flexs are able to access their scope they are declared in (the scope of `Hello` plus all of its parents) as well as their own scope (remember, functions have a reserved scope delimited by their brackets), but they aren't able to access the local scope in which we define a `local_name` constant and from which we call them.

Another point: the `#pln<T>` typed. It's called a _templated type directive_, and only accepts plain values. Its goal is to be able to manipulate, for example, tuples:

```sn
flex access_tuple_value (tuple: #pln<Tuple>, index: #pln<usize>) : Any {
  // The following line works because:
  // - The length and type of every element in the tuple
  //     are known as it's a plain tuple
  // - 'index' is known as it's a plain number
  return tuple[index];
}

access_tuple_value! (( 'Hello' ), 0); // Returns: 'Hello'

// Equivalent to:
let tuple = ( 'Hello' );
tuple[0]; // Returns: 'Hello'
```

Note that plain constants have natively a `#pln<T>` type. There are the only entities having such a type. Still, `#pln<T>` works on flexs' arguments as well as functions' ones (to give them the possibility to pass such plain values to flexs that require them). This type describes an entity as containing a predictable **and** imutable value.

Note that flexs can be expressed as a type, using `flex` instead of `func`, but only inside other flexs' signature and body. For example, the native `iter_tuple` flex requires another flex as a callback:

```sn
// Flex's signature
flex iter_tuple (tuple: #pln<Tuple>, callback: flex (value: Any));

// Showcase
iter_tuple!(('Hello', 24), flex (value: Any) {
  println!(value); // Works because all the values in the tuple are 'Stringifyable's
});
```

Note that flexs must be plain, meaning you can't store a flex in a variable to use it later. Though it's still possible to store it in a plain constant, there is an additional rule that forbids from being a function's argument - only a flex's one.

Another particular point about flexs is that their return type can be a plain type:

```sn
flex returnTwo () : #pln<int> {
  return 2;
}

pln two = returnTwo!(); // Works fine
println!(two); // Prints: '2'
```

This is useful when dealing with plain constants, or even when dealing with classes. Indeed, when we write a class name like `string` or `int` as a value, it is typed as a `#pln<Type>` (called a _plain class_). Only plain classes can be instanciated and get members available.

```sn
func stringFunc () : Type {
  return string;
}

flex stringFlex () : #pln<Type> {
  return string;
}

stringFunc().NIL; // ERROR
stringFlex!().NIL; // Empty string
```

A last 'type', truly reserved to flexs this time (so functions cannot use it): the unknown-sized reference. It requires a reference and allows references, references of references, references of references of references, and so on. The given reference's level can be got using the `levelof!` flex, which returns a `#pln<usize>` value.

For this example, we will use several useful flexs that work on references:

* `typeof_ref!` takes a reference and return the type of its referred ;
* `iter_ref!` takes a reference and a flex callback. It iterates the pointer by depointerizing it. Each time, it calls the callback with the depointerized pointer and indicate its current level.

```sn
flex getFinalReferred (ptr: *+ Any) : int {
  let ret: typeof_ref!(ptr)?; // Nullable to avoid instanciation

  iter_ref!(ptr, flex (ptr: *+ Any, level: usize) : void {
    ift ptr ~ *typeof_ref!(ptr) {
      ret = *ptr;
    }
  });

  return ret;
}

val i = getFinalReferred(& wrap!(2)); // Returns: 2
val j = getFinalReferred(&mut wrap!(2)); // Returns: 2
val k = getFinalReferred(&&& wrap!(2)); // Returns: 2
val l = getFinalReferred(& &mut & wrap!(2)); // Returns: 2
```

Another news: flexs can be used to type an entity, as long as they return a `#pln<Type>` of course. Also, mutable pointers are considered as instances of their non-mutable version (so a `*mut int` is considered as being an instance of both `*mut int` and `* int`).

This example is complex but demonstrates the powerfulness of references manipulation using flexs.

**NOTE :** The flex we've just created already exists in fact: its name is `depointerize!` and it takes an unknown-sized reference to return its final referred's value.

#### A word about optimization

Using flexs has a large cost on performances, because each time we call a flex, its code is fully pasted. Here is an example, using our `getFinalReferred` flex:

```sn
// This code:
val i = getFinalReferred(& wrap!(2)); // Returns: 2
val j = getFinalReferred(&mut wrap!(2)); // Returns: 2
val k = getFinalReferred(&&& wrap!(2)); // Returns: 2
val l = getFinalReferred(& &mut & wrap!(2)); // Returns: 2

// Produces, in reality, a code like this one:

// val i = getFinalReferred(& wrap!(2)); // Returns: 2

// getFinalReferred! call
let _wrapper_0: int = 2;
let _arg_0: *int = & _wrapper_0;
let _ret_0: int?;

// iter_ref! call
let _level_1: u8 = 1b;
let _ptr_1: *int = _arg_0;

// Callback call
ift _ptr_1 ~ * int {
  _ret_0 = *_ptr_1;
}

// Flex's return value
val i = _ret_0;

// val j = getFinalReferred(&mut wrap!(2)); // Returns: 2

// getFinalReferred! call
let _wrapper_1: int = 2;
let _arg_1: *mut int = &mut _wrapper_1;
let _ret_1: int?;

// iter_ref! call
let _level_2: u8 = 1ub;
let _ptr_2: *mut int = _arg_1;

// Callback call
ift _ptr_2 ~ * int {
  _ret_1 = *_ptr_2;
}

// Flex's return value
val j = _ret_1;

// val k = getFinalReferred(&&& wrap!(2)); // Returns: 2

// getFinalReferred! call
let _wrapper_2: int = 2;
let _arg_2: ***int = &&& _wrapper_2;
let _ret_2: int?;

// iter_ref! call
let _level_3: u8 = 3ub;
let _ptr_3: *** int = _arg_2;

// Callback call
ift _ptr_3 ~ * int {
  _ret_2 = *_ptr_3;
}

// iter_ref! call
let _level_4: u8 = 2ub;
let _ptr_4: ** int = *_ptr_3;

// Callback call
ift _ptr_4 ~ * int {
  _ret_2 = *_ptr_4;
}

// iter_ref! call
let _level_5: u8 = 1ub;
let _ptr_5: * int = *_ptr_4;

// Callback call
ift _ptr_5 ~ * int {
  _ret_2 = *_ptr_5;
}

// Flex's return value
val k = _ret_2;

// val l = getFinalReferred(& &mut & wrap!(2)); // Returns: 2

// getFinalReferred! call
let _wrapper_3: int = 2;
let _arg_3: * *mut *int = & &mut & _wrapper_3;
let _ret_3: int?;

// iter_ref! call
let _level_6: u8 = 3ub;
let _ptr_6: * *mut * int = _arg_3;

// Callback call
ift _ptr_6 ~ * int {
  _ret_3 = *_ptr_6;
}

// iter_ref! call
let _level_7: u8 = 2ub;
let _ptr_7: * *mut int = *_ptr_6;

// Callback call
ift _ptr_7 ~ * int {
  _ret_3 = *_ptr_7;
}

// iter_ref! call
let _level_8: u8 = 1ub;
let _ptr_8: * int = *_ptr_7;

// Callback call
ift _ptr_8 ~ * int {
  _ret_3 = *_ptr_8;
}

// Flex's return value
val l = _ret_3;
```

This code is quite unredeable and unoptimized, as well as really large for such a simple flex. This is what happens when a flex isn't optimized. Here, thanks to `iter_flex!` being very well optimized, the produced code is, in reality, more like this:

```sn
// val i = getFinalReferred(& wrap!(2)); // Returns: 2

// getFinalReferred! call
let _wrapper_0: int = 2;
let _arg_0: *int = & _wrapper_0;
let _ret_0: int?;

// Callback call
let _ptr_0: *int = _arg_0;

ift _ptr_0 ~ *int {
  _ret_0 = *_ptr_0;
}

// Flex's return value
val i = _ret_0;

// val j = getFinalReferred(&mut wrap!(2)); // Returns: 2

// getFinalReferred! call
let _wrapper_1: int = 2;
let _arg_1: *mut int = &mut _wrapper_1;
let _ret_1: int?;

// Callback call
let _ptr_1: *mut int = _arg_1;

ift _ptr_1 ~ *int {
  _ret_1 = *_ptr_1;
}

// Flex's return value
val j = _ret_1;

// val k = getFinalReferred(&&& wrap!(2)); // Returns: 2

// getFinalReferred! call
let _wrapper_2: int = 2;
let _arg_2: ***int = &&& _wrapper_2;
let _ret_2: int?;

// Callback call
let _ptr_2: ***int = _arg_2;

ift _ptr_2 ~ *int {
  _ret_2 = *_ptr_2;
}

// Callback call
let _ptr_3: *int = *_ptr_2;

ift _ptr_3 ~ *int {
  _ret_2 = *_ptr_3;
}

// Callback call
let _ptr_4: *int = *_ptr_3;

ift _ptr_4 ~ *int {
  _ret_2 = *_ptr_4;
}

// Flex's return value
val k = _ret_2;

// val l = getFinalReferred(& &mut & wrap!(2)); // Returns: 2

// getFinalReferred! call
let _wrapper_3: int = 2;
let _arg_3: ***int = &&& _wrapper_3;
let _ret_3: int?;

// Callback call
let _ptr_5: ***int = _arg_3;

ift _ptr_5 ~ *int {
  _ret_3 = *_ptr_5;
}

// Callback call
let _ptr_6: *int = *_ptr_5;

ift _ptr_6 ~ *int {
  _ret_3 = *_ptr_6;
}

// Callback call
let _ptr_7: *int = *_ptr_6;

ift _ptr_7 ~ *int {
  _ret_3 = *_ptr_7;
}

// Flex's return value
val k = _ret_3;
```

At build time, this code can easily be optimized, by removing predictable conditions (like `_ptr_0 ~ *int`) and useless intermediate variables (e.g. `let _i = 1; _i = 2; val j = _i;` will produce `val j = 2;` instead). So, the final code will, in reality, more look like this:

```sn
val i: int = 2;
val j: int = 2;
val k: int = 2;
val l: int = 2;
```

The final code is, in this specific case, perfectly optimized. But, that won't always be the case, and that's even more true if you deal with large flexs. That's why flexs should be as tiny as possible, and call functions to perform the more possible tasks. Never hesistate to mix flexs with simple functions to optimize your program!

### Proxies

Proxies allow to hide the real value of an assignable entity and to call a function when its value is read, written, or both. For example, we could imagine a variable called `counter` that can only be incremented by 1 each time. So, if it is equal to 3, we can only assign 4 to it, not 5 or 6. But we also want to be able to go back from 1 step, to go from 3 to 2 for example, but not from 3 to 1 directly.

There are several signatures for proxies. Here is the most common one:

```sn
proxy var: X from {
  getter: func () : T,
  setter: func (c: Y) : void
};
```

With `X` and `Y` being arbitrary types. The object located just after the `from` keyword is called the _proxy model_.

In this example, we first declare the proxy entity using the `proxy` keyword and we follow it by a tuple.

The first element (`X`) is a class: that's the _type_ of this assignable entity.

The second one is a function called the _getter_ that is called when we ask to read the entity and returns the value corresponding to the entity.

The third member is a function called the _setter_ that is ran when we try to assign something to the entity. It takes a _candidate value_, which is the value we are trying to assign to the entity.

The candidate value is not forced to have the same type than the proxy itself (that's why `Y` is an arbitrary type). Also, this function can be polymorphed: it's perfectly possible to have a setter with a `string` candidate and a one with a `bool` candidate, for example.

Here is an example of our counter, made with a proxy:

```sn
// Proxy's declaration and type
proxy counter: uint from {
  // Default hidden value
  value: 0,

  // The getter
  getter: func () : uint {
    // Return the hidden value without any changes
    return @value;
  },

  // The setter
  setter: func (c: IntegerConvertible) : void {
    // Convert the candidate to an integer
    let result = <uint> c;

    // If the difference is valid...
    if @value + result in [ -1, 0, 1 ] {
      // Set it
      @value += result;
    }
  }
);
```

A good point about this proxy is that we can do this:

```sn
counter = true; // 1
counter ++; // 2
counter = counter + 1; // 3
counter += 1; // 4
counter --; // 3
counter = '2';
```

It's of course impossible to assign a boolean or a string where we expect an integer, but this proxy allows it by accepting any primitive and converting it manually to an integer.

**NOTE :** When trying to convert a `string` to any number type, if the string does not contain a valid number, its value will be `0`. Be aware of that.

Note that type inference can be performed on proxy models, so we can rewrite ours like this:

```sn
proxy counter: int from {
  value: 0,

  getter: () => @value,

  setter: c => {
    // If the difference is valid...
    if @value + c in [ -1, 0, 1 ] {
      // Set it
      @value += c;
    }
  }
});
```

Note that the proxy can also use the `this` object to access its own members (like calling the setter in the getter or some things like this). But, we are not in a dictionary, so it isn't possible to add custom members flying. Still, we can declare some additional (hidden) properties in the proxy object:

```sn
proxy counter: int from {
  value: 0,
  someSampleProperty: 1,
  // ...
};
```

Other signatures of the proxies are derivatives of the first one we've saw: while a proxy cannot omit its getter, it is not forced to have a setter - in this case, it is considered as a constant.

#### Prepared proxy models

When we want to make several proxies that have exactly the same members, it is for sure heavy and not really maintanable to copy and paste the same code again and again. That's where we use _prepared proxy models_.

They simply are proxy models, like the one we made for our counter, which can be specified after the `from` keyword. Here is an example:

```sn
// Declare the model
prxmodel counterModel: int = {
  value: 0,

  getter: () => @value,

  setter: c => {
    // If the difference is valid...
    if @value + c in [ -1, 0, 1 ] {
      // Set it
      @value += c;
    }
  }
};

// Create three proxies using it
proxy counter1: int from counterModel;
proxy counter2: int from counterModel;
proxy counter3: int from counterModel;
```

Prepared proxy models must be declared using the `prxmodel` keyword. Also note these are special objects that are not readable (writing `counterModel.value` will not be considered as valid, for example).

#### Templated proxies

Proxies can take one or several templates, but then they can't have an hidden value.

```sn
proxy randOf<T extends int>: T from {
  // The getter
  getter: func () : T {
    return random!(T.MINIMUM, T.MAXIMUM);
  }
};

randOf<i64>; // Random 'i64' value
randOf<u32>; // Random 'u32' value
```

Prepared version:

```sn
prxmodel randOfModel<T extends int>: T {
  getter: func () : T {
    return random!(T.MINIMUM, T.MAXIMUM);
  }
};

proxy randOf<T extends int>: T from randOfModel;
```

### Flexible proxies

Also called _flex proxies_, flexible proxies are a mix between flexible functions and proxies. They allow us, for example, to return plain values (like plain classes).

They are defined the same way as standard proxies, except we use the `proxy!` keyword instead of the `proxy` one, and that the getter and setter are flexs instead of simple functions.

To understand the usefulness of flexible proxies, know that the `static!` object is in reality a flexible proxy itself. Here is its definition:

```sn
proxy! static<DATA: Any>: #pln<Type> {
  getter: flex () : #pln<Type> {
    return typeof!(DATA);
  }
};
```

This definition is a bit ugly, as it mixes a flexible templated proxy and plain return types.

So, this proxy takes a single template, `DATA`. Thanks to template inference, writing `static!<'Hello'>` works fine and, because we are using a flex proxy, `DATA` will be typed as a `string` (with a standard proxy, it would have been typed as an `Any`).

The proxy returns a plain class, meaning we can manipulate it as if we wrote its name directly. This is possible thanks to the proxy being flexible. Its getter also indicates, of course, an identical return type, and returns the class `DATA` is an instance of. This leads us to the following results:

```sn
let str: static!<''> = 'Hello world!'; // Works fine

static!<''>.NIL; // Empty string
```

Besides, the underscore types in classes are defined using the following statements:

```sn
type _this = static!<this>;
type _self = static!<self>;
type _super = static!<super>;
```

Thanks to the `type` keyword declaring an _alias_ instead of creating a whole new type, this works perfectly.

### Descriptor types

Natively, there are some types called _descriptor types_:

* `Function` accepts any function ;
* `Structure` accepts any structure ;
* `Enumeration` accepts any enumeration ;
* `Interface` accepts any interface ;
* `Trait` accepts any trait ;
* `Class` accepts any class

This means the following statement is valid:

```sn
let callback: Function = lambda () : void => null;

callback = lambda () : string => "Hello"; // Works fine
```

Besides, the `Type` type accepts any type, as we already saw:

```sn
let myType: Type = string;

myType = number; // Works fine
```

Note that any type is an _instance of_ `Type`, which means even `Function` is an instance of it.

### Plainable types

Plainable types are types that can be plained using the `#pln<T>` directive. They are described in the native `PLAINABLE` plain constant:

```sn
pln PLAINABLE = (void, bool, number, string, Function, Structure, Enumeration, Interface, Trait, Class, Type);
```

As you can see, it's a tuple of types. Only types contained in it can be plained, meaning we can't write `#pln<Promise<string, bool>>` for example.

Note that child of these types are also accepted ; for example, it's possible to write this:

```sn
pln SUM: func (a: int, b: int) : int = (a, b) => a + b;

println!(SUM(2, 5)); // Prints: "7"
```

As all function types are children of `Function` itself.

This is also part of the function's behavior: when you write this:

```sn
func sum (a: int, b: int) : int {
  return a + b;
}
```

The builder turns it into this code:

```sn
pln sum: func (a: int, b: int) : int = lambda (a: int, b: int) : int {
  return a + b;
};

// Which is itself turned into:
val sum: #pln<func (a: int, b: int) : int> = lambda (a: int, b: int) : int {
  return a + b;
};
```

### Constrained types

Sometimes we want to get restricted values from a specific type. For example, if we make a function called `treatCars` that takes a `Vehicle` instance as a parameter, we could only want to accept vehicles with four `wheels` or less.

This time, because we haven't seen any feature that could achieve it, let's skip to the solution: we'll use _constrained types_. Assuming we have this code:

```sn
class Vehicle {
  public readonly wheels: int;
  public func %construct (wheels: int) => @wheels = wheels;
}

val car = new Vehicle(4);
val motorcycle = new Vehicle(2);
```

Our function will have this look:

```sn
func treatCars (car: Vehicle with (c => c.wheels <= 4)) {
  println!(`This vehicle has ${car.wheels} wheels.`);
}
```

Here, the `with` keywords indicates a constrained type. On its left, we write the type we want to constraint, and on its right a callback (the constraint).

So, how does it work? This is simple: when we read the value, it returns it without doing any treatment. But when we try to write it (assign something else), the callback will be ran with the value we are trying to assign (called the _candidate value_, like in proxies). It could also receive a second argument, which would then be the current value of the resource. As you can see, ICT works in the constraint callback because arguments' types as well as its return type can be guessed.

If we put aside the fact that writing is controlled by a callback, constrained types act **exactly** like standard types. Constrained types are considered as children of their original type (in our example, asking for a `Vehicle` instead of its constrained version would accept it as well).

Type constraints are a form of _type variation_, which are bidirectionaly compatible with their original type. For example, if a function asks for an `int`, we can give an `int with (c => c > 5)` instead. Also, if a function asks for an `int with (c => c < 8)`, we can give it an `int` instead (the constraint will be triggered to ensure we give a valid integer, though). Constrained types can be automatically typecasted to standard types, as well as the opposite - just like nullable types, which are another form of type variation.

Here is an exemple to better understand the concept:

```sn
func treatCars (car: Vehicle with (lambda (c: string) : string => c.wheels <= 4)) {
  c = new Vehicle(2); // Works fine
  c = new Vehicle(4); // Works fine
  c = new Vehicle(8); // ERROR because the constraint returned `false`
}

treatCars(new Vehicle(4));
```

When the resource is written, the callback receives its value (plus the current value of the resource if it takes two arguments), and returns a boolean. If it accepts the changes, it will return a non-NIL value (in our case, `true`, which will happen only if the vehicle has four wheels or less). Else, it will return a NIL value (in our case, `false`) and the writing will be rejected, which will result in an `TypeConstraintError` error (note that this error is a native one, so we don't have to catch it).

But, because of the need to match the constraint, constrained resources may not be declared without an initialization value. Here is an example:

```sn
// We use ICT here
let car: Vehicle with (c => c.wheels == 4); // ERROR
let car: Vehicle with (c => c.wheels == 4) = new Vehicle(4); // Works fine
```

Also, because we could want to re-use a constrained type later, the `type` keyword allows us to register an alias on it:

```sn
type Car = Vehicle with (c => c.wheels == 4);

let car: Car;                  // ERROR
let car: Car = new Vehicle(2); // ERROR
let car: Car = new Vehicle(4); // Works fine
```

A last thing about this concept is the _short notation_ it allows: because writing a `c => ...` can be a bit heavy, we can omit the arrow syntax and simply use the `_` entity to refer as the candidate value. Here is an example:

```sn
type Car = Vehicle with (c => c.wheels == 4);
// *Strict* equivalent:
type Car = Vehicle with (_.wheels == 4);
```

#### Proxy equivalence

It's possible to write a proxy that will be equivalent to a constrained type entity:

```sn
// Proxy version
proxy str: string from {
  value: 'Hello',

  getter: () => @value,

  setter: (c) throws Error => {
    if c.length == 0 {
      throw new Error('A non-empty string is required');
    }

    @value = c;
  }
};
```

But this is really heavy, and we cannot require it as a type for a function's argument. Besides, it has a greater performance cost, so a constrained types is clearly preferable:

```sn
let str: string with (_.length > 0) = 'Hello';
```

#### Optimization problems

Assigning a new value to a constrained entity requires to call a function, and that each time. This can have a big performance cost if the constraint is an heavy function - that's why type constraints should be as light as possible.

#### About the `type` keyword

The `type` keyword allows to _alias_ a type with another. In our previous example, we defined `Object` as the `Any with (! (_ instanceof Primitive))` type.

In reality, this doesn't create a new type ; it simply makes an _alias_ to it:

```sn
// Set up an alias
type NotEmptyString = string with (_.length > 0);

// This declaration:
let var: NotEmptyString = 'Hello';
// Equivalent to this one:
let val: string with (_.length > 0) = 'Hello';
```

It can also be used with templates:

```sn
// Set up a templated alias
type ArrayThree<T> = T[3];

let val: ArrayThree<int> = [ 2, 5, 8 ]; // Works fine
let val: ArrayThree<int> = [ 2, 5 ]; // ERROR (invalid length)
```

Templates can also be constrained, as for classes:

```sn
// Set up a templated alias
type ArrayOfThreeNums<T ~ number> = T[3];

let val: ArrayOfThreeNums<int> = [ 2, 5, 8 ]; // Works fine
let val: ArrayOfThreeNums<string> = [ 'a', 'b', 'c' ]; // ERROR
```

Also, as for constrained types, we can use the `_` value, which refers to the type of the value we are trying to assign:

```sn
type NearToAny = not string;

let one: string = 'Hello';
let two: int    = 5;
let three: Any = 'Hello';

<NearToAny> one; // ERROR
<NearToAny> two; // Works fine
<NearToAny> three; // Works fine
```

Think of it as an equivalent to `_this` for the taken value.

**NOTE :** The `not` keyword performs a _type exclusion_, which means it accepts any type that **isn't** the one following the keyword (nor one of its children).

### Unsafe typecasting

Unsafe typecasting allows to convert any type to its real type. For example, in the following code:

```sn
let unknown: Any = 'Hello world!';
```

Even though `unknown` is typed an entity contaning an `Any` value, the _real type_ of the value it contains here is `string`. So, unsafe typecasting will allow us to convert this `Any` entity to a `string`.

Still, it has two big downsides: first, it is not checked at build time, and can perfectly fail at runtime (it fails if and only if the destination type is not the real type of the value we are trying to typecast). Second, it has a bigger performance cost than static cast.

This cast has the same syntax than a safe cast. If the cast fails, it will throw an `InvalidCastError`.

Let's see the syntax:

```sn
let unknown: Any = 'Hello world!';

let valid: string = cast_unsafe!<string>(unknown);

println!(valid); // Prints: 'Hello world!'

let invalid: i16 = cast_unsafe!<i16>(unknown); // ERROR
```

Final word: if you want to convert, for example, a `number` entity which contains in reality an `i16` to an `u8`, you must combine both safe and unsafe casts:

```sn
let num: Any = 2ul;
let byte: u8 = cast!<u8>(cast_unsafe!<u64>(num));

// Shorter version:
let byte: u8 = <u8> cast_unsafe!<u64>(num);
```

Type assertion uses an unsafe cast but catches the result when it fails and simply ignore the condition's body in that case.

### Type assertion

Here is a very nice feature when we want to manipulate some members on a value that is described as a mother of their real type that doesn't implement these members:

```sn
func convertToString (arg: Any) : string? {
  // Convert the argument to a string using its `%to<string>` overload
  // If it doesn't have any, return 'null'
}
```

A first idea for this function's body could be to use typecasting, like this:

```sn
func convertToString (arg: Any) : string? {
  try
    return cast_unsafe!<string>(arg);

  catch
    return null;
}
```

But this doesn't work if the real type of the data isnt `string`. In order to avoid this problem, we can perform a _type assertion_: it's a conditional block where we specify one or several conditions, like `arg` is an instance of the `Primitive` class. If the condition successes, the block is executed considering, this time, all the members described by `Primitive`:

```sn
func convertToString (arg: Any) : string? {
  ift arg instanceof Primitive {
    // Here, 'arg' is considered as being a 'Primitive'
    return <string> arg;
  } else {
    return null;
  }
}
```

Note that this code can be fastened using an exact type if we expect one, as the program doesn't have to check all the type hierarchy:

```sn
func convertToString (arg: Any) : string? {
  ift arg instanceof #=u16 {
    // Here, 'arg' is considered as being EXACTLY an 'u16'
    return <string> arg;
  } else {
    return null;
  }
}
```

For more flexibility, we can simply accept any type that is typecastable to a string:

```sn
func convertToString (arg: Any) : string? {
  ift arg implements Stringifyable {
    return <string> arg;
  } else {
    return null;
  }
}
```

It also works inline:

```sn
func convertToString (arg: Any) : string? {
  return ift arg implements Stringifyable { <string> arg } else { null };
}
```

Though this second syntax is often heavier and more difficult to read.

The assumption condition must be take the following form:

```sn
[entity] [instanceof | instanceofsuper | implements | uses | ~] [class]
```

Or a combination of several assumption conditions using the `&&` operator. The `instanceofsuper` operator returns `true` if the entity is an instance of the class itself or one of its parent. That's the opposite of `instanceof` which returns `true` if the entity is an instance of the class itself or one of its _children_.

Note that we can also use the `~` operator here:

```sn
func convertToString (arg: Any) : string? {
  ift arg ~ int {
    return <string> arg;
  } else {
    return null;
  }
}
```

### Intersection types

Intersection types is a feature that enforces a value to respect several types (either to be an instance of a class and implement one or several interfaces or traits, or simply to implement several interfaces or traits). It goes like this:

```sn
interface HasMotor {
  isAnObject: bool;
  horsesPower: uint;
}

interface HasWheels {
  isAnObject: bool;
  wheels: uint;
}

func takeCar (car: HasMotor & HasWheels) {
  println!(car.wheels);
}

takeCar({
  isAnObject: true,
  horsesPower: 1,
  wheels: 5
});
```

Type intersection gives to the value all the members described by every type given. Here, `car` in the `takeCar` function has all the members described by `HasMotor` as well as those described by `HasWheels`.

Note that our call to `takeCar`, though it's valid, is not conventional. We should have indicated its type explicitly instead, like we do for structures:

```sn
takeCar((HasMotor & HasWheels) {
  isAnObject: true,
  horsesPower: 1,
  wheels: 5
});
```

Besides, we can shorten our definition using the `type` keyword:

```sn
interface HasMotor {
  isAnObject: bool;
  horsesPower: uint;
}

interface HasWheels {
  isAnObject: bool;
  wheels: uint;
}

type Car = HasMotor & HasWheels;

func takeCar (car: Car) {
  println!(car.wheels);
}

takeCar(Car {
  isAnObject: true,
  horsesPower: 1,
  wheels: 5
});
```

Be aware: if two entities of the intersection define a member with the same name but with a different type, an error is thrown. For example, the following code won't work:

```sn
class A {
  member: int;
}

class B {
  member: string;
}

type C = A & B; // ERROR (conflict because of 'member')
```

Note that intersection types support automatic typecasting to any type of the intersection:

```sn
class A {}

class B extends A implements Numerizable {
  public func %to<int> => 2;
}

// Works
let a: A & Numerizable = new B();
let b: A = a; // Works fine

// Though...
let c: A = new B();
let d: A & Numerizable = c; // ERROR
let e: A & Numerizable = cast_unsafe!<B>(c); // Works fine
```

#### Type absorption

_Type absorption_ is the result of an intersection between one type and one of its parent. Such an operation results in the child type only:

```sn
string & Stringifyable; // string
Numerizable & number;   // number
```

### Union types

Union types are the opposite of intersection types: they describe a value as being of a type OR another one. Example:

```sn
interface HasMotor {
  isAnObject: bool;
  horsesPower: uint;
}

interface HasWheels {
  isAnObject: bool;
  wheels: uint;
}

func takeSomething (obj: HasMotor | HasWheels) {
  println!(obj.isAnObject); // Prints: 'true'
}

takeSomething(HasMotor {
  isAnObject: true,
  horsesPower: 1
});
```

A value using an union type makes available all the members commonly described by all the types of the union. Here, this means only `isAnObject` is available. To access `horsesPower` or `wheels`, we must ensure our type is typecastable:

```sn
func takeSomething (obj: HasMotor | HasWheels) {
  println!(obj.isAnObject); // Prints: 'true'

  // println!(obj.horsesPower); // ERROR
  // println!(obj.wheels); // ERROR

  ift obj ~ HasMotor {
    println!(obj.motors);
  }
  
  ift obj ~ HasWheels {
    println!((HasWheels) obj.wheels);
  }
}
```

As for intersections, if two entities of the union define a member with the same name but with a different type, an error is thrown. For example, the following code won't work:

```sn
class A {
  member: int;
}

class B {
  member: string;
}

type C = A | B; // ERROR (conflict because of 'member')
```

Note that type inference will **never** result either in an intersection type or an union type. Instead, the 'Best Common Type' method is used to determine the type of, let's say, an array:

```sn
virtual class Animal {}

// These three types have in common their 'Animal' parent
class Lion extends Animal {}
class Rhino extends Animal {}
class Bear extends Animal {}

let array = [ new Lion(), new Rhino(), new Bear() ];
// 'array' is of type 'Animal[]'
```

When there is no common type, the union must be explicitly specified:

```sn
class Lion {}
class Rhino {}
class Bear {}

// ERROR (no common type)
let array = [ new Lion(), new Rhino(), new Bear() ];

// Works (explicit union typecasting)
let array = (Lion | Rhino | Bear)[3] ([ new Lion(), new Rhino(), new Bear() ]);
```

Note that union types support automatic typecasting to any type of the union, and also from a single type to an union containing it:

```sn
class A {}
class B extends A implements Numerizable {
  public func %to<int> => 2;
}

// Works
let a: A = new B();
let b: A | Numerizable = a; // Works fine

// Works
let c: A | Numerizable = new B();
let d: Numerizable = d; // Works fine
```

#### With `try` and `catch`

The inline verison of `try` and `catch` specifically use union types:

```sn
let a = try { 0; } catch () { }; // 'int' and 'void'
let b = try { 0; } catch () { 0; }; // 'int' and 'int'
let c = try { 0; } catch () { 0f; }; // 'int' and 'f32'
```

Here is the type of each variable:

```sn
a; // int | void = int?
b; // int | int  = int
c; // int | f32
```

### Union values

Union values allow to create a type that accepts several values. Here is an example:

```sn
type A: string = 'Hello' | 'World';

<A> 'Hello'; // Works fine
<A> 'World'; // Works fine
<A> 'Hi';    // ERROR
```

The `A` type accepts any string that is either equal to `'Hello'` or `'World'`. That's a different concept than union types, which accept any _instance_ of any type of the union.

Note that all values of the union must be plain, else an error will be thrown at build time.

### Anonymous classes

Anonymous classes are for classes the equivalent of lambdas for functions. These are class, without a name, that are mainly used when they are used a single time.

Note that anonymous classes can be created like this ; they must either inherit from another class, implement an interface, use a trait, or a mix of these.

Let's consider the following code:

```sn
virtual class MouseClickHandler {
  abstract public func onClick () : void;
}

func takeHandler (handler: MouseClickHandler) {
  handler.onClick();
}
```

We want to make a click handler for a specific scenario. For that, the only solution we've seen is to make a new class that inherits from `MouseClickHandler`. But this forces us to declare and then instanciate the class, where we only want to use it a single time.

For that, we use an anonymous class, as follows:

```sn
takeHandler(new ~MouseClickHandler {
  public func onClick () : void {
    println!('I\'ve been clicked!');
  }
});
```

The `~` symbol can be either followed by a class, an interface, or a trait. It can also mixes several of them by being followed by an intersection type:

```sn
takeHandler(new ~(MouseClickHandler & Stringifyable) {
  public func onClick () : void {
    println!('I\'ve been clicked!');
  }

  public func %to<string> () : string {
    return 'Hello world!';
  }
});
```

Note that the class is instantly instanciated. Type inferring also works with anonymous classes:

```sn
let hello = new ~Stringifyable {
  public value: int;

  public func %to<string> () {
    return @value;
  }
};

hello.value = 8;
println!(hello); // Prints: '8'
```

#### Automatic inheritance

Any union that contains only children of a given class will be considered as one of its children too. Example:

```sn
virtual class A {}

class B extends A {}
class C extends A {}

let b: B | C = new B();
let a: A = b; // Works
```

#### `catch`'s case

When wrapping a call to a function using a `try`/`catch` block but not declaring the error type in the `catch`, the inferred type will be an union of all the error types that may be thrown in the `try` block:

```sn
func mayThrow () throws AError, BError {
  if rand!<bool> {
    throw new AError("Hello");
  } else {
    throw new BError("Hello");
  }
}

try {
  mayThrow();
} catch (e) {
  // 'e' is typed as an 'AError | BError'
}
```

### Types as values

As we previously saw, the type of any class can be represented as a `#pln<Type>`. As `#pln<Type>` is a type itself, and as a type describes values, a type is technically speaking a value. This also means that `Type` is an instance of itself, which perfectly illustrates the special case this class represents.

This allows us, still technically speaking, to store a type in a plain constant, do some operations on it that don't make it lose its plain state (like intersections or unions), and then to use it as the type of an entity. Here is an example which works perfectly fine:

```sn
pln A: Type = Primitive; // Primitive
pln B: Type = A & string; // Primitive & string = string
pln C: Type = B | bool; // string | bool

let mutable: C = 'Hello world!'; // Works fine
mutable = true; // Works fine too
```

We can even use type inference on this:

```sn
pln A = Primitive;
pln B = A & string;
pln C = B | bool;

let mutable: C = 'Hello world!'; // Works fine
mutable = true; // Works fine too
```

This works as expected. And we can do this with absolutely any type, of course. We can even store the types in a structure's plain field to use it later.

This also means we could define types without using the `type` keyword:

```sn
// Shortened syntax
type A = B;

// Plain constants shortened syntax
pln A: Type = B;

// Full syntax
val A: #pln<Type> = B;
```

This last line is clearly ugly and less readable than a simple `type` aliasing. Also, the keyword makes an _alias_ and not an assignment, which allows us to use the `this` and `self` resolution operators in it, at the opposite of declaring the type using a plain constant.

## Asynchronous behaviours

Sometimes we can't foretell when an event will occur. For example, if we are making a web server, we can't predict _when_ there will be incoming connections. This is called an _asynchronous behaviour_ and can be handled several ways.

Some of the concepts we will see in this chapter, like promises, are also very useful when dealing with multi-treading, a great tool that allows our code to run several pieces of code simultaneously.

### The problem

Some events are synchronous even though they appear to be asynchronous. For example, `catch` blocks call may appear to be asynchronous becacuse they are called only if a n error occured, and implicitly. But in fact, they are called synchronously, because the analyzer turns all `throw` instructions inside a `try` block to a jump to the `catch` one  (which is not possible manually). So, the `catch` block works synchronously.

Another case is callbacks. In the following code:

```sn
class Event {
  private static handler: func ();

  public static func handle (handler: func ()) => @handler = handler;

  public static func trigger () {
    @handler();
  };
}

Event.handle(() => println!('Callback was triggered'));
Event.trigger();
```

If we don't have the source code of `Event`, we could think this is asynchronous because the function is not called directly but only when a specific event occurs. But it's still synchronous, because the callback is ran in the `Event.trigger()` function.

In SilverNight, asynchronous functions happen in three cases:

* When dealing with multi-threading ;
* When the program is going to be transpiled in an asynchronous language ;
* When using asynchronous API in frontend or third-party APIs

The first point is about threads, a concept we will see in another book, so for now we'll put it aside. The second point, though, is interesting.

In some languages, such as JavaScript, several functions can be ran at the same time automatically. For example, the `setTimeout()` function that takes a callback and a delay in miliseconds runs the given function after the specified delay, even if the program is already running some tasks. This will not block the main tasks' execution, because the callback will run in parallel of the main tasks. This specificity makes JavaScript a _non-blocking language_, which means it can run several functions at the same time without blocking another.

The Node.js platform takes advantage of this feature to allow JavaScript being used in servers. When five clients connect at the same time to the server, they can be delivered simultaneously. In a synchronous language, the first client would be served first, and when it's done it would be the second client's turn, then the third one, and so on... That makes a long waiting time for the last clients, though. That's why synchronous languages are never used to deliver resources on a server.

Because SilverNight supports transpiling, it can take advantage of this using asynchronous functions.

About the last point, it requires to understand the language's build process, so we will see it later.

### Promises

Before talking about asynchronous functions, let's talk about promises. Promises are a great tool when coming to asynchronous actions. It is modeled as a templated class, `Promise<T, X = Error>`, which takes at instanciation time two lambdas, the first one taking a single `T` value, the second one taking a single `X` argument.

Promises are basically a software conception of tasks that can either return a result or throw an error. Here is an example of promises, when dealing with filesystem tasks:

```sn
// We admit the function below is already defined
func readAsync (path: string) : Promise<int, Error>;

// Let's use it
readAsync('hello.txt')
  .then(lambda (content: string) => println!(`File's size is ${content.length} bytes.`))
  .catch(lambda (err: Error) => println!(`Something went wrong: ${content.message}`));

// And with ICT:
readAsync('hello.txt')
  .then(content => println!(`File's size is ${content.length} bytes.`))
  .catch(err => println!(`Something went wrong: ${content.message}`));
```

Here, the `then()` function simply registers the callback which will be called if the promise succeeds, while `catch()` registers the callback for the case it fails. Here, we don't use any `try`/`catch` block to handle potential errors ; there is callback for that.

We can also use the `.finally()` function that runs the provided callback after `.then()`'s and `.catch()`'s one, whatever the promise succeeds or fails.

Let's now write the `readAsync()` function:

```sn
func readAsync (path: string) : Promise<string, Error> {
  // Make a new promise and return it
  return new Promise<string, Error>(lambda (
      resolveCallback: func (content: string),
      rejectCallback: func (err: Error)
    ) {

    let content: string;

    // Read the file
    try {
      content = import!('fs').readFile(path, 'utf8');
    }

    catch (e) {
      // Failed
      rejectCallback(e);
    }

    // Success
    resolveCallback(content);
  });
}
```

Quite heavy, right? Let's see how this works.

First, we define a function that returns our promise. Here, `string` is its _success type_, and `Error` its _error type_. This function directly returns an instance of this promise class, and give it a callback that takes two arguments.

The first argument is the callback triggered in the case the promise succeeds, which must take a single argument with the `string` type. The second one is the same for the case the promise fails, and must take a single argument with the `Error` type.

Now we've seen the detailed syntax of this function, let's rewrite it with ICT:

```sn
func readAsync (path: string) : Promise<string, Error> =>
  // Make a new promise and return it
  new Promise<string, Error>((resolveCallback, rejectCallback) => {
    // Read the file and handle errors
    let content: string;

    try {
      content = import!('fs').readFile(path, 'utf8');
    }

    catch (e) {
      rejectCallback(e);
    }

    // Resolve the promise if the reading worked fine
    if content != null {
      resolveCallback(content);
    }
  });
}
```

This is a lot simplier already, but still heavy. A solution to make this function lighter is to use the `async` keyword, as we will see now.

### `async` functions

The `async` keyword describes an asynchronous function - it's pretty explicit. It forces the function's to return a promise and work only in it. To understand the concept, let's rewrite our `readAsync` function with this new keyword:

```sn
async func readAsync (path: string) throws Error : string => {
  try {
    resolve import!('fs').readFile(path, 'utf8');
  }

  catch (e) {
    reject e;
  }
}
```

Many things changed here, but this function works exactly as the original - though it's a clearly lighter.

To begin, the return type changed from `Promise<string, Error>` to a simple `string` and the function may throw an `Error` error.

Then, because the `async` keyword indicates our function is asynchronous, its body is transparently wrapped into a promise, with the callbacks binded to the `resolve` and the `reject` keywords. They call the callback they are related to and stop the function after that.

The powerfulness of these keywords is also they can be used inside a sub-function, like this:

```sn
async func readAsync (path: string) throws Error : string => {
  (lambda throws Error () {
    try {
      // A 'return' would just terminate this lambda and not resolve anything
      // But a 'resolve' terminates this lambda *and* the 'readAsync' function
      resolve import!('fs').readFile(path, 'utf8');
    }

    catch (e) {
      reject e;
    }
  })();
}
```

Also, when an error happens in an asynchronous functions, the error is automatically caught and transformed into a rejection. So, we could write our code like that:

```sn
async func readAsync (path: string) throws Error : string {
  resolve import!('fs').readFile(path, 'utf8');
}
```

If the filesystem fails to read the file, an error will be thrown, but because our function uses `Error` as its rejection type the error will be turned into a simple promise rejection.

Note that, even if the function's end is reached, the promise is not terminated until it encounters a `resolve` or a `reject` keyword. For example, in the code below:

```sn
async func infinite () throws Error : void {
  for i in 0..10 {
    println!('Hello world!');
  }
}
```

A call to the `infinite` function will return a promise which will never end.

This specificity excepted, the `async` keyword is pretty powerful when coming to simplify asynchronous functions. Plus, it makes clear for developpers and documentation systems that the function is asynchronous.

Note that there is also an asynchronous syntax for lambdas:

```sn
func takeAsyncCallback (callback: async func () throws Error : string) {
  callback()
    .then(message => println!(message));
};

takeAsyncCallback (async () => resolve 'Hello world!');
```

### Error-free promises

Error-free promises are promises that cannot perform a reject. They don't have a `reject` callback and are defined like this:

```sn
let promise = new Promise<string>(resolveCallback => {
  resolveCallback('Hello world!');
});
```

Note that it's still possible to perform a `.catch()` on error-free promises. The provided callback will simply never be executed.

Asynchronous functions can also be error-free. This happens when they never use the `reject` keyword and don't have any `throws` indicator. They keep the same declaration syntax but may not throw error anymore:

```sn
async func resolveHello () : string {
  resolve 'Hello world!';
}
```

This allows to avoid wrapping their call inside a `try`/`catch` block and makes more clear for other developers that the function will never fail. Also, instead of returning a standard promise, they return an error-free one.

Also, void-typed error-free promises can fully omit their return type, like for standard functions:

```sn
async func resolveHello () {
  for i in 0..10 {
    println!('Hello world!');
  }

  // Resolve manually, else the promise will never end
  resolve ;
}
```

### Single resolution

The _single resolution_ way allows us to to chain promises and use only one callback for the chain's resolution and one for the chain's rejection. It goes like this:

```sn
// Considering the following function:
async func fetch (url: string) : string;

Promise.all([
  fetch('/api/last-article/author.json'),
  fetch('/api/last-article/contributors.json'),
  fetch('/api/last-article/sources.json')
])
  // When all the promises are resolved, get their respective result
  .then(func (author: string, contributors: string, sources: string) : void {
    println!(author, contributors, sources)
  })
  
  // Else, get the error as well as the faulty promise
  .catch(func <T, X> (error: Error, errorAt: Promise<T, X>, fpIndex: uint) : void {
    println!(`Failed at promise ${fpIndex}.`);
    println!('Error is: ' + error.message);
  });
```

With type inference:

```sn
Promise.all([
  fetch('/api/last-article/author.json'),
  fetch('/api/last-article/contributors.json'),
  fetch('/api/last-article/sources.json')
])
  .then((author, contributors, sources) => {
    println!(author, contributors, sources)
  })

  // We use an alternative syntax with no template here,
  //  as all the promises have a common resolution type
  //  as well as a common rejection type
  .catch((error, faultyPromise, fpIndex) => {
    println!(`Failed at promise ${fpIndex}.`);
    println!('Error is: ' + error.message);
  });
```

Note that it's also possible to make a resolution callback that takes no argument, if don't want to get the resolution data:

```sn
Promise.all([
  fetch('/api/last-article/author.json'),
  fetch('/api/last-article/contributors.json'),
  fetch('/api/last-article/sources.json')
])
  .then(() => println!('It worked!'))
  
  .catch((error, faultyPromise, faultyPromiseIndex) {
    println!(`Failed at promise ${faultyPromiseIndex}.`);
    println!('Error is: ' + error.message);
  });
```

If all promises have the exact same resolution/rejection type, or have a resolution/rejection type that have a common parent class (like `Vector<string>` if they return either an `Array<string>` or a `List<string>`), it's possible to get the resolution data as an array:

```sn
// Etablish a set of promises
let promises: Promise<string, Error>[3] = [
  fetch('/api/last-article/author.json'),
  fetch('/api/last-article/contributors.json'),
  fetch('/api/last-article/sources.json')
];

// Uniform resolution type
Promise
  .all(promises)
  .then(data => println!(json) for json in data); // data: string[3]
```

We are of course not forced to prepare the promises first. We can also ask for inferring the chain's common type:

```sn
// Uniform resolution type for a set of promises
Promise
  .allInferred([
    fetch('/api/last-article/author.json'),
    fetch('/api/last-article/contributors.json'),
    fetch('/api/last-article/sources.json')
  ])
  .then(data => println!(json) for json in data); // data: string[3]
```

### Waiting for promises

Sometimes we have to perform some asynchronous actions and wait for their completion in order for the program to continue. For example, this can happen when loading a resource from the web or waiting for a user's input.

In order to solve this problem, we can use the `await` keyword, but **only** in asynchronous functions. Here is how it goes:

```sn
// Considering the following function:
async func sleep (delay: uint);

// Resolve a promise after a specific delay
async func delayedPrint (delay: uint) {
  println!('A'); // Prints: 'A'

  // Wait for the given delay...
  await sleep(delay);

  println!('B'); // Prints: 'B' after 1 second

  // Resolve the promise
  resolve ;
}

delayedPrint(1); // Prints: 'A'
                 // Prints: 'B' after 1 second
```

As we can see, `await` simply blocks the asynchronous function until the given promise is resolved. If it is rejected, it will simply throw an `AwaitRejectionError<T>` with `T` being the rejection type of the promise. Then, we can use its `.data` attribute to get the rejection error. This allows us to use even non-error rejection types.

Also, `await` returns the resolution value of the promise:

```sn
// Add two numbers after a second
async func delayed_add (left: int, right: int) : int {
  // Sleep for 1 second
  await sleep(1);
  // Perform the addition and return the result
  resolve left + right;
}

// Substract two after two seconds
async func delayed_sub (left: int, right: int) : int {
  // Perform the substraction as an addition and return the result
  resolve await delayed_add (0 - left, right);
}

delayed_sub(5, 2)
  .then(result => println!(result) /* Prints: '3' after 1 second */);
```

Note that `await` cannot be used in non-asynchronous functions, even if they are themselves inside asynchronous functions. Example:

```sn
// Asynchronous function
async func funcA () : void {

  // Not asynchronous function
  (lambda () {
    await somePromise; // ERROR (cannot use 'await' here)
  })();
}
```

### Get synchronous promises

As we saw, `await` is a great tool as it allows us to wait synchronously for a promise. But, it's unavailable when we are _outside_ an asynchronous function.

In fact, the point of this keyword is not to make promises synchronous or to block the function's execution until the promise is either resolved or rejected ; it's simply a way to resolve a promise without all the `.then()` and `.catch()` stuff, but it **never** aims to block the execution of the program. That's why it only works in asynchronous functions: waiting for a promise in a function that is already asynchronous doesn't block the program, it only 'blocks' the promise, which in all cases won't block the program itself.

Still, there is cases when we explicitly want to block the program's execution while the promise is not resolved nor rejected. For example, let's consider we want to make a program that retrieves the ten last articles from a blog and displays them in the terminal. Getting the articles from the web is, of course, asynchronous.

A first idea to achieve this would be to make ten promises, and when they are all resolved or rejected, display the result in a terminal. Considering a function to retrieve an article from the web (`async func getArticle (id: uint) : string`), here is the code:

```sn
Promise
  .all(fetchArticle(i) for i in 0..10)
  .then(articles =>
    println!(article) for article in articles;
  )
  .catch(err => println!('Failed to fetch articles: ' + err.message));
```

The main problem of this code is that we couldn't integrate it to a loop, for example. Let's imagine we have a `for` loop that does a lot of stuff and, in the middle of its body, retrieves the article, then do other stuff on it. We would have to transform the code in an asynchronous process that do the stuff while preparing each promise, and do the second stuff when they are resolved. That's heavy and isn't possible in all cases - for example if our loop is in a process that MUST be synchronous.

Another, more explicit example, of the limitations of `await` is when we deal with synchronous callbacks. For example, if we have an array of strings, and for each of them we want to return the content of an article (still in a process that must be synchronous), we are blocked because the callback of `.map()` (for instance) must be synchronous.

To solve this problem, we can _make the promises synchronous_ thanks to the `sync` keyword. It does the same thing than `await`, but works even outside asynchronous functions. So, why do we have two different keywords?

That's all a question of goal: while `await` aims to have a lighter and 'synchronous' wait of promises inside of another promise, `sync` aims to **block** the execution while the promise is not resolved nor rejected.

Here is the syntax:

```sn
for i in 0..10 {
  try
    println!(sync fetchArticle(i));
  
  catch (e)
    println!(`Failed to fetch article '${i}': ` + err.message);
}
```

This way, the loop is ran a synchronous way. To take again our `.map` example:

```sn
let articles = [ 2, 5, 8 ];
let articlesBody = articles.map(
  id => try sync fetchArticle(i) catch 'Failed to fetch article: ' + err.message
);
```

## Packages

In SilverNight, packages are formed by a folder containing _package descriptor_ called `package.toml` and one or more _modules files_ which are source code files - plus, optionally, other files like binaries or sounds. They are located under the `_packages` folder.

### Creating a package

First, create a new folder (with the name you want) which will be your project's directory. Inside of it, create a `main.sn` file and open it in your favorite code editor: this is our project's main file. Now, create a `_packages` folder, and inside it a `names_manager` folder. Create a `package.toml` and an `names.sn` files in it, then open them in the same code editor.

`main.sn` will be our main program, which will be ran when we will execute our program. The two other files will constitute the _package_ we will use.

#### The package descriptor

First, let's make our package descriptor. It's a TOML ([Tom's Obvious Language](https://github.com/toml-lang/toml)) file we will fill as follows:

```toml
[package]
name = 'names_manager'
version = '0.1.0'
authors = [ 'Your Name <you@example.com>' ]
license = 'MIT'
modules = [ 'names' ]

[dependencies]
```

This tells that our package's name is `names_manager` (that's why it is located in a `names_manager` directory) and gives informations about its version (which is very important as we'll see soon) as well as the list of its authors, plus the license it uses (you're free to change it, but since it's an example, there's no real point to do that now).

Next, it gives the list of the package's _modules_. Each module is a part of a package and is represented by a single file. In our case, because we have a `names` module, the program will look for a `names.sn` file. We could also use sub-modules, like `names/index` and `names/list` for example, with their respective source code files: `names/index.sn` and `names/list.sn` - but we will see this later.

Finally, it gives the _dependencies_ of the package (which are the packages required by this one).

There are other fields that can be present in the package descriptor, but they require to know the language's build process - which is to taught in this book. So, we will simply but them aside.

#### The package's source code

Now we've written our package descriptor, we can write the package's `names` module as specified in the descriptor, which will be written in `names.sn`:

```sn
#[module];

let name: string;

func defineName (newName: string with (_)) {
  name = newName;
}

func readName () : string throws Error {
  if name {
    return name;
  } else {
    throw new Error('Name is not defined.');
  }
}

export { defineName, readName };
```

First, the `#[module]` directive tells this is a module of the package. It defines a `name` variable, with two functions, one to set it, one to read it. Note that directives with a name between braces are called _head directives_, they describe a whole file and so must be placed at its head ; it wouldn't work if we placed it below the declaration of `name`, for example.

_Tip :_ As empty strings are NIL values and not non-empty strings, the `(_)` constraint only accepts non-empty strings.

The last line of the file **exports** some entities. This simply creates an object that will be available from the outside of the package, so `name` won't be available from the outside.

Note that we can also write `export *;` to export **everything** from the module. This is only if the module doesn't contain any private data.

Because a package's source code can (and will often) be heavy, we can use the `#include` directive to import a file's content at its position. Here is an example:

```sn
// File: 'index.sn'
#[module];

#include 'functions.sn';

let name: string;

export { defineName, readName };
```

Below is our functions file:

```sn
// File: 'functions.sn'
func defineName (newName: string with (_)) {
  name = newName;
}

func readName () : string throws Error {
  if name {
    return name;
  } else {
    throw new Error('Name is not defined.');
  }
}
```

Here, the content of `functions.sn` will be imported as it is right where the `#include` directive is. This way, we can split our source code into several files.

To manage better our inclusions, we can also include files using an alias:

```sn
// File: 'index.sn'
#[module];

#include 'functions.sn' as Functions;

let name: string;

export Functions;
```

Here, `Functions` is an object that contains all resources defined in `functions.sn`. All its members are constants, and thanks to type inference, we can export plain data like plain constants.

_Tip :_ The `#include` directive can be used everywhere, even outside a package. Think to it to structure your code!

### Importing a package

To import a package, we must use the `import` keyword followed by the package's _name_ (not its slug). So here is our `main.sn` file:

```sn
// Import the package
import names_manager;

// Use its exported entities
names_manager::names.defineName('John');
println!(names_manager::names.readName()); // Prints: 'John'

// Try to access an entity not exported by the package
println!(names_manager::names.name); // ERROR (because `name` hasn't been exported)
```

This is as simple as that. Also, because this package's name could be a little heavy, we can set up an alias during the import:

```sn
// Import the package
import names_manager as manager;

manager::names.defineName('John');
println!(manager::names.readName()); // Prints: 'John'
```

Note that `names_manager`'s content is strictly equivalent to the value exported by the package. Our one exported an object with two attributes referring to its functions, but it could have only exported a single function for example, so we would have been able to call `manager` as a function.

We can also use an alias to get only a module:

```sn
// Import the package
import names_manager::names as names;

names.defineName('John');
println!(names.readName()); // Prints: 'John'
```

Here, we only import the `names` module and alias it as `names`, so we don't have to write `names_manager::names` each time. Therefore, we still have a `names_manager` object available in our example, because we imported a part of the `names_manager` package anyway. But thanks to the alias, we don't have to write `names_manager::names` anymore.

Another, equivalent, syntax:

```sn
// This...
import names_manager::names as names;
// is *strictly* equivalent to:
import names from names_manager;
```

Note that it's also possible to import several packages at once:

```sn
// Import the packages
import names_manager, another_package;

names_manager::names.defineName('John');
println!(names_manager::names.readName()); // Prints: 'John'
```

Or import several modules from the same package, like this:

```sn
// This...
import frontend::console;
import frontend::filesystem;
// is *strictly* equivalent to:
import console, filesystem from frontend;
```

A last version of import is the _scope_ import:

```sn
scope import names_manager;

names.defineName('John');
println!(names.readName()); // Prints: 'John'
```

As you can see, scope imports act like standard imports but also _aliases_ all entity names to link them to the package's/module's ones in the _current scope_. So, we can access without writing the package's name all its entities from the current scope - this way, it prevents polluating the main scope. Be aware though to not overwrite some existing entities, this would result in an error, like declaring two entities of the same name. Also, because multiple packages could have entities with the same name, it's discouraged to import several packages in a given scope.

Note the analyzer transparently adds the following line to all programs (at their beginning, so it's located in the main scope):

```sn
scope import frontend::std;
```

This imports the `std` module from the `frontend` package (which is built in the toolchain, so every program can access it), whichs provides all the native stuff like `int` or `Array` and link them to global entities (meaning we don't have to write `frontend::std::int` for example).

#### Same level import

It is also possible to import a module that comes from the same level than the current one. For example, admitting we are in the `sub/one` module, we can access the `sub/two` module using the following syntax:

```sn
import local::two;
```

In a package, `local` refers to the parent module, so here to the `sub` module. Importing `local::two` is equivalent to importing `package_name::sub::two`. We can now use `local::two` as we want.

#### The `import!` flex

The `import!` flex allows to import a package directly as an object, so we can use it as we want. Here is an example:

```sn
val manager = import!(names_manager::names);

manager.defineName('John');
println!(manager.readName()); // Prints: 'John'
```

Also, the flex will not import the package several times, so we can perform multiple import on the same package without a problem:

```sn
import!(names_manager).defineName('John');
println!(import!(names_manager).readName()); // Prints: 'John'
```

This will work as expected. A good point about this flex is that the package isn't imported multiple times ; once you imported it, either with `import` or `import!`, it will just retrieve the imported data.

### Sub-modules hierarchy

Sub-modules are modules written inside sub-folders of the package (called their _parent_). When we import the parent module, it also imports all its sub-modules (called its _children_). To illustrate the concept, let's imagine we have package called `universe`, which contains two modules: `planets` and `life`. `planets` contains two sub-modules: `earth` and `others`, while `life` contains `animals`, `insects` and `humans`. Here is our package descriptor:

```toml
[package]
name = 'names_manager'
version = '0.1.0'
authors = [ 'Your Name <you@example.com>' ]
license = 'MIT'
modules = [
  'universe/planets/earth',
  'universe/planets/others',
  'universe/life/animals',
  'universe/life/insects',
  'universe/life/humans'
]

[dependencies]
```

Now, here is the structure of our folder:

```plain
universe/
│
├── package.toml
├── planets/
│   ├── earth.sn
│   └── others.sn
├── life/
│   ├── animals.sn
│   ├── insects.sn
│   └── humans.sn
```

Let's write these files:

```sn
// _packages/universe/planets/earth.sn:
#[module];

export { type: 'planet', isEarth: true};

// _packages/universe/planets/others.sn:
#[module];

export { type: 'planet', isEarth: false };

// _packages/universe/life/animals.sn:
#[module];

export { type: 'animal', isInsect: false };

// _packages/universe/life/insects.sn:
#[module];

export { type: 'insect', isInsect: true };

// _packages/universe/life/humans.sn:
#[module];

export { type: 'human', isInsect: false };
```

Here is our test file:

```sn
// main.sn:

// => Import a sub-module
import universe::planets;
// Same as doing:
// > import universe::planets::earth;
// > import universe::planets::others;

// Test:
println!(universe::planets::earth::isEarth); // Prints: 'true'
println!(universe::planets::others::isEarth); // Prints: 'false'

// => Import a sub-module with an alias
import universe::life as life;
// Same as doing (without the alias):
// > import universe::life::animals;
// > import universe::life::insects;
// > import universe::life::humans;

// Test:
println!(universe::life::animals::isInsect); // Prints: 'false'
println!(universe::life::insects::isInsect); // Prints: 'true'
println!(universe::life::humans::isInsect); // Prints: 'false'
```

As you can see, importing a module automatically imports all its children. We can even do sub-sub-modules, and so importing their parent (a sub-module) will import them all automatically.

### Namespaces hierarchy

The `package::module::submodule::...` model is based on the concept of _namespace_. Basically, a namespace is a block (so it has a reserved scope) with a name. To access an entity from the outside of the namespace, we simply write `the_namespace_name::the_entity`. Here is an example:

```sn
// Declare a namespace
namespace Hello {
  // Declare a function in it
  func world () {
    println!('Hello world!');
  }

  // Export the data from it
  export { world };
}

// Call the function from the outside of the namespace
Hello::world(); // Prints: 'Hello world!'
```

Note that, by default, all the code we write is not located inside any namespace. But each package has its own namespace, and each module in it has its own namespace too.

So, when we import a package called, for example, `hello_world`, it creates a namespace with the same name (if we use the default import syntax).

#### Sub-namespaces

Namespaces can also be imbricated: it's possible to declare a namespace called `B` inside another called `A` and so we access the entities using:

```sn
namespace A {
  namespace B {
    func world () { println!('Hello world!'); }

    // From the inside of B
    world();

    // Export a function from B
    export { world };
  }

  // From the inside of A
  //  but from the outside of B
  B::world();

  // Export a whole namespace from A
  export { B };
}

// From the outside of A
A::B::world();
```

#### Accessing top namespaces

Let's consider the following example:

```sn
namespace A {
  val age = 18;

  export { age };
}

namespace B {
  // I want to print `age` from the `A` namespace
}
```

How could we achieve printing `age` that is located inside the `A` namespace? Simply by using the `\` symbol to indicate we want to access a root namespace:

```sn
namespace A {
  val age = 18;

  export { age };
}

namespace B {
  println!(\A::age);
}
```

To access global data, we can simply use the `global` namespace (which refers to the main scope):

```sn
val age = 16;

namespace A {
  val age = 18;

  println!(\global::age); // Prints: '16'
}
```

### Project as a package

Did you know that any project we make could be considered as a package? For that, all we have to do is to create the package descriptor `package.toml` in our project's root folder, and so we can manage its dependencies. When you need some package, simply use `snt add <package_name>` and so on.

When someone will get your project, we may not want to transfer all the packages you use (some can be very heavy), especially if publishing on a public repository for example. So, we can simply release the project folder, without the `_packages` directory, and any person wanting to run the project will simply have to run `snt install` inside the project's root folder to download all its dependencies, thanks to the _lockfile_.

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
func sum (...numbers: int) : int {
  let summation = 0;

  for num in numbers {
    summation += num;
  }

  return summation;
}
```

The first line describes, as usual, the function (what it does): Make a summation from a list of numbers. Then, we describe each argument using `@param` (it's called a _documentation annotation_), followed by the argument's name, and what it contains: A list of numbers. Finally, we indicate what the function returns using `@returns` followed by the returned value: the summation.

Note that we don't have to use `@returns` for void-typed functions.

### Nested functions

To document nested functions (e.g. callbacks), we document them as usual functions using a `>` symbol, with the argument's annotation being the callback's one:

```sn
/**
 * Make a summation from a generation function
 * @param generation The generator to make the summation from
 * > @returns A list of values
 * @returns The summation
 */
func sum (generation: func () : int[]) : int {
  let summation = 0;

  for num in generation() {
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
func sum<T extends number> (iterator: Iterator<T>) : T {
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
func increment (num: *mut int) {
  *num += 1;
}
```

Examples aim to be as short and as explicit as possible. Note that it's possible to give several examples for the same function.

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
func double (num: int) : int throws ErrorType1, ErrorType2 {
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
func getValue (arr: int[], index: usize) : int {
  return arr[index];
}
```

### Polymorph functions

Polymorph functions that does exactly the same actions but on different types can use the `@samedef` annotation to keep the exact same description across its definitions:

```sn
/**
 * Get a value from an array
 * @param arr The array to get a value from
 * @param index The index of the value to get
 * @returns The requested value
 * @condition 0 <= index <= arr.length
 * @samedef
 */
func getValue (arr: int[], index: usize) : int {
  return arr[index];
}

func getValue (arr: string[], index: usize) : string {
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

### Class segments

Segments are described like assignable entities:

```sn
class B<T> {
  public value: T;

  /**
   * Segment for number types
   */
  segment (T ~ number) {
    public func double () => @value * 2;
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
  func increment (num: *mut int) {
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
func sum (...numbers: int) : int {
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

Dynamic annotations allow to set and read a value using annotations. It can be useful to document functions that are re-implemented in child classes, without rewriting the whole documentation in the children. Here is an example, using the `@class` class which is automatically replaced by the real class name (`_this`' name):

```sn
virtual class A {
  /**
   * Create a new value of @class and return it
   * @returns A new instance of @class
   */
  public func create () : _this;
}

class B extends A {
  public func create () : _this => new _self();
}

class C extends A {
  public func create () : _this => new _self();
}
```

This code is strictly equivalent to:

```sn
virtual class A {
  /**
   * Create a new value of A and return it
   * @returns A new instance of A
   */
  public func create () : _this;
}

class B extends A {
  /**
   * Create a new value of B and return it
   * @returns A new instance of B
   */
  public func create () : _this => new _self();
}

class C extends A {
  /**
   * Create a new value of C and return it
   * @returns A new instance of C
   */
  public func create () : _this => new _self();
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
  public func nothing () => null;
}

/**
 * @classname(signed number)
 */
class SignedNumber extends A {}
```

Equivalence:

```sn
class Number {
  /**
   * Do some number stuff
   */
  public func nothing () => null;
}

class SignedNumber extends A {
  /**
   * Do some signed number stuff
   */
  public func nothing () => null;
}
```