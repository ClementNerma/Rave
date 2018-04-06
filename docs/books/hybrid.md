# The Hybrid Book

## Introduction

Welcome to _"The Hybrid Book"_, a feature-exhaustive tutorial to learn SilverNight. SilverNight is borned from the wish to have a language almost as simple as JavaScript or Python but as powerful, safe and fast as Rust to cover most of developers' needs. It is a statically-typed, functional programming language. Intended for multi-platform development, it comes with great flexibility and a large native library.

**WARNING: Please note this language is not finished yet ; some features could and WILL be added, modified or removed at anytime. It's still a draft at this point and no feature or syntax is frozen.**

### Why is it an hybrid book?

This book is called "hybrid" because it provides a simple specification for the language but also acts as a tutorial for persons who want to learn it from the beginning to the very end.

### For whom is this book?

This book is for everyone who wants to learn all the features of SilverNight, or simply for developers who are curious to know how this language works.

In order to fully understand this book, you should already know at least one other programming language (the lower level it is, the better), ideally with a good knowledge in Object-Oriented Programming (OOP) because SilverNight always deal with objects.

Please note if you simply want to learn the language, you should read **The SilverNight Book** (not published yet) instead. This hybrid book aims to provide a deep, complex view of the language with all of its detailed concepts.

### Who is this language for?

SilverNight's purpose is to provide a multi-platform compatibility coupled with an expressive syntax. Because of that, this language is not designed for very low-level applications, like drivers or operating systems - though it's still possible to make them, it is not originally intended for. In order to make such low-level programs, you should use other programming languages such as [C++](https://en.wikipedia.org/wiki/C%2B%2B) or [Rust](https://www.rust-lang.org).

### Setting up environment

#### Installation

**As the compiler is not done yet, your programs will not compile and you will not be able to run it. The book is here to detail the languages' concept and the way it works. Thanks for your understanding.**

As a pre-requisite you must have [Git](https://git-scm.com/) as well as [Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com) (or [NPM](https://www.npmjs.com)) installed on your computer.

Open a terminal and run the following commands:

```bash
git clone https://github.com/ClementNerma/SilverNight.git
cd SilverNight/compiler
yarn install-tools # NPM: `npm run install-tools`
```

_NOTE :_ As this program installs the tools on your computer, you may have to run the `install-tools` command with `sudo` on Linux systems.

To check if all the tools were correctly installed, simply run this command in a terminal:

```bash
snt -v
```

If it shows you a version number, the tools are available globally.

#### Compiling programs

You can write SilverNight with any text editor - even with the Windows' Notepad! But we advise you to use a code editor, like [Atom](https://atom.io) or [Visual Studio Code](https://code.visualstudio.com), and install the SilverNight [support extension](https://github.com/ClementNerma/SilverNight#syntax-highlighting-support)  for them. This will highlight your code following different rules to make it more pleasant to see.

Once you wrote your code, save it in a file with the `.sn` extension. Then, open a terminal and go into the folder in which your file is, and run `snt program.sn` (replace `program.sn` by the name of your file) to compile it. This will produce an executable file in the same directory (the name will depend on the platform you are using). You can run this executable directly on any computer that is under the same platform.

#### Commenting your code

SilverNight has several types of comments for different purposes, but the main ones are the single-line and the multiple-line comments. These are passive comments (which means they don't do anything and are completely ignored by the compiler).

To write a single-line comment, write `//` just before your comment. Everything written **after** this double slash will be ignored until the end of the line.

For multi-line comments, open the comment with `/*` and close it with `*/`. You can split it across several lines, or put in the middle of a line.

Showcase:

```sn
// This a comment;

println!("Hello"); // This is still one

/* This is a
   multi-line
   comment */

println!(/* Even in the middle of a line */ "Hello");
```

#### Displaying values

We can display values to your terminal (called _output_) by using the `println!` macro (we'll see what is a macro later in this book).

```sn
println!("Hello !");
```

For now, consider we can display any value with it, only special values (like custom classes or conceptual resources) cannot be displayed, but we will see this in details before we encounter this problem.

### Vocabulary

Here is a list of terms used in SilverNight. Most of them are unknown for you at the moment, but this section aims to provide a way to clearly know the meaning of each term. Don't hesitate to go back there if you forgot the meaning of a term.

#### About concepts

* A **block keyword**, or **block name**, is the name of a block (like `for` or `while`)
* A **block head** is the head of a block, written between `()` parenthesis ; its syntax depends on the the block it is used with
* A **block** is the combination of a block keyword, eventually a block head, an opening bracket `{`, a list of instructions called the **body**, and a closing bracket `}`
* An **inline block** is an inline variant of a block, with a syntax depending on the used block
* A **directive** is an indicator to change the default behaviour of a part of the code at build time

#### About tools

* The **builder** is the part of the toolchain that is ran whatever a SilverNight source code is compiled, transpiled or interpreted ; it turns a SilverNight source code into a valid AST
* The **compiler** is the part of the toolchain that turns a valid SilverNight AST into machine code
* The **interpreter** is the part of the toolchain that runs on-the-fly a SilverNight AST
* A **transpiler** is a part of the toolchain that converts a SilverNight AST into a another language's source code
* The **toolchain** is a suite of tools which, combined, can compile, interpret, transpile, build a package from, etc. a SilverNight source code or an intermediary step of compilation (like an AST)

#### About resources

* A **resource**, also called an **entity**, is anything that can be declared (variable, frozen, class, interface, structure...) or used as a value
* A **value** is the result of an expression, which can either be a primitive or an object
* A **plain value** is a value that is predictable without running the program itself (e.g. `2` or `"hello"`)
* A **type** is either a class or an interface

#### About types

* A **primitive** is either an instance of `void`, `bool`, `Number` or `string` - nothing else.
* An **object** is any type that is not a primitive, or any structure, interface, class or trait.
* **Typecasting** is the action of converting a type into another

#### About operators

* An **operator** is a single symbol or a group of symbols which can't syntaxically be the name of a function and that can manipulate from one argument (to its right) to two arguments (one to its left, one to its right).

#### About mutability

* An **assignable entity**, also called a **variable** or even a **mutable**, is a resource that can receive a single value and must have a type.
* A **constant** is a mutable that must receive a value when it is declared and can't change it
* A **frozen** is a constant with all its properties (including sub-objects, at any level) constants

#### About declarations

* A **signature** describes an entity
* A **declaration** is the combination of a **declaration keyword** (e.g. `let`, `struct`, `class`) and a signature
* An **initialization value** is the action of assigning a value to an assignable entity before closing its declaration

#### About functions

* A **function** is any piece entity that can be invoked using arguments (including classes' methods)
* A **lambda** is a unnamed function
* A **callback** is a function given as another function's argument (it can be a lambda)
* A **flying lambda** is a lambda that is declared only when invoking another function to be one of its arguments
* A **macro** is a function that is ran at build time and that replaces its own call by another content

#### About classes

* A **member** either available from the outside, or from the inside of the class, without calling any specific function
* An **attribute** is an assignable member of a class
* A **method** is a function member of a class
* The **accessibility** of a member is either `public`, `protected`, `private`
* A **template** is a reference to a class
* An **overload** is a function that rewrites a native behaviour at the level of a class

#### About interfaces and traits

* An **interface** is a list of members (without their body) a class must implement if it explicitly implements it, and is also a type that accepts thanks to cross-typing any class implementing (even implicitly) all its members
* A **trait** is a list of members (eventually with their body) a class must implement if it explicitly implements it

#### About dictionaries

* A **dictionnary** is the instance of a class child of `Dictionary` or of the `Dictionary` class itself ; it links keys with a type given by a template with values with a type given by a template
* A **vector** is a dictionary with positive integer keys, and values with a type given by a template ; it's a list of elements
* A **list** is a vector with a fixed size
* An **array** is a vector with a dynamic size

#### About superoverloads

* A **superoverload** is a function that rewrites a global behaviour (like error handling or operators)

#### About errors

* An **error** is the instance of a class child of `Error` or of the `Error` class itself ; it can be thrown manually or automatically

#### About nullable types

* A **nullable type** is a type that can either be the provided type of an instance of the `void` class

#### About pointers

* A **RUID**, standing for _**R**eference **U**nique **Id**entifier_, is a unique identifier granted by the builder to each object (several entities can share the same RUID)
* A **EUID**, standing for _**E**ntity **U**nique **Id**entifier_, is a unique identifier granted by the builder to each entity (several entities cannot share the same EUID except using to pointers)
* A **reference** is a link to an object using its RUID
* A **pointer** is a link to an entity using an EUID

## Variables and typing

In SilverNight, everything is primitive or object. Even single numbers or strings, which are primitives, can use some features reserved to objects in many other programming languages. To describe what a primitive or an object is, we use a _type_. What is a type? That's simply a set of methods, properties and other tricks that provides tools to manipulate a resource, like a variable or a constant. You can also see it as a describer that indicates what kind of value a resource can take.

_Tip :_ For those who already programmed in Java, C, C++ or Rust, the concept of type is roughly the same in SilverNight.

There's several way to declare a resource in SilverNight. Let's take a look at variables (mutable resources). We define it with the `let` keyword and give them a _type_ (the class that describes it).

```sn
let hello: string;
```

This will declare a mutable string called "hello". When declared like this, an empty string is put in this (we call it an _instance_ of the "string" class).

To assign a contant, use the `=` operator:

```sn
let hello: string;
hello = "I am a variable!";
```

We can also assign a value in the declaration statement:

```sn
let hello: string = "I am a variable!";
```

This syntax is kind of heavy. Because we don't want to declare a type and an initial value for each variable, we can use a feature called _inferred typing_ which guesses the variable's type thanks to the value we assign to it.

```sn
let hello = "I am a variable!";
```

In the above code, the compiler understands we are trying to assign a string to `hello`, so it guesses its type is `string`.

### Mutability

Some data are not intended to be modified. To store them, we use _constants_, which are declared like variables but with the `val` keyword:

```sn
val constant = "I am a constant!";
```

We can also specify the constant's type, but we will have to give it an initialization value anyway.

```sn
val constant = "I am a constant!"; // Works fine
val constant: string = "I am a constant!"; // Works fine
val constant: string; // ERROR: Initialization value expected
```

Constants cannot have their value changed, so we can't use the `=` operator on it. See them as read-only resources with a value that can't change through the time. Though, we can still use other resources to initialize them:

```sn
// Declare a variable
let str = "I am a string!";

// Declare a constant
val constant = str;

// Assign a new value to the constant
constant = "A new value"; // ERROR: Cannot assign a value to a constant
```

### Plain constants

We can also declare "_plain constants_", which are explicit values that can be used by the compiler to optimize some calls but also to perform additional tests about program's validity. Some functions also require plain constants, as we will see later. Basically, a plain constant is a value that won't change whatever the program's running conditions are. That means it must not be impact by user's input, platform-dependent variables and behaviours, current time or geolocation, etc.

```sn
// Declare a plain constant
pln MY_JOB = "Developer";
```

A convention is to use a capitalized name for plain constants, to make them distinctive from variables and basic constants. As always, we can declare the value's type, but it's still optional. Note that we cannot assign any content taken from a variable or a standard constant here.

```sn
val MY_JOB = "Developer";
pln MY_REAL_JOB = MY_JOB; // ERROR: Plain value expected
```

We can only assign values from other plain constants:

```sn
pln MY_JOB = "Developer";
pln MY_REAL_JOB = MY_JOB; // Works fine
```

Prefer declaring values using plain (or simple) constants instead of mutables when you won't change their value. This prevents these theorically immutable datas from being modified by error. Plus, in some languages like JavaScript, it even makes the programs (a bit) faster.

### Primitive types

There are two categories of types in SilverNight: _primitives_ and _objects_. The first ones are voids, booleans, numbers and strings. Everything else is not a primitive type.

Primitive types can access additional features object types cannot use, such as the optional operator `.=`. It will assign the provided value on its right if and _only if_ the value is NIL (any value between: `null`, `false`, `0`, `""`). This doesn't work with the other types.

## Numbers

### Integers

There is not only one type to represent numbers. The "default" one is **int**, also known as **int32**, a signed 32-bit integer. Basically, it can handle any number between `−2,147,483,648` and `2,147,483,647`.

Here is the table of types with their respective capacities:

|    Type   |            Minimum           |            Maximum           |
|-----------|------------------------------|------------------------------|
| `int8`    | `-128`                       | `127`                        |
| `uint8`   | `0`                          | `255`                        |
| `int16`   | `-32,768`                    | `32,767`                     |
| `uint16`  | `0`                          | `65,535`                     |
| `int32`   | `−2,147,483,648`             | `2,147,483,647`              |
| `uint32`  | `0`                          | `4,294,967,295`              |
| `int64`*  | `-9,223,372,036,854,775,808` | `9,223,372,036,854,775,807`  |
| `uint64`* | `0`                          | `18,446,744,073,709,551,615` |

_*_ : Please be aware that numbers higher than 32-bit could not be handled by some operating systems. For example, `int64` could not be supported in all platforms.

Note that, the more bits a number uses for its representation (for integers, this is the number written after `int`, like 32 bits for `int32`), the more memory it takes. By default, integers use the `int32` type, but if you don't need such big numbers, you can still use the `int16` type instead. This is especially important when making programs for platforms with a very limited amount of memory (like Arduino boards), in this case you can even use the `int8` (`byte`) type (handling from `-128` to `127`).

To conclude, always use the smallest type number you have to. If you are dealing with numbers from `0` to `40,000`, instead of using a `int32`, simply use a `uint16` instead.

### Floating-point numbers

SilverNight also supports floating-point numbers. There are two signed types for them, `float`, `double`. Unlike integers, there isn't unsigned floating-point number types.

Their ranges is huge but, where numbers have an exact value, these types have a limited precision:

* `float` handles from `~ 1.2 * 10^-38` to `~ 3.4 * 10^+38` with a 6-decimal precision ;
* `double` handles from `~ 2.3 * 10^-308` to `~ 1.7 * 10^+308` with a 15-decimal precision.

As you can see, the floating-point types can handle huge ranges, but they don't have the same precision. For example, substracting `0.0000003` (7 decimals) to a `floating` will have no effect at all (but it will on `double`, which has a better precision).

_Tip :_ `float` costs 32 bits in memory, while `double` costs 64 bits.

```sn
let num: float = 1;
num = num - 0.0000003; // num is still equal to 1
num = num - 0.000003; // This time, the substracting affected it

let longnum: double = floating; // Works fine
longnum = longnum - 0.0000003; // This time it affects the variable because
                               // `double` type has a better precision
```

### The floating-point problem

A problem that low-level languages (like C or SilverNight) compilers often encounter is how to interpret user's numbers when doing several operations. For example, let's take this code:

```sn
val result = 2 / 3;
```

Why does the compiler understand here? It sees an integer divided by an integer, so the result should be an integer. But any human would understand the result should be here a `float` as the result is around `0.66666...`.

Because of this confusion, the above code will produce `0`. An unexpected number that could result in strange behaviours in your programs. The simpliest and shortest way to indicate you are dealing with a `float` is to do explicit conversion:

```sn
val result = 2.0 / 3.0;
```

Giving a decimal part to a number indicates it's a `float` (or a `double` if it exceeds the range), even if it's `.0`.

### Alternative bases

Because sometimes we don't want to deal with decimal numbers, but also with binary, hexadecimal or even octal values, there is a way to represent them in their original base:

```sn
val dec1 =    92; // Decimal
val dec2 = 0d192; // Decimal

val bin = 0b110; // Binary
val oct = 0o675; // Octal
val hex = 0xFFA; // Hexadecimal
```

Note that all numbers, whatever is the representation you use, are converted to decimals and manipulated by the computer as bits. This is just a way to represent simply numbers in an alternative base.

### Underscore separator

Representing large numbers can quickly become a big deal without a number separator. Because the comma `,` is reserved to separate arguments and the single quote `'` to delimit strings, we will use the underscore `_` symbol.

```sn
0b10000011;
0b1000_0011; // Strictly equivalent
```

When writing a plain number, all underscores are simply removed from its representation.

### Overflow and underflow

A specificity about numbers is the concept of _overflow_ and the similar concept of _underflow_. When dealing with a `int8` for example, if we write:

```sn
let num: int8 = -128;
num = num - 1;
println!(num);
```

The expected result is `-129`. But, because this type cannot handle it, it will _underflow_, and so it will come back to its maximum value, which is `+127`. So, the code above will print `127`, which is unexpected. Be aware of that!
The same behavior applies when dealing with the upper limit of numbers.

```sn
let num: int8 = 125;
num = num + 5;
println!(num); // Prints: "-126"
```

### Operators

#### Mathematical operators

_Operators_ are symbols that provides a way to add, substract, multiply or do some operations with one or several numbers. The most common ones are the addition `+`, the substraction `-`, the multiplication `*` and the division `/` operators. Here's how we use it:

```sn
val result = 2 + 5; // Perform an addition
```

If we tell you `2` and `5` are both `int` resources, you can guess the `result` variable will have the same type. Mathematical operators always take two numbers and return a number.

The list of mathematical operators is:

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

_NOTE :_ As we will see later, mathematical operators can in fact handle any type if some pre-requisites are done. Manipulating numbers is their elementary usage.

#### Incremental operators

There only two incremental operators, they only take a variable (not a constant or a plain value) and change its value depending on the operator. We can write the operator before or after the variable's name but be aware, this will change the operator's effect.

* `variable ++` (post-increment operator, increment `variable` and return its old value)
* `++ variable` (pre-increment operator, increment `variable` and return its new value)
* `variable --` (post-decrement `variable` and return its old value)
* `-- variable` (pre-decrement `variable` and return its old value)

Showcase:

```sn
let variable = 0;

println!(variable ++); // Prints: "0" ; variable = 1
println!(++ variable); // Prints: "2" ; variable = 2
println!(variable --); // Prints: "2" ; variable = 1
println!(-- variable); // Prints: "0" ; variable = 0
```

#### Bitwise operators

These are bit-by-bit operators - operators that work on each single bit of numbers. They take two number and return a number.

They are:

* `&` (bit-by-bit and)
* `|` (bit-by-bit or)
* `^` (bit-by-bit exclusive or)
* `<<` (binary left shift operator)
* `>>` (binary right shift operator)

The last bitwise operator takes a single number and returns a number: that's the one's complement `~` operator.

Showcase:

```sn
pln A = 60; // A = 0011 1100
pln B = 13; // B = 0000 1101

A & B;  // 0000 1100 : 12
A | B;  // 0011 1101 : 61
A ^ B;  // 0011 0001 : 49
~ A;    // 1100 0100 : -60 (for signed integers - two's complement form)
A << 2; // 1111 0000 : 240
A >> 2; // 0000 1111 : 15
```

#### Logical operators

These are operators that take one or two entities they convert to booleans (`false` if it's a NIL value, `true` else) and return a boolean.

The logical operators are:

* `&&` (and, alias: `and`)
* `||` (or, alias: `or`)
* `>` (greater than)
* `<` (less than)
* `>=` (greater than or equal to)
* `<=` (less than or equal to)
* `==` (equal to)
* `!=` (not equal of)
* `nand` (not and)
* `nor` (not or)
* `xor` (exclusive or)
* `!` (not) - which takes only one value (alias: `not`)

Showcase:

```sn
pln A = 0_b_0011_1100;
pln B = 0_b_0000_1101;

A && B; // true
A || B; // true
A > B; // true
A < B; // false
A >= B; // true
A <= B; // false
A == B; // false
A != B; // true
A nand B; // false
A nor B; // true
A xor B; // false
! A; // false
```

#### Assignment operators

Unlike operators above that create a value from two other ones, assignment operators directly affect to the variable they are applied on.

The list is: `+=` (add), `-=` (substract), `*=` (multiply), `/=` (divide), `%` (modulate), `**=` (pow).

For example, doing `var += 5` is exactly like `var = var + 5`. The same thing applies for all assignment operators.

Showcase:

```sn
let value: int = 0;

value += 8; // value == 8
value -= 6; // value == 2
value *= 9; // value == 28
value /= 4; // value == 7
value %= 5; // value == 2
value **= 3; // value == 8
```

#### Concatenation

In SilverNight, the `+` (add) operator also acts as the _concatenation operator_. It provides a way to _concatenate_ two stringifyable entities, like a `string` and an `int`. For example, if we have a variable called `area` and we want to display its value with a message, we can do:

```sn
println!("The area is: " + area);
```

Here, the compiler will understand we want to do a concatenation because the first entity is a string, and the second one a number. So it will perform the concatenation.

#### Bonus: String expressions

Here is a useful trick when using strings: we can _evaluate an expression_ from the inside of a string and get its result directly. Let's try it:

```sn
val area = 8.5;
println!("The area is: " + area); // "The area is: 8.5"
println!(`The area is: ${area}`); // "The area is: 8.5"
```

As you can see, here we use backquotes to delimit the string. In the last `println!` statement, `${...}` indicates an expression that must be evaluated and returned in the string. Here, `area` is evaluated as `8.5`, converted to a string, then returned.

The code above would also work fine:

```sn
println!(`This is ${'go' + 'od'}`); // "This is 'good'"
```

Because the `'go' + 'od'` expression is evaluated and its result (`good`) returned in the string.

Think about this feature when using strings with dynamic values!

## Understanding types

### Vectors

When we want to represent a list of data in SilverNight, we use _vectors_. First, they are **lists**, which have a fixed length, and **arrays**, which are extensible.

Let's declare a list of 3 names:

```sn
let names: string[3];
```

Here, `names` is a list with 3 values, not extensible. We can access its elements by doing:

```sn
println!(names[0]); // First element
println!(names[1]); // Second element
println!(names[2]); // Third element
```

As you can see, indexes start at `0`. That's a standard implementation of vectors in almost any programming language. If we run the code above, it will display three empty strings, because we haven't initialized our list yet. We know have several choices:

* Assigning values at declaration ;
* Assigning them _after_ declaration ;
* Assigning them one by one

Here is how to implement all of them:

```sn
// Assigning values at declaration
let list: string[3] = [ "Jack", "Lucy", "Thomas" ];

// Assigning values after declaration
let list: string[3];
list = [ "Jack", "Lucy", "Thomas" ];

// Assigning values one by one
let list: string[3];
list[0] = "Jack";
list[1] = "Luy";
list[2] = "Thomas";
```

We can even declare the list without its type:

```sn
let list = [ "Jack", "Lucy", "Thomas" ];
```

To define an array, we do like this:

```sn
let list: string[];
```

We don't even have to declare a length because it is not fixed, so we can add and remove elements whenever we want. Let's rewrite the three assignment methods, for arrays:

```sn
// Assigning values at declaration
let list: string[] = [ "Jack", "Lucy", "Thomas" ];

// Assigning values after declaration
let list: string[];
list = [ "Jack", "Lucy", "Thomas" ];

// Assigning values one by one
let list: string[];
list.push("Jack");
list.push("Lucy");
list.push("Thomas");
list[2] = "Thomas";
```

As you can see, if we except the length value, only the third way changed. We know _push_ new elements, instead of assigning them. We can also remove the last pushed element by doing `list.pop();` which also returns this element (so we can do `let last = list.pop();`).

We can also access indexes with variables:

```sn
let value: int = 1;
println!(list[value]); // Prints: "Lucy"
```

### Templated types

Let's now see what vectors _really_ are. They are in fact represented by two classes, `List` and `Array`. There are different on some little points:

* `List` is a fixed-length list. We cannot extend it or remove some elements, we can just do some operations on the elements it contains ;
* `Array` is an extensible list.

We will be able to access exactly the same functions for both the `List` and the `Array` type, excepted there are some additional ones for `Array` (like extension or elements removing).

There is a specificity about these types, though. If we simply try to create variables with them, like for a list of names:

```sn
let names: List; // ERROR
```

Iyr program won't work. Why? Because these types are called _templated_ types. This mean they need _another type_ to work correctly. In fact, vectors need to know what _type_ of values they will handle. In our case, we want to store a list of names, which are strings, so let's declare it:

```sn
let names: List<string>;
```

Here, `List` is called a _templated type_ and `string` is called its _template_. There's still a problem though: while arrays have a flexible length, lists have a fixed one. So we know have an empty `names` list we cannot anything with. Let's say we have 3 names:

```sn
let names: List<string> = new List<string>(3);
```

Here's a keyword we don't know: `new`. It simply creates an _instance_ of a type, and returns it. An instance is always an object, excepted for primitive types that are very special - in their case it returns a primitive.

We give one argument to `List` here: `3` is the length of the list. But this syntax is still heavy, so let's shorten this declaration:

```sn
// Inferred type allows us to omit the type
let names = new List<string>(3);
// There is also a syntax sugar for lists:
let names: string[3];
```

The second line above works exactly like the first one: they both declare a new list with 3 values.

Let's know see how we declare an array:

```sn
// The fully explicit version
let names: Array<string> = new Array<string>;
// Inferred type version
let names = new Array<string>;
// Syntax sugar version
let names: string[];
```

We can now use them as we saw previously.

### Tuples

Tuples are lists that can combine mixed types. They are defined as follows:

```sn
val tuples: (int, float, string) = (2, 4.8, "Hello");
```

Thanks to inferred typing, we can simply write:

```sn
val tuples = (2, 4.8, "Hello");
```

To get or set a value from a tuple, we simply use an index as for lists:

```sn
println!(tuples[2]); // Prints: "Hello"
```

Though, indexes must be plain numbers. They can't be a variable, because the type of each member of the tuple may be different. An exception is plain constants, which can be used for indexes:

```sn
val index1 = 1;
pln index2 = 2;

println!(tuples[index1]); // ERROR
println!(tuples[index2]); // Prints: "Hello"
```

Note that, as for lists, tuples are considered as a single type (even if it can combine several values of different types).

### Structures

We now want to represent a video game hero. It has a name, Health Points (HP), Magic Points (MP), attack and defense points. How could we describe this? A first idea would be to make a list of five elements, the first element referring to the name, the second one to the HP, the third one to the MP, and so on. But this is not very readable and hard to maintain.

A great tool to make custom objects is the _structure_. It acts like a class, but we define its properties and methods. It is not exactly a class, but we'll do as if it was one - for now, at least. Here's how it works:

```sn
struct Hero {
  name: string;
  hp: int;
  mp: int;
  atk: int;
  def: int;
}
```

Now, we can instanciate it like we would do with any other type:

```sn
let jack: Hero;
```

All the structure's properties have been initialized to their NIL value: the name is an empty string, the hp, mp, attack and defense are equal to 0.

Let's remediate to that by giving values at declaration time!

```sn
let jack: Hero = {
  name: "Jack",
  hp: 80,
  mp: 10,
  atk: 20,
  def: 5
};
```

All properties can be assigned anytime. We could do `jack.hp += 5;` whenever we want. But we want to name to be constant. So, in the structure, we change:

```sn
  // ...
  name: string,
  // ...
```

To:

```sn
  // ...
  val name: string,
  // ...
```

And the property will be constant! Be aware though, we absolutely need to initialize `jack`'s declaration. Else, an error will be thrown by the compiler, saying the object was not initialized.

But we can still make some properties optionals, so we won't have to specify them when initializing the structure:

```sn
struct Identity {
  val name: string;
  adult: bool = false;
}

val jack: Identity = {
  name: "Jack"
};

println!(jack.adult); // Prints: "false"
```

### Dictionaries

Last but not least, let's imagine we want to associate the name of a person with its age. We want to be able to add or remove persons at anytime. A structure will of course not be adapted for this purpose. But there is a tool for this type of situations: the dictionaries. These act like lists or arrays, but this time indexes are not forced to be integers but any resource, even boolean or other dictionaries! They are of course extensible.

```sn
let ages: Dictionary<string, int>;
```

We can know add any property by doing `ages.Jack = 28;` or so on. To remove a property, we simply do `ages.unset();`. Here's a trap of dictionaries: all properties will return - if they exist - an instance of the second template (`int` here) but a few ones, like `unset` or `has`, will be functions. In order to avoid this problem with variables, writing `ages[anyIndexHere]` will return an `int`, whatever `anyIndexHere` is. We can even write `ages["unset"]` which does the same thing.

Also, there is a shortcut for dictionaries with `string` keys: the `Collection` type. Here is how it goes:

```sn
let ages: Collection<int>;
```

Now `ages` map a `string` (key) to an `int` (value). Writing `Collection<T>` is exactly like writing `Dictionary<string, T>` - it's just a shortcut.

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
let ages: Dictionary<string, int> = {
  Jack: 20,
  Lucy: 21,
  Thomas: 32
};
```

Unlike structures, you can here use a variable for the index, so the following code will work as expected:

```sn
let index = "Lucy";
let ages: Dictionary<string, int> = {
  Jack: 20,
  Lucy: 21,
  Thomas: 32
};

println!(ages[index]); // Prints: "21"
```

But a new trap comes here. If you try to omit the type in the declaration above, you will have some surprise at compilation time because `ages` would now be a structure with three properties, `Jack` `Lucy` and `Thomas`! Why does this happen? Because Inferred Structured Typing (IST) we will see now.

### Inferred Structured Typing

IST is a feature of the SilverNight language that aims to simplify data typing.

Let's say we have to handle an object that is a list of books. This would be an array of objects, each with the name of a book and a "details" object that would contain the author's name, the release year as well as the country it was initially released. We want to have two books inside it initially. Because we have an array, containing a specific object, we would write the following code:

```sn
struct Book {
  name: string;
  details: {
    author: string;
    year: string;
    country: string;
  }
}

// Make a list of books
let books: Book[];

// Add a first book
books.push({
  name: "Harry Potter",
  details: {
      author: "J.K. Rowling",
      year: "1997",
      country: "United Kingdom"
  }
});

// Add a second one
books.push({
  name: "Eragon",
  details: {
    author: "Cristopher Paolini",
    year: "2003",
    country: "USA"
  }
});
```

That's pretty heavy, right? That's why SilverNight supports IST. Here's how the compiler implements it: when you specify the type of a resource, the compiler attemps to see exactly the same structure in the initialization part (if there is one). That's why you can do the same assignment for a `List` and an `Array` variable, even though there don't have the same type. The compiler understands you are trying to assign a list of data and do the required stuff in the background.

IST takes sense when you have more complex structures like this and don't want to define a whole structure. It analyses your object and guesses its type to make what it calls an _on-the-fly_ structure, a structure that wasn't defined explicitly. Here's an example for our problem:

```sn
let books = [
  {
    name: "Harry Potter",
    details: {
      author: "J.K. Rowling",
      year: "1997",
      country: "United Kingdom"
    }
  },

  {
    name: "Eragon",
    details: {
      author: "Cristopher Paolini",
      year: "2003",
      country: "U.S.A."
    }
  }
];
```

We didn't defined any structure, and yet the compiler guesses the type of the `books` variable. There's only one problem here: the compiler will understand you are making a _structure_, so nothing is extensible here. You can still change a book's name, the country it was originally published in, but not add new books.

To solve this problem, we write `#Dynamic` (names beginning by a `#` symbol are called _directives_) at the beginning of the object we want to make extensible.

```sn
let books = [
  #Dynamic

  {
    name: "Harry Potter",
    details: {
      author: "J.K. Rowling",
      year: "1997",
      country: "United Kingdom"
    }
  },

  {
    name: "Eragon",
    details: {
      author: "Cristopher Paolini",
      year: "2003",
      country: "U.S.A."
    }
  }
];
```

Now all works fine!

To fully understand the powerfulness of IST, let's think we want to make the `details` object extensible, to add _optional_ new informations about the book. We would have to add `#Dynamic` at the beginning of each `details` object, but that would be too heavy. So we simply have to write it at the beginning of the very first `details` object and it will affect all the other ones. It's as simple as that.

_NOTE :_ We say that IST produces **on-the-fly structures**, which means it produces structures that were not declared before being used.

`#Dynamic` will turn `List` objects into `Array` ones and `struct` into `Dictionary<string, int>` here. Of course, this last step requires all the properties into `details` have the same type, else it wouldn't work.

Note that it works with defined object too:

```sn
val harryPotter = {
  name: "Harry Potter",
  details: {
      #Dynamic
      author: "J.K. Rowling",
      year: 1997,
      country: "United Kingdom"
  }
};

val eragon = {
  name: "Eragon",
  details: {
      #Dynamic
      author: "Cristopher Paolini",
      year: 2003,
      country: "U.S.A."
  }
};

let books = [
  #Dynamic
  harryPotter, eragon
];
```

Here, because we create a list from two distinct objects, they must have the `#Dynamic` directive on their `details` field.

### Frozens

Along with variables and constants, there is a third type of resource which is the _frozen_. Let's imagine we have a `Person` structure with a `name: string` and an `adress: string` field. Now we want to represent a person but we also want to make it immutable, e.g. its properties must not be editable after its declaration.

Intuitively, we would write the following code:

```sn
struct Person {
  name: string;
  adress: string;
}

val paul = new Person({ name: "Paul", adress: "Somewhere" });
```

That code compiles perfectly well, but if you try to write the following code after:

```sn
println!(paul.name); // Prints: "Paul"
paul.name = "John"; // Works
println!(paul.name); // Prints: "John"
```

This happens because the `val` keyword only affects the _resource_ itself, not its _content_. So, even though we're not be able to assign any new content to `paul` (doing `paul = new Person({ ... });` will throw an error), its content is still modifiable.

To prevent this behaviour, there's a third keyword that can describe our `paul` constant: the `frozen` keyword.

```sn
struct Person {
  name: string;
  adress: string;
}

frozen paul = new Person({ name: "Paul", adress: "Somewhere" });

println!(paul.name); // Prints: "Paul"
paul.name = "John"; // ERROR
```

Here, we told to the compiler to completely freeze `paul`. This way, its properties cannot be modified anymore.

_Tip :_ The `frozen` keyword works on almost any type, including `Dictionary`.

### Multiple assignments

Objects allow _multiple assignments_, which means we can make several assignments at once. Let's consider the following object:

```sn
val hero = {
  name: "John",
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

What we've done here is to extract some properties of `hero` and store them into constants of the same name. The list of the properties to extract (which is also the list of constant to make) is specified between braces (`{}`).

Multiple assignments also work the other way: we can make an object from a list of entities, like this

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
  name,
  age,
  warrior: false
};
```

Note that there is a similar syntax for arrays:

```sn
// Make a sample array
val arr = [ 2, 5, 8, 9 ];

// Extract from array
val [ n1, n2, n3, n4 ] = arr;
// Equivalent to:
val n1 = arr[0],
    n2 = arr[1],
    n3 = arr[2],
    n4 = arr[3];

// Left splice
val [ ...first, n4 ] = arr;
// Equivalent to:
val first = arr.slice(0, 3),
    n4 = arr[3];

// Right splice
val [ n1, ...last ] = arr;
// Equivalent to:
val n1 = arr[0],
    last = arr.slice(1, 3);

// Middle splice
val [ n1, ...middle, n4 ] = arr;
// Equivalent to:
val n1 = arr[0],
    middle = arr.slice(2, 2),
    n4 = arr[3];
```

Note that there is also the `...` symbol to ignore some entries in the array:

```sn
// Middle splice
val [ n1, ..., n4 ] = arr;
// Equivalent to:
val n1 = arr[0],
    n4 = arr[3];
```

This avoids making a useless entity that takes time and memory for nothing if we don't need it.

## The blocks

### Conditional blocks

There are several types of _blocks_ in SilverNight. One of them are the conditional blocks, they provide a way to run a set of instructions only if a condition is met.

The first one is the `if` block. It runs a provided code if the expression between parenthesis is anything different from the primitives' type `NIL` value. Its syntax is:

```sn
if (2 + 2 == 4) {
  println!("Good.");
}
```

Let's look at what happens here. First, the `2 + 2 == 4` expression is evaluated. As it's using the `==` logical operator, the result is `true`. Because it's a value different from the four NIL value we saw above, the instructions set is ran.

If you want to do something if the expression _is_ a NIL value, you can use the `else` block to revert the condition:

```sn
if (2 + 2 == 5) {
  println!("What?");
} else {
  println!("Good.");
}
```

Here, the `2 + 2 == 5` returns `false`, which is a NIL value, so the instructions set is not ran. But the `else` block reverts the condition and, because it was `false` before, it becomes `true`, so its own instructions set is ran. You will see a `Good.` message in your console if you run it.

You can also have multiple conditions by combining `else` and `if`:

```sn
let name = "John";

if (name == "Marco") {
  println!("Your name is Marco!");
} else if (name == "Paul") {
  println!("You are Paul.");
} else if (name == "John") {
  println!("Welcome, John!");
} else {
  println!("I can't remember you...");
}
```

_Tip :_ When the instructions set of a block is made of a single instruction, you can remove the `{` and `}` symbols, like this:

```sn
let name = "John";

if (name == "Marco")
  println!("Your name is Marco!");
else if (name == "Paul")
  println!("You are Paul.");
else if (name == "John")
  println!("Welcome, John!");
else
  println!("I can't remember you...");
```

_Tip :_ Unlike some other languages, the compiler doesn't care about the indentation. So, can you also write:

```sn
let name = "John";

if (name == "Marco") println!("Your name is Marco!");
else if (name == "Paul") println!("You are Paul.");
else if (name == "John") println!("Welcome, John!");
else println!("I can't remember you...");
```

This will work fine.

### `for` for incremental repeat

A general concept you will find in almost every language is the concept of _loops_. A loop is a block that repeats a set of instructions under certain conditions. Let's see how they work.

The `for` block repeats the instructions a given amount of times. It needs an _iterator_ (which is a variable with any `Number` type - integer or not), an optional start value, a condition and an incremental expression. Here is how we write it:

```sn
for i = 0; i < 5; i ++ {
  println!(i);
}
```

What does this code do? First, it automatically declares a local variable called `i` and infers its type as `int`. The loop starts by giving it a first value (the _start value_) to 0. The loop indicates it will run **until** its condition is true (`i < 5`). Then, it specifies its _incremental expression_, an expression which is evaluated each time the loop is runned (excluding the first time).

So, the loop starts by setting 0 to `i`. The condition is checked, and is evaluated to `true`, so the instructions set will be executed. The program displays `0`. Then, the incremental expression is evaluated so `i` is now equal to `1`. We check again the condition which is still `true`, the expression is ran, the incremental expression is evaluated a second time so `i` is equal to `2`, and so on until, after running the incremental expression, the condition became a NIL value.

The loop above will therefore display `0`, `1`, `2`, `3` and `4`. That's all.

Note that you could also write the variable's declaration directly in the loop's head:

```sn
for i: int = 0; i < 5; i ++ {
  println!(i);
}
```

Whatever is the way we use, the iterator will be _scoped_ to this block, which means we can use it only inside the block and that the variable will be deleted outside. If an `i` variable already exists in the main scope, it will simply be ignored and a new, local variable will be made.

Another thing is about the incremental expression. It can be absolutely any expression, like `i --` to decrement it:

```sn
// This loop does exactly the same thing than the previous one
for i = 4; i >= 0; i -- {
  println!(i);
}
```

Or `i += 5`, or whatever you want. There is also an alternative syntax made to replace the one we saw above. This is called the _range syntax_:

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
  pritnln!(i);
}
```

To go from 5 to 0:

```sn
for i in 5..0 {
  println!(i);
}
```

This will result in printing: `5` `4` `3` `2` `1`.

### `while` for conditional repeat

A useful loop every developer has ever used is the `while` block. It repeats a set of instructions _while_ its condition is not a NIL value.

The syntax is:

```sn
let counter = 8;

while counter > 1 {
  println!(counter);
  counter /= 2;
}
```

This code will print `counter`'s value and then divide it by 2, while it's higher than 1. So it will display: `8` `4` `2`. Then `counter` is equal to 1 so the loop ends.

### `while` variant: `until`

The `until` loop is the exact inverse of `while`: it runs the set of instructions _until_ its condition become anything else than a NIL value.

```sn
let counter = 8;

until counter <= 1 {
  println!(counter);
  counter /= 2;
}
```

This code will do exactly the same thing than we saw with the `while` block.

### `while` variant: `do`...`while`

A variant of the `while` loop is the `do`...`while` loop. It does exactly the same thing excepted the condition is not evaluated when the loop begins, but when the set of instructions has been run, so you are sure your set will be ran _at least_ one time.

```sn
let counter = 1;

do {
  println!(counter);
} while (counter != 1);
```

This code will display `1` before the loops ends, because the condition is evaluated _after_ the set of instructions.

### `when` for matches

Another useful block is `when`. It returns a result depending on _switchs_ that relies on the value you gave to it.

Let's imagine we have a person and want to run a little set of instructions depending on its name. Assuming we have a `name: string` variable, we could write:

```sn
if (name == "Paul")
  println!("Happy birthday, Paul!");
else if (name == "John")
  println!("How are you, John?");
else if (name == "Marc")
  println!("Hello there Marc!");
else
  println!("I don't know you...");
```

But this is kind of heavy. So we can perform a _match_ instead:

```sn
when name {
  "Paul"  -> println!("Happy birthday, Paul!");
  "John"  -> println!("How are you, John?");
  "Marc"  -> println!("Hello there Marc!");
  default -> println!("I don't know you...");
}
```

If you want to specify a condition, you can write it between parenthesis. You will have access to the `_` variable which refers to the value given in the block's head.

```sn
let adult: string = when age {
  (_ < 20) -> "No";
  (_ > 20) -> "Yes";
  default  -> "Kind of";
}
```

You can also specify a set of expressions for a match, but you will have to return manually the value:

```sn
let adult: string = when age {
  (_ < 20) -> "No";
  (_ > 20) -> "Yes";
  default  -> { println!("Default value taken."); return "Kind of"; }
}
```

Note that the `break` instruction does nothing on this block. The `when` block can also be used without assignment:

```sn
when age {
  (_ < 20) -> adult = "No";
  (_ > 20) -> adult = "Yes";
  default  -> adult = "Kind of";
}
```

### Ternary conditions

A variant of inline conditions it _ternary conditions_. It returns a value depending on a condition. The syntax is `<condition> ? <value if not NIL> : <value if NIL>`.

Showcase:

```sn
let name = "John";
name = (name == "") ? "John" : "This overwrites the name";
```

### Inline blocks

Sometimes it is useful to write the condition after the instruction. This is why we have the _inline conditions_ syntax that allows it:

```sn
let name: string;

// Set the name only if it is empty
name = "John" if (name == "");
```

You can also use an extended syntax for conditions:

```sn
let name: string;

name = if (! name) "John" else "This overwrites the name";
```

This works with any instruction (exclusing declarations and blocks' head):

```sn
println!("Hello world!") if (world.exists());
println!("Goodbye world!") if (world.willDestroy()) else println!("Good morning world!");
```

You can do this with any condition or loop block, but the block's head will then need to be wrapped between parenthesis:

```sn
println!(i) for (i = 0; i < 5; i ++);
```

But be aware when dealing with inline loops, this could accidentally result in inline generation and make your program crash, as we will see now.

### Inline generation

Inline generation is a useful feature when coming to generate a list of data. For example, let's say we want to generate a list of the cube of every number between 1 and 10. Intuitively, we could write this:

```sn
let cubes: int[10]; // List<int>

for i in 1...10 {
  cubes.push(i * i * i);
}
```

But there is another, simplier way to generate this list.

```sn
let cubes: int[10] = (i * i * i) for (i in 1...10);
```

This will do exactly the same thing. Because the compiler has a great support of inferred typing, you can also omit the `cubes`' explicit type:

```sn
let cubes = (i * i * i) for (i in 1...10);
```

This is also why we told you should be careful when using inline loops. All inline loops generate a vector (`List` for explicit `for` loops like ranges or simple incremental / decremental expressions, `Array` for anything else).

Note that inline loops will not perform a generation if a `void` is returned (not any NIL value, only this one). So, if you do:

```sn
println!(i) for (i in 1...10)
```

Nothing will be generated. Also, nothing will be generated if you don't give the result to a function or assign it to a variable.

### `break` and `continue` loops

When dealing with a loop, you can want to exit it if a specific even happens. For example, if we have an `hadError` function that returns a boolean to indicate an error happened, we could want to exit the loop.

Let's try it:

```sn
for i in 1..10 {
  println!(i);

  if (hadError())
    break; // Exit the loop
}
```

This will work as expected: if `hadError` returns `true`, the `break` instruction will be executed and the loop will break.

Another keyword is `continue` that provides a way to ignore all instructions below it but only one time.

```sn
for i in 1..10 {
  if (hadError())
    continue;

  println!(i);
}
```

This code will check each time if there had an error. If so, it will ignore all instructions above `continue` and iterate the loop a new time. Else, it will run the `println!` macro, just as expected.

### Resources are block-scoped

In SilverNight, all resources are _block-scoped_. This means that, when a resource is declared, it exists only _inside_ the block it is declared in. To take an example:

```sn
if (true)
  val message = "Hello world!";

println!(message); // ERROR because `message` does not exist
```

Here, `message` is declared inside an `if` block, so it only exists _inside_ this block. When we go outside of it, the resource does no longer exist. This is done to keep a better clarity about where resources are available. For example, with a loop, you can do:

```sn
for i = 0; i < 10; i += 2 {
  println!(i);
}

// Do some stuff here

for i = 10; i >= 0; i -= 2 {
  println!(i);
}
```

Without block-scoped declarations, this would not have worked because the declaration of `i` would have been duplicated, so we would have had to be aware to declare `i` at the beginning of the function, to use it later. The time during which an entity exists is its **lifetime duration**.

Also, global entities (the ones that are defined outside another entities, which means they aren't part of a class, of an interface, of a function, etc.) have an infinite lifetime duration.

## Functions

Another common concept in almost every programming language is the concept of _functions_. A function is a special block that can is not ran by default but that can be called manually. It eventually takes values called _arguments_ and generally return a value called the _return value_.

### Declaration

Let's imagine I want to calculate the area of a triangle depending on its base and its height, then print it and store the result in a constant.

This is very simple and can be achieved very simply, but imagine we have to do this dozens of time. This would be heavy to repeat again and again the same instructions. Each time, we will have to rename the variable. And if we wanted to change anything to the algorithm, we would have to reflect the changes in all our files - which could be very long and introduce new errors.

In order to avoid copy-pasting this block of code again and again, we can use a general programming concept known as _function_.

A function is declared using the `func` keyword. We give it a name, and its arguments between parenthesis, separated by commands. An argument is basically a couple of a name and a type, written as `argname: type` (though we will see later this is not the only syntax for arguments). We then write a double point `:` symbol and the function's return type - the type of the value which is returned by the function.

Let's write the block's head:

```sn
func triangle_area (base: float, height: float) -> float {
  // Function's body
}
```

The very first line (without the `{` symbol) is called the function's _prototype_. It declares what the function's name is, what are its arguments, and the type of value it returns. We commonly say that the _prototype_ (the line we saw) _declares_ the function's _signature_ (its name, arguments, their types, and the return type).

We want to first calculate the triangle's area. Let's do this:

```sn
func triangle_area (base: float, height: float) -> float {
  val area = 0.5 * base * height;
}
```

Now we want to print it:

```sn
func triangle_area (base: float, height: float) -> float {
  val area = 0.5 * base * height;
  println!(`The triangle's area is: ${area}`);
}
```

Now we want to assign it a variable each time we calculate the area. So we will have to declare a variable and make an assignment **outside** of the function. How can we do this?

There's a simple way to achieve this called the _return statement_. It uses the `return` keyword to return a value from the function. This value is an entity can be assigned to a variable or a constant. Let's do it!

```sn
func triangle_area (base: float, height: float) -> float {
  val area = 0.5 * base * height;
  println!(`The triangle's area is: ${area}`);
  return area;
}

val first  = triangle_area(2, 8);
val second = triangle_area(3, 7);
val third  = triangle_area(4, 12);
```

You can now use the three constants. Consider the return value of this function acts exactly like a `float`, because _it is_ a `float`.

Here, the return type of the function **must** describe the type of the value it returns. If you try to return an integer, it will throw an error. If you try to return a string, the same thing will happen.

Note that functions have a special type that requires the argument to be a plain value: the `#pln<T>` type. Here is how it goes:

```sn
func i_need_a_plain (integer: #pln<int>) -> int {
  return integer * 2;
}

i_need_a_plain (2); // Works fine

val num = 2;
i_need_a_plain(num); // ERROR
```

Its point is mainly to use with some macros to pre-process data, but that's a very special case you probably won't encounter very often.

As tuples being a single type, functions can also return them:

```sn
func add (left: int, right: int) -> (int, float) {
  return (
    // Divide as integers
    left / right,
    // Divide as floating-point numbers
    float(left) / float(right)
  );
}

val result = add(2, 8);

println!(result[0]); // Prints: "0"
println!(result[1]); // Prints: "0.25"
```

Note that void-typed functions (functions that return nothing) can omit their return type, like this:

```sn
func sayHello () {
  println!("Hello !");
}
```

### Optional arguments

Optional arguments are... optional. Well, that's pretty explicit, at least. When declaring a function's arguments, we list them with their respective types. But, we can also make some of them _omittable_ by giving them a _default value_. Let's try it:

```sn
func sayHello (name: string, justTheName: bool = false) {
  if (justTheName)
    println!(name);
  else
    println!(`Hello, ${name}!`);
}

sayHello("John", false); // "Hello, John!"
sayHello("John", true); // "John"

sayHello("John"); // "Hello, John!"
```

This is useful when we don't want to give a default value to arguments. Note that default values can be absolutely anything, even expressions.

### Infinite arguments

Sometimes we simply want a function to accept any number of arguments, without making an array to have a lighter syntax. This can be done using infinite arguments:

```sn
func sum (...numbers: int) -> int {
  let sum = 0;

  for i = 0; i < numbers.size; i ++ {
    sum += i;
  }

  return sum;
}

println!(sum(2, 3, 4)); // Prints: "9"
```

Here, `numbers` becomes a `List<int>` because of the `...` symbol, and it will also accept any argument. Note that this feature can be used between before other arguments:

```sn
func sum (...numbers: int, coefficient: int) -> int {
  let sum = 0;

  for i = 0; i < numbers.size; i ++ {
    sum += i;
  }

  return sum * coefficient;
}

println!(sum(2, 3, 4, 5)); // Prints: "45"
```

Or after:

```sn
func sum (coefficient: int, ...numbers: int) -> int {
  let sum = 0;

  for i = 0; i < numbers.size; i ++ {
    sum += i;
  }

  return sum * coefficient;
}

println!(sum(5, 2, 3, 4)); // Prints: "45"
```

Or even between:

```sn
func sum (coeff1: int, ...numbers: int, coeff2: int) -> int {
  let sum = 0;

  for i = 0; i < numbers.size; i ++ {
    sum += i;
  }

  return sum * coeff1 * coeff2;
}

println!(sum(2, 2, 3, 4, 3)); // Prints: "54"
```

#### Arguments expansion

Functions can also be called using an array of arguments thanks to the _arguments expansion_ operator. It goes like this:

```sn
func sum (left: int, right: int) -> int => left + right;

// Declare a List<int>
val numbers = [ 2, 8 ];
// Use the arguments expansion operator
println!(sum(numbers...)); // Prints: "10"
```

Here, `numbers` is expanded as multiple arguments. It's like writing:

```sn
func sum (left: int, right: int) -> int => left + right;

// Declare a List<int>
val numbers = [ 2, 8 ];
// Print the sum of the numbers
println!(sum(numbers[0], numbers[1])); // Prints: "10"
```

This operator can also be used with other arguments:

```sn
func sum (left: int, right: int, divide: int) -> int {
  return (left + right) / divide;
}

val numbers = [ 2, 8 ];
println!(sum(numbers..., 5)); // Prints: "2"
```

### Lambdas and callbacks

We saw that functions can be declared with a name, a list of arguments, a return type and a body. But there are some functions that omit the name, called _lambdas_.

What is their point? The more simple is to take an exemple: let's say we have a list of signed integers, and we want to keep only the positive values called `arr`. The first idea we could have would be to write:

```sn
val posArr: int[];

for i = 0; i < arr.size; i ++ {
  if (arr[i] >= 0)
    posArr.push(arr[i]);
}
```

But we have a problem here. We have to define `posArr` as an `Array<int>` while `arr` is a `List<int>`. This could introduce compatibility issues when we'll want to give it to functions that require a list. We can still convert `posArr` to a list by doing `posArr.toList()`, but this would involve to make a whole new list, which takes both memory and time.

That's where lambdas come. There is a function called `filter` we can use on lists, which takes a specific function as an argument. Here is how we use it:

```sn
val posArr = arr.filter(lambda (value: int, key: int) -> bool { return value >= 0; });
```

What happened here? Because it's a little cryptic, we'll re-write the code, with a greater spacing:

```sn
val posArr = arr.filter(
  lambda (value: int, key: int) -> bool {
    return value >= 0;
  }
);
```

Here, we declare a _lambda_ with two arguments `value` and `key` which both are integers, and we say it will return a boolean. Then, we write the function's body, which simply evaluates an expression (returns `true` if `value` is positive, `false` else).

Because this function does not have a name, it's called a lambda: it could not be declared like a standard function which require a name.

Also, why do we need the `key` argument while we don't use it? It's simply because the `filter` function requires it. Let's see the declaration of this function:

```sn
  // ...
  public func filter (callback: lambda (value: T, key: int) -> bool) -> self<T>;
  // ...
```

Let's just concentrate on the function's only argument: called `callback`, it is described as a function that takes a `value` and a `key` argument, then returns a boolean. That's why we gave these specific types to our lambda. If we had specificied a `string` for the `key` argument for example, an error would have been throw at compilation.

Note that, while the argument's number, type and the lambda's return type is declared in the function's signature and cannot be changed, you can still change their names to take your own ones. We could have called them `num` and `k` if we wanted to.

There's another way to apply this filter on our list: declaring the function, and then using it as an argument. Because an example will be more clear than a big explanation:

```sn
val myFunc = lambda (value: int, key: int) -> bool {
  return value >= 0;
};

val posArr = arr.filter(myFunc);
```

This will do the same thing than the first version. Here, we declare a `myFunc` variable that works exactly like the lambda we made before, then we use it as an argument for the `.filter` function.

In fact, this constant has an inferred type ; its full declaration would be:

```sn
val myFunc: lambda (value: int, key: int) -> bool = lambda (value: int, key: int) -> bool {
  return value >= 0;
}

val posArr = arr.filter(myFunc);
```

This is where inferred typing is _really_ great!

An interesting point here is that we can _call_ `myFunc` like this:

```sn
println!(myFunc(2)); // Prints: "true"
println!(myFunc(-3)); // Prints: "false"
```

We could also have declared it as a normal function:

```sn
func myFunc (value: int, key: int) -> bool {
  return value >= 0;
};

val posArr = arr.filter(myFunc);
```

As void-typed functions that take no argument are called _reduced functions_, the same applies for lambdas with _reduced lambdas_, which allow to omit its parenthesis:

```sn
// Use the short notation for reduced lambdas (as a type)
func callReducedLambda (callback: lambda) => callback();

// Use the short notation for reduced lambdas (as an expression)
val reduced = lambda { println!("Hello there!"); }

// Give it as an argument
callReducedLambda(reduced);
```

So, lambdas are great to reduce the size of a program, but reduced lambdas put apart it's kind of heavy to use this syntax. This is why we can use the _arrow syntax_:

```sn
val posArr = arr.filter((value: int, key: int) -> bool => value >= 0);
```

We don't have the `func` keyword anymore, but the `=>` one appeared. This symbol means that the value on its right is automatically returned by the function. This symbol can in fact even be used with functions, like `function returnTrue() -> bool => true;`. We can also use the `{` and `}` symbols while omitting the `func` keyword to use several instructions, but we'll then have to use manually the `return` keyword.

Showcase:

```sn
// Classic functions
func returnTrue () -> bool { return true; }
func returnTrue () -> bool => true;

// Classic lambdas
val returnTrue = lambda () -> bool { return true; }
val returnTrue = lambda () -> bool => true;

// Arrow syntax
val returnTrue = () -> bool { return true; }
val returnTrue = () -> bool => true;
```

But even with the arrow syntax, this is still heavy as we have to write the arguments' type as well as the lambda's return type. So there is a last feature called **ICT** for **I**nferred **C**allback **T**yping we will see now.

### Inferred Callback Typing

ICT works like IST but for functions. Instead of inferring a data's structure, it will infer a function's arugments and return type based on a signature.

This may be appear complex, but let's take a simple example. Remember the `.filter` function we can apply on any `List<T>` value? We gave it a lambda and we had to declare the lambda's arguments' type as well as a return type. But because these types are already specified in the `.filter` function's signature, we know that we'll have _exactly_ the sames types in our lambda's signature.

So there is a way to perform inferred typing on a lambda, for both its arguments' type and its return type. Here is it:

```sn
// Classic lambda
val posArr = arr.filter(lambda (value: int, key: int) -> bool { return value >= 0; });

// Arrow syntax
val posArr = arr.filter((value: int, key: int) -> bool => value >= 0);

// Inferred callback typing
val posArr = arr.filter((value, key) => value >= 0);
```

This last syntax is clearly lighter as it avoids to declare the types. But be careful though to read carefully the signature of the function you are giving this lambda to ; else you could have some... surprises, at compilation time.

Also, note this will only work with lambdas that are directly given as arguments. These are known as _"flying lambdas"_ in reference to the fact they are declared before being used. That means you can't use ICT if you declare a constant that contains this lambda, and then use this constant as an argument for a function. This is simply because this directive guesses the function's type based on the signature of the function it is gave to, so it wouldn't work with anything that is not a flying lambda.

While we have inferred typing without looking at any signature for data structure, you may be wondering why functions can't have an inferred typing for their arguments and return type too based on their body. For example, if a function only returns booleans, its return type could be inferred.

To answer this question, there is a directive that allows inferred typing for anything, from variables to functions, even to more complex data structures (like interfaces or classes). But like we'll see later, this has some (really) serious downsides and considerably slows down the compilation. Global inferred typing is only useful when some conditions are met, so for now let's put it aside and only consider inferred typing is supported for variables/constants/frozens/plain values, on-the-fly structures and flying lambdas.

### Polymorphism

When declaring a method, we sometimes want to make them callable by several ways. For example, let's say we want to give the coordinates, as a string, of a point. A point is a couple of floating-point numbers, the first one representing X, the second one Y. But, we also want to support the `Point` structure, which has two members `x` and `y`, which the same function name. How could we do that?

The answer to this problem is called _polymorphism_: we declare several functions with the same name, but with different signatures.

Here is how it works:

```sn
// Make the 'Point' structure
struct Point {
  x: float;
  y: float;
}

// Declare the two functions with polymorphism
func pointStr (x: float, y: float) -> string => `(${x}, ${y})`;
func pointStr (pt: Point) => `(${Point.x}, ${Point.y})`;

// Let's try them!
pointStr(2, 5); // Prints: "(2, 5)"
pointStr({ x: 2, y: 5 }); // Prints: "(2, 5)"
```

They work as expected and print the same result.

## Object-oriented programming

### The concept of class

Here we are. We will now talk about the most important concept in SilverNight, which is also the most complex one: **Object-Oriented Programming**.

Like we saw before, everything in SilverNight is an object. Though primitive types like `string` or `int` are special ones, they follow a strict behavior rules by their _type_.

To introduce the OOP concept, let's see the concept of _class_. Think to classes like advanced structures: they are a set of properties that can be functions. But were classes are brillant is where structures are limited.

### I need a hero!

Let's imagine we want to represent a hero like we saw before.

> We now want to represent a video game hero. It has a name, Health Points (HP), Magic Points (MP), attack and defense points. How could we describe this?

The first option we saw was to make a list, but that was not very convenient (both not readable and poorly maintanable). So we chose to make a structure, and here is the result we obtained:

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

But now imagine we want to make a function that allows a hero to fight another. This is impossible. Why? Because we can't both make the structure's properties constant **and** change them from inside a function. That's where structures suck.

So, what can we do? Well, we do classes. Here is the syntax:

```sn
class Hero {
  private name: string;
  private hp: int;
  private mp: int;
  private atk: int;
  private def: int;
}
```

First, we _declare_ the class with `class Hero`. This creates a _type_ named `Hero` (that's the first verity about types, every type outside structures is in reality a class). Then, we set up its _members_, an equivalent to structures' properties. But look at the `private` keyword. This indicates that this members are available only from _the inside_ of the class ; that means no one will be able to access these members outside the class. So, how can we do our fight function?

Well, here is how it goes:

```sn
class Hero {
  private name: string;
  private hp: int;
  private mp: int;
  private atk: int;
  private def: int;

  public func %construct(name: string, hp: int, mp: int, atk: int, def: int) {
    this.name = name;
    this.hp = hp;
    this.mp = mp;
    this.atk = attack;
    this.def = defense;
  }
}
```

That becomes a little more complicated here. We start by declaring the `%construct` function which is called the _constructor_. This function is called when a resource (variable, constant or frozen) is created with the `Hero` type. Because any return value would be lost from it there is an exception in the language's rules that allow us to not give it a return type (it will implicitly be `void`), without any directive.

The constructor will take as an argument a name, an amount of HP and MP, an attack and a defense. Then, it will assign these given values to its _members_, which are not available from outside the class.

```sn
  // ...
  public func getAttack () -> int {
    return this.atk;
  }

  public func beAttacked (ennemy: Hero) {
    this.hp -= ennemy.getAttack();
  }
  // ...
```

Here, we define a `getAttack()` and a `beAttacked()` functions publicly, which means everyone can access it, even outside the class. `getAttack()` returns the `attack` member from the current class, while `beAttacked()` runs `getAttack()` from the provided ennemy and decreases its own HP depending on it.

Here is how we instanciate our heroes:

```sn
val jack = new Hero(); // ERROR: Expecting 5 arguments, found 0
val jack = new Hero("Jack", 100, 5, 50, 10); // Let's declare a warrior
```

If we want to consider the defense now:

```sn
  // ...
  public func beAttacked (ennemy: Hero) {
    this.hp -= ennemy.getAttack() - this.def;
  }
  // ...
```

Here we consider our defense. But now we have to assure HP loss is not negative. That would be weird to win HP while _being attacked_ by an ennemy.

```sn
  // ...
  public func beAttacked (ennemy: Hero) {
    // Calculate the loss
    val loss = ennemy.getAttack() - this.def;
    // Decrease HP
    this.hp -= loss;
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
    this.hp -= loss;
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

  public func %construct(name: string, hp: int, mp: int, atk: int, def: int) {
    this.name = name;
    this.hp = hp;
    this.mp = mp;
    this.atk = attack;
    this.def = defense;
  }

  public func getName () -> string {
    return this.name;
  }

  public func getAttack () -> int {
    return this.atk;
  }

  public func beAttacked (ennemy: Hero) {
    // Calculate the loss
    val loss = ennemy.getAttack() - this.def;
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
val jack = new Hero("Jack", 100, 5, 50, 10);
val john = new Hero("John", 50, 5, 80, 5);

// Make them fight
jack.fight(john); // Prints: "Jack is going to fight John!"
                  //         "John is attacked by Jack and loses 45 HP!"
                  //         "Jack is attacked by John and loses 70 HP!"
```

### Members accessibility

We just saw two _accessor_ keywords for a class' members: `public` and `private`. Public members are public, so anyone can access them, even from the outside of the class. This mean we can do this:

```sn
class Example {
  public val hello = "Hello!";
}

val instance = new Example();
println!(instance.hello); // Prints: "Hello!"
```

Private members are restricted to the inside of the class, meaning they can be used only by code that is written between the `{` and `}` braces of the class. Here is an example:

```sn
class Example {
  public val hello = "Hello!";
  private val secret = "No one can see me!";

  public func printSecret () => println!(this.secret);
}

val instance = new Example();
println!(instance.hello); // Prints: "Hello!"
println!(instance.printSecret()); // Prints: "No one can see me!"
println!(instance.secret); // ERROR
```

There is a specificy about private members, though. We can access an instance's private members from the inside of a class even if it's not the current instance.

```sn
class Example {
  public val hello = "Hello!";
  private val secret = "No one can see me!";

  public func printAnotherSecret (other: Example) => println!(other.secret);
}

val instance = new Example();
val another  = new Example();

println!(instance.printAnotherSecret(other)); // Prints: "No one can see me!"
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

  public func %construct(theThingName: string) {
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
val something = new Superthing("Gamepad");
```

This will work fine and the constructor will get the `"Gamepad"` value in `theThingName`.

### Methods

Let's now see the _methods_ more in details. This will be pretty simple in fact: methods in classes act like simple lambdas in structures, but they can also access the classes' private attributes and use a few keywords, like `this` which refers to the current class.

Note that all attributes and methods of a class (called its _members_) can be accessed only through the `this` keyword or the instance name. For example:

```sn
class Superthing {
  private name: string;

  public func %construct(theThingName: string) {
    this.name = theThingName;
  }

  public func getName () {
    return this.name;
  }
}
```

Here, the `getName()` function will return the thing's name. To use it, we simply have to do:

```sn
val something = new Superthing("cake");

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

  public func %construct(@name: string) {}
}
```

### Readonly attributes

When declaring class' attributes, we sometimes want to make it private because we don't want anyone to change it without control, but we also want a developer to read it. So, this would be a read-only attributes from the class' outside, and a classic attribute from the inside (both readable and writable). Here is how we could implement it:

```sn
class SomeClass {
  private myAttribute: string;

  public func getMyAttribute () -> string {
    return @myAttribute;
  }
}
```

This is perfectly valid and works as expected. But doing this can be heavy to write, especially if we have several attributes like this one. So, there is a lighter syntax to achieve this:

```sn
class SomeClass {
  public readonly myAttribute: string;
}
```

This will do the same thing as the previous syntax, excepted we won't access the attribute with `instance.getMyAttribute()` from the outside, but simply with `instance.myAttribute`.

### Static members

This is another type of members. Static members are not available from the instances, but only from the class itself. Let's see an example to be more clear:

```sn
class Product {
  private static unique_id = 0;
  public static func increaseCounter () -> int => ++ self::unique_id;
}
```

Here, `increaseCounter()` can only be accessed by using the `::` operator on the class itself, so we would write `CounterClass::increaseCounter()`. This will increase the private static attribute `counter`.

The `self` word refers to the current class, in a static context. This provides a way to access its static attributes. Let's populate the class with attributes for instances:

```sn
class Product {
  // The global counter for unique identnfiers
  private static counter = 0;

  // Increase the global counter
  public static func increaseCounter () -> int => ++ self::counter;

  // The product's unique identifier
  public readonly unique_id: int;
  // The product's name
  public readonly name: string;

  // Initialize the instance
  public func %construct(@name: string) {
    // Generate a unique identifier from the static function
    @unique_id = self::increaseCounter();
  }
}
```

Be aware though, writing `self` is not like writing the class' name (`Product` here). `self` is a reference that can only be used inside of a class, and which provides a way to access its private static members. If we had specified the class' name instead, we wouldn't have been able to access the `counter` attribute.

When static members are private, that means they can only accessed through the `self` keyword, so from the inside of the class only. When they are public, they are available from the outisde of the class thanks to its name, followed by the static operator `::` and the attribute's name.

### Practice: Let's make a map!

Let's now practice with a little exercice. We want to represent a RPG map with a class. Each cell has a number referring to an empty cell (0), a rock (1) or a trap (2). The map is given at its creation, as a double array of integers. The map is a rectangle and has a fixed width and heigh deducted from the double array.

We can move on this map a player, starting from a location given at the map's creation. The player can move up, down, left and right. It can't go on rock cells, and going to a trap will display a message "You've been trapped!" and make the player unable to move.

We have to represent it with a single class, with only private attributes (they can be readable, though). At anytime, we should be able to access to current player's position, to get any cell's value, or to check if the player has been trapped already.

The problem seems to be complex but it is mostly simple to achieve. Read the solution below when you're ready. If you can't solve it, try to read again what we saw before and think about the structure of the class.

Here is the solution:

```sn
class Map {
  // Cell types
  private static readonly EMPTY = 0;
  private static readonly ROCK  = 1;
  private static readonly TRAP  = 2;

  // Private attributes
  public readonly playerX: int;
  public readonly playerY: int;
  public readonly trapped: bool = false;
  public readonly cells: int[][];

  // Create the map
  public func %construct(@cells: int[][], @playerX: int, @playerY: int) {};

  // Move the hero
  private func move (x: int, y: int) {
    // If we fall in a trap before...
    if (@trapped)
      // Move is forbidden
      println("You can't move because you're trapped.");

    // Check if we are outside the map
    else if (x < 0 || x > @cells[0].size - 1 ||
             y < 0 || y > @cells.size - 1)
      println!("Cannot move outside the map.");

    // Check if the cell we are going to is a rock
    else if (@cells[y][x] is self::ROCK)
      println!("There's a rock on your way.");

    // Else, move the player
    else {
      // Save the new player's location
      @playerX = x;
      @playerY = y;

      // If we fell in a trap, game over!
      if (@cells[y][x] is self::TRAP) {
        println!("You've been trapped!");
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

Here it is! This code answers to the problem.

Of course, your solution could be different, as there are many ways to solve it. This anwser is well optimized and relatively short. Try to compare you own solution to this one and see the differences.

A short note about accessibility now: as you can see, `cells` is not cloned when assigned using the constructor. This means that if an pre-defined array is gave to the constructor, changing it from the outside will also affects the class' attribute.
Another point is that `cells` is also readable and not declared as a frozen, so anyone from the outside can access it and change its values.

Here is a corrected version of the class that fixes this mistakes:

```sn
class Map {
  // ...
  public readonly frozen cells: int[][];
  // ...

  // ...
  public func %construct(cells: int[][], @playerX: int, @playerY: int) =>
    // Clone the given cells to avoid them from being frozen
    @cells = clone!(cells);
}
```

Here, if we didn't clone `cells`, the original array would have been frozen too! So that's important to clone it here.

## Classes in depth

Now we've acquired the basis of classes, this part will teach you more complex features of OOP like inheritance, sub-typing or interfaces.

### The destructor

A word about overloads:

We saw before the constructor, a special method called when the instance is created. This method can't be ran the normal way, meaning you can't do `myInstance.construct()` or `myInstance.%construct()` for example. Such a method, and every method we will see beginning by the `%` symbol, are called _overloads_.

By default, when we instanciate a class, nothing is done (excepted creating the object itself). The constructor overwrites this behavior by running its own code.

The destructor is a special function you probably won't use very often, but it is still useful in some cases. Like the constructor, it's an overload, and is written `%free`. It takes no argument and must be `void`-typed, so its return type can also be omitted.

Now, a word about freeing:

When dealing with heavy objects, or simply when using a low-level languages, developers often _free_ their variables themselves. Freeing a variable means its value is definitely removed, so it doesn't take memory anymore. Of course, after a resource is freed, using it will result in an error.

A resource can be freed several ways. The first one is with the _garbage collector_, a little tool that detects what resource isn't used anymore and free it because it knows it won't be used anymore. This is done automatically in JavaScript or Python for example, two interpreted high-level languages. Languages such as Rust have other tools instead that does the same thing, but that insert a piece of code to free the resource when compiling the source code. Some other languages, finally, like C or C++, doesn't have this feature and resources must be freed manually.

In our case, the destructor is called when the instance is manually freed, using the `free!` macro. Here is how it looks like:

```sn
class IntArray {
  private data: int[];

  public func %free() {
    println!("I will be freed.");
  }

  public func add (value: int) => @data.push(value);
  public func pop () -> bool => @data.pop();
}

let arr = new IntArray();
arr.push(2);
arr.push(4);
arr.push(3);
free!(arr); // Prints: "I will be freed."
```

This overloads aims to provide a way to run a specific code when the developer explicitly says it doesn't need the instance anymore. After the destructor is ran, the instance is freed and any usage of it will result in an error.

### Freezing

Remember the frozens? We saw they were deep constants where even attributes, sub-structures etc. were completly frozen.

Frozens have a second use, though. Their real aim is not to deeply freeze an object's values, but to freeze it in its behavior. This is not really clear, so let's see how it goes.

Let's imagine we have a class representing a list of integers. We have a method, `add`, to add a number to a private list and `pop` to get the last value from it, plus a `sum` function to calculate its sum.

If we simply declared an instance of this class as a frozen, it will freeze its public attributes. But this won't prevent from adding numbers to the private list thanks to the `add` function, for example.

That's why an overload exists to implement the 'frozen' state in a class, called `%freeze`. It takes no argument and is `void`-typed, so its return type can be omitted. It this method is implemented, the instance is considered as being able to be frozen.

```sn
class IntArray {
  public readonly data: int[];

  public func %freeze() {}

  public func add (value: int) {
    // Check if the instance is frozen
    if (is_frozen!())
      println!("The class is frozen, can't append anything.");
    else
      @data.push(value);
  }

  public func pop () -> bool {
    // Check if the instance is frozen
    if (is_frozen!())
      println!("The class is frozen, can't pop the top value.");
    else
      @data.pop();
  }

  public func sum () -> int => @data.reduce((acc, value) => acc + value);
}
```

As you can see, the overload's body is empty. It's simply because when declaring this overload, we explicitly tell that our class can be frozen, so it will freeze every single attributes, even the private ones. It will also turn a hidden boolean, the _frozen flag_ to `true`, meaning the instance has been frozen. Then, the `is_frozen!` macro returns it. We could also have put a `println!("I'm now frozen");` code in the overload, but that's totally optional, and most of the time this overload will be empty. Now we know what is does, let's see the process more in details:

When freezing the class, we aim to make the instance and its data immutable. But there is a problem here. In fact, even if `data` can't be written from the outside, its sub-values can. For example, doing `arr.data = [1, 2]` won't work, but `arr.data[1] = 5` will. This is due to the fact `arr.data[1]` is independent of `arr.data` because it's its own single value, while `arr.data` is a list of values, not the values themselves.

Because of this behaviour, our instance is not _fully_ frozen. That's why implementing the `%freeze` overload will automatically freeze all attributes, even private ones, and their own attributes if they are objects are instances of classes, and so on. Even though freezing all of this could take a bit of time, it's done because declaring is frozen is always done intentionnally. If we simply wanted to make `add` and `pop` unable to act, we would have implemented a `makeImmutable` method or something.

Thanks to this behaviour, we don't take the risk to forget freezing an attribute, a problem that can occur especially when adding new attributes to a class and forgetting to freeze them. Hopefully, we don't have to think about that.

Note that any instance of the `IntArray` can still be frozen after being declared, using the `freeze!` macro, which permits to freeze the data after manipulating its data. In fact, all overloads can be called manually by using the macro with the same name the overload has (except `%construct` and `%call`). For example, the `%freeze` overload can be called using the `freeze!` macro.

Also, conventionnally, freezing cannot be undone, so we don't have to implement an `unfreeze` method or anything.

A last advice about freezing is that **all** native types support freezing, so you don't have to worry when dealing with them, from `int` to `Dictionary<string, List<string>>`.

The notion of freezing is complex, so don't hesitate to read it again, until you understand. That's an important feature because declaring an instance as frozen or freezing it manually will throw an error if the overload is not implemented in the class.

### Cloning

Let's imagine we have a list of integers. We make a function that calculate, for each number, its square, and return a final list with these numbers. Here is how we would implement it:

```sn
func squareList (list: List<int>) -> List<int> {
  for i = 0; i < list.size; i ++ {
    list[i] *= list[i];
  }

  return list;
}
```

This works fine, but let's now try the following code:

```sn
val list = [ 2, 7, 8 ];
val squares = squareList(list);

println!(squares[1]); // Prints: "49"
println!(list[1]); // Prints: "49"
```

Did you understand what just happened? When we modified the values of the list in our `squareList` function, this also affected the original list. So the original and the result are exactly the same ones.

This behaviour is due to the fact SilverNight doesn't clone objects each time, because it would be way too long. We can also observe the problem on objects:

```sn
// Define a first hero
val jack = {
  hp: 100,
  atk: 20,
  name: "Jack"
};

// John is a hero, just like Jack is
val john = jack;

// Set John's name
john.name = "John";

// Surprise!
println!(john.name); // Prints: "John"
println!(jack.name); // Prints: "John"
```

The same thing applies for any object, so for any non-primitive values (anything that is not a `void`, a boolean, a number or a string). This is a big problem, but which has a very simple answer: cloning.

To solve our first problem, we simply have to do this:

```sn
val list = [ 2, 7, 8 ];
val squares = squareList(clone!(list));

println!(squares[1]); // Prints: "49"
println!(list[1]); // Prints: "7"
```

This works perfectly fine. We simply added a `clone!` instruction, and our problem is solved because we explicitly tell we want to make a brand _new_ list with the same values than the first one.

But cloning is not magic. We can't simply clone data like this. Imagine a class contains an `unique_id` attribute that aims to be a unique number. Cloning it like that would throw this rule away. This is why, by default, instances can't be cloned until they implement the `%clone` overload. Let's consider this class:

```sn
class Product {
  public readonly unique_id: int;
  public readonly name: string;
  public readonly price: int;
  private static counter: int = 0;

  public %construct(@name: string, @price: int) {
    @unique_id = self::counter ++;
  }
}
```

It can't be cloned because the cloning overload is not present in the class.

For this one we can choose between two signatures: a function which takes ones argument (let's call it `target`), and must return an instance of the current class (return type is omittable). In this case, the program will automatically clone the instance by creating a new object with the same methods and attributes, and assign the values to the new instance's attributes (even private ones) by cloning the original's ones. Note that the constructor is not called when the instance is automatically cloned.

The overload will then be able to manipulate the target before returning it, in order for example to change unique identifiers or other things. Here is how it could look like:

```sn
  // ...
  public func %clone(target: self) -> self {
    // Print a simple message
    println!(`Cloning a ${target.name}`);

    // Set a new unique identifier
    target.uid = self::counter ++;

    // Return the target
    return target;
  }
  // ...
```

The second signature takes no argument, and must manually return an instance of the current class (return type is omittable). That's especially useful when two objects with the same attributes can't exist both at the same time, for example. That's more specific but will be needed in some cases.

```sn
  // ...
  public func %clone() => new Product(@name, @price);
  // ...
```

Be aware, in the case you manually create an instance, don't forget to clone arrays if you give some to the new instance from the current one (same with objects and instances from other classes) - else you could encounter some unexpected behaviour like modifying an instance changes an other too. Conceptually, the goal of a clone is to have the same behaviour than the original (same values...) but to be independant from it.

#### The lazy way

There is a third and last way to grant cloning support to your class. It's called a _lazy_ overload and works, instead of a function, with a single attribute. Here is how it goes:

```sn
  // ...
  public pln %lazy_clone = true;
  // ...
```

If we write that, instances of the class will support cloning but we won't be able to do anything when this happen, or even be notified of that. All the attributes of the original instance will automatically be cloned to be assigned to the new one (like the first `%clone` we saw before). This is perfect for classes that don't have to worry about duplicate instances.

### Serialization

Serialization is a concept you probably won't use very often, but which can help you in some cases. Basically, serialization consists in converting a value to a string. It goes with the unserialization process, which converts a string to a value.

For instance, we could imagine we have the same `Product` class as we saw before. Here is its source code at this point of the book:

```sn
class Product {
  public readonly unique_id: int;
  public readonly name: string;
  public readonly price: int;
  private static counter: int = 0;

  public pln %lazy_clone = true;

  public %construct(@name: string, @price: int) {
    @unique_id = self::counter ++;
  }
}
```

We could now imagine we want to transmit a product over the network, or simply save it to a file. This requires to convert the instance as a string, or at least as a list of bits (because all informations in a computer are written with bits). We also want to be able to make an instance from the transmitted/saved string in order to use the product. So we need to _serialize_ the instance and then _unserialize_ the produced string.

For that, we'll implement two overloads in our class. They are `@serialize` and `@unserialize`, which is pretty explicit, and use the following signature:

```sn
  public func %serialize() -> string;
  public static func %unserialize(serial: string) -> self;
```

Now let's implement them! First, how to implement serialization? We could produce a human-friendly string, like that:

```sn
  // ...
  public func %serialize() -> string {
    return `uid: ${@unique_id} ; name: ${@name} ; price: ${@price}`;
  }
  // ...
```

But there is a problem here: first, the string is not optimized. One of the goal of serializing instances is to produce a small string to fit in a small disk space / be fast to transfer over a network. The second one, which is more annoying, is that'll be complicated to make an instance from these strings. So we can use a trick that is serializing a structure:

```sn
  // ...
  public struct Serialized {
    val name: string;
    val price: int;
  }

  public func %serialize() -> string =>
    // Make an object containing the data we want to serialize
    // (thanks to IST)
    // Then serialize it and return the result
    serialize!({
      name: @name,
      price: @price
    });

  public static func %unserialize(serial: string) -> self {
    // Unserialize the serialized structure
    val obj: Serialized = unserialize!(serial, Serialized);
    // Make a new product instance and return it
    return new Product(@name, @price);
  }
  // ...
```

#### The lazy way (again)

Exactly like cloning, there is a lazy overload for serialization. More exactly, there are two lazy overloads: one for serializing, and another for unserializing.

If we use lazy serialization, all the members (even private ones) of our class will be put in a structure that will be converted to a string. If we use lazy unserialization, it will attempt to unserialize the given string as a structure made of all the class' members (even private ones), and make a new instance from it before returning it.

Here is the syntax:

```sn
  // ...
  // Implement lazy serialization
  public pln %lazy_serialize = true;
  // Implement lazy serialization
  public pln %lazy_unserialize = true;
  // ...
```

It's also possible to customize the fields that have to be serialized and unserialized. This way, we can avoid to put in a string that would go over the network or be written on a hard drive some confidential informations contained in the private members - or simply to remove some useless informations. It must be a list of strings, like this one:

```sn
  // ...
  public pln %lazy_serial_fields = [ "name", "price" ];
  // ...
```

You now know everything about serialization!

### Inline calls

Inline calls allow us to make a class callable, just like a function. It can takes whatever arguments it wants to and use any return type.

There are two overloads for inline calls: the first one is common to each instance, making the instances callable, and the second one is static and allows the class itself to be called.

Let's take an example:

```sn
class Translator {
  // Here is a function that translates a text
  //  and returns the translated string
  public static func translate (text: string, lang: string) -> string {
    // Do some translation stuff here
    // For the example we will return a constant string
    return "Bonjour";
  }

  // Make the class callable
  public static func %call(text: string, lang: string) -> string =>
    @translate(text, lang);
}

println!(Translator("Hello", "fr")); // Prints: "Bonjour"
```

Here, the `%call` overload made the class callable. We could implement it for instances:

```sn
class Calculator {
  public func add (left: int, right: int) -> int => left + right;
  public func %call(left: int, right: int) -> int => @add(left, right);
}

val calc = new Calculator();
println!(calc(2, 5)); // Prints: "7"
```

Remember: making the **class** callable as a function requires a static function, while it won't be to make the **instances** callable as a function. We can also implement both the overloads in the same time, of course.

### Friends

Another concept of accessibility is the _friends_. These are resources, listed in a class, that can access its private attributes. Here is how it goes:

```sn
class Product {
  private static counter = 0;
  private id: int;

  public func %construct() => @unique_id = self::counter ++;

  // List a function as this class' friend
  friend getProductId(product: self) -> int;
}

// Define the class' friend function
func getProductId (product: Product) -> int {
  // Access the instance's private attributes
  return product.id;
}
```

There are several syntax to set a resource as friend:

```sn
class Product {
  // List a simple function as a friend
  friend func simpleFunction (product: self) -> int;

  // List another class' static function as a friend
  friend func AnotherClass::staticFunction(product: self) -> int;

  // List a function from another class' instances as a friend
  friend func AnotherClass.instanceFunction(product: self) -> int;

  // Even a whole class can be listed as a friend!
  friend class AnotherClass;

  // And even structures!
  friend struct SomeStructure;
}
```

As we will see later, this also works for interfaces, traits and other things.

## Cross-typing

Cross-typing is a very important concept in classes. SilverNight is largely based on it, as it features many useful sub-concepts for programming. In this chapter, we'll them all, before going to the final chapter about classes: the dictionnaries.

### Inheritance

Here is the big part of classes: inheritance. That's a very important concept so be sure to understand it fully.

When declaring a class, we sometimes encounter a problem when we want to make specific instances. For instance, let's say we have a `Hero` class. With it we want to describe a warrior, which has no `mp` but a `rage` attribute that increases when he receives damages which increases its attack points. At the opposite, we have wizards, who don't have `rage` but `mp` to use spell on their target.

The warrior could have a `rage` attribute to check if their rage level, and the wizard could have a `fireball()` method to throw a fireball to the ennemy.

Of course, we could implement this in a single class, by having a `type` attribute for instance that describes if the hero is a warrior or a wizard, and do the check in the two methods we just saw to forbid warriors using fireballs and always keep a nil rage for wizards. But that'd make our code less clear and less maintable, and that'll be even worse if we add new type of heroes (like a dragon that can fly to avoid attacks, or a demon that invokes some demoniac creatures).

A solution to this problem is the _inheritance_. How does it work? Well, it's mostly simple to understand: we will declare a new class that _inherits_ from another called the _mother class_. These classes will be called the _children classes_. In our example, the `Hero` class would be the mother, while two `Warrior` and `Wizard` classes would be the children that _inherits_ from `Hero`.

A class inheriting from another will receive all of its members, including overloads. That means any method that works on the mother class will work on this children. But the specificity of children classes it that they can implement their own members, and rewrite their parent's ones (though they can't remove them). For instance, if the `Hero` class has an `fight()` method, `Warrior` and `Wizard` could rewrite its body (what it does) but not its signature ; they will be forced to have a method with the same signature, even if they rewrite it. But, thanks to polymorphism, they can still define a new method with the same name if it has other arguments (and potentially another return type) - but the mother's method will be inherited anyway.

Now we saw the concept, let's implement it step by step. First, we'll make a skeleton for the mother class:

```sn
virtual class Hero {
  public readonly name: string;
  public readonly hp: int;
  public readonly attack: int;

  public %construct(@name: string, @hp: int, @attack: int) {}

  // Attack an ennemy
  public func fight (ennemy: self) {
    // Check if this hero is dead
    if (@hp is 0) {
      println!(`${@name} can't find because he's dead.`);
      return ;
    }

    // Attack the ennemy
    ennemy.receiveDamages(@attack, @name);

    // Check if the ennemy died
    if (ennemy.hp is 0) {
      println!(`${@name} killed ${ennemy.name}!`);
      return ;
    }

    // Receive damages from the ennemy
    @receiveDamages(ennemy.attack, ennemy.name);
  }

  // Receive damages from an ennemy
  public func receiveDamages (amount: int, ennemyName: string) {
    // Check if this hero is dead
    if (@hp is 0) {
      println!(`${@name} did not receive any damage because he's dead.`);
      return ;
    }

    println!(`${ennemyName} fights ${@name}.`);

    // Check if the damages are higher than the remaining HP
    if (amount > @hp) {
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

A little subtlety here is the presence of the `virtual` keyword before the `class` one. It's called a _class state_, a concept we'll see later. This one simply indicates the class can't be instanciated, so you can't do `new Hero();` or `val someone: Hero;` - both will throw an error. Instead, we will instanciate the `Hero`'s children classes, if they are not defined as `virtual` too.

Another thing: the `protected` keyword. It kind of acts like `private`, as the member it prefixes will only be available from the inside of the class. But, `private` is a special keyword that, in addition to making the attribute writable only from the inside of the class, will not make it available from its children class. So `Warrior` and `Wizard` wouldn't be able to write it. That's not really a problem, since these attributes don't aim to be modified, but that's a thing we need to think to when making a class that will be inherited by anothers. The `protected` keyword does the same thing than `private` excepted that it makes it available for children classes.

So, now we seen that, let's make our children classes:

```sn
class Warrior extends Hero {
  public readonly rage: int;

  public func receiveDamages (amount: int, ennemyName: string) {
    // Call the parent class' `receiveDamages()` method
    parent.receiveDamages(amount, ennemyName);

    // Check if the warrior rage will exceed 20 points
    //  by adding the damages just received
    if (@rage + amount > 20) {
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

What happens in this class? First, we tell to the class to inherit from `Hero`, so it keeps all its attributes and methods (including overloads). Next, we declare a new `rage` attribute, which this time is set as `private` because there won't be any class inheriting from it. Then, we redefine the `receiveDamages` method. In it, we use a brand new keyword: `parent`. It is the same as `this`, excepted it refers to the parent class as an instance. For example, `parent.receiveDamages()` will call the `receiveDamages()` method of the **parent class**. This way, we don't have to rewrite the calculation of damages and other checkings - which would make a code duplicate, which is a thing to avoid absolutely in development.

Then, the redefined method increases the rage counter (with a maximum of 20 points) and increases the warrior's attack points, so his attack points will be up to his original value plus 20 points.

We can now write our `Wizard` class:

```sn
class Wizard extends Hero {
  public readonly mp: int;

  public func %construct(@name: int, @hp: int, @attack: int, @mp: int) {}

  public func fireball (ennemy: Hero) {
    // Check if remaining MP are enough
    if (@mp < 10) {
      println!(`${name} can't throw a fireball because he doesn't have enough MP.`);
      return ;
    }

    // Decrease remaining MP
    @mp -= 10;

    // Attack the ennemy
    ennemy.receiveDamages(@attack * 2, @name);

    // Check if the ennemy died
    if (ennemy.hp is 0) {
      println!(`${@name} killed ${ennemy.name}!`);
      return ;
    }

    // Receive damages from the ennemy
    @receiveDamages(ennemy.attack, ennemy.name);
  }
}
```

The `Wizard` class also inherits from `Hero`, and adds a new `mp` attribute (private, like `rage` for `Warrior`). It also redefines the constructor, as it now needs a new attribute.

Then, it implements a new method called `fireball()` to throw a fireball on the ennemy, which doubles its attack points for this attack. Pretty powerful.

Now we've done this, let's try our classes:

```sn
let hegor = new Warrior("Hegor", 100, 30);
let jack  = new Wizard("Jack", 120, 10, 35);

hegor.fight(jack);
println!('------------------');
jack.fireball(hegor);

/*
 * Hegor fights Jack.
 * Jack loses 30 HP.
 * Jack fights Hegor.
 * Hegor loses 10 HP.
 * ------------------
 * Jack fights Hegor.
 * Hegor loses 20 HP.
 * Hegor fights Jack.
 * Jack loses 50 HP.
*/
```

Here we are! We implemented a mother class with two children.

### Resolution keywords

In a class, we can use a several keywords to access classes.

Briefly, `this` refers to the current instance's class, `self` refers to the current class, `parent` refers to `self`'s parent.

Let's take a short example:

```sn
class Mother {
  public func callHello () => this.hello();
  public func hello () => println!("I am the mother class.");
}

class Child extends Mother {
  public func hello () => println!("I am the child class.");
}
```

* `this` refers to the current instance whatever the class it is written in is. ;
* `self` will refer to `Child` inside the `Child` class, and to `Mother` inside the `Mother` class ;
* `parent` will refer to `Mother` inside the `Child` class, and throw an error if used in the `Mother` class.

But there is an important rule about `this`: if we write the following code:

```sn
val child: Child;
child.callHello(); // Prints: "I am the child class."
```

Here, we can use the `callHello()` method because `Child` inherits it from `Mother`. This method runs the `hello()` method of the _instance_'s class, not the current one. So it calls the `hello()` method from `Child` instead of of `Mother`. To call the method of the _current_ class, we should have used `self.hello()` instead.

Note that these keywords can be used both in a dynamic and static way: we could write `this::staticMethod()` as well as `self.sayHello()`, which would have printed `"I am the mother class"`.

### Abstract methods

Let's see a new prefix for class' methods: `abstract`. We already saw what a virtual class was, but now let's see what an abstract a method (because attributes cannot be abstraced) is.

Basically, abstracting a method means that its signature is written in the class, but its body is not forced to. It also forces any children of this class to implement its own version of the method, and this method will be usable in the parent even though its body is in a child.

Here is an example:

```sn
virtual class Hello {
  abstract public sayHello() -> string;
}

class World {
  abstract public sayHello() -> string {
    println!("Hello world!");
  }
}
```

The first difference we can see between these two classes is that the first one is abstract and not the second one. Why? Because, when we declare an abstract method without its body, it can't of course be used from this class - because the program doesn't know what to do. So it can't be instanciated, and because of it it is stated as a virtual class.

The second class declares an abstract method but with a body, this time. That means any child class will be forced to implement its own version of this method, but the class is still instanciable because we written the method's body in the class.

### Stated classes

As methods can be prefixed in a class, there are also prefixes for classes themselves. _Stated_ classes are standard classes with a keyword prefixing the `class` one, called the _class' state_. There are a few ones:

#### `virtual` classes

We already saw this state, it means the class cannot be instanciated, so it must have at least one child class that will be instanciable (if it isn't prefixed with the same keyword too).

#### `final` classes

Final classes are classes that can't be inherited. They can be instanciated, though.

#### `static` classes

Static classes are both `abstract` and `final` classes. They are not instanciable and not inheritable. This means all the class' members **must** be static.

#### `unique` classes

Unique classes are a special case where the class has one unique instance and cannot be instanciated later. Here is an example with a translation class:

```sn
unique class Translation as tr {
  public func translate (text: str, lang: str) -> string {
    // Do some stuff here
    return "Bonjour";
  }

  public func %call(text: str, lang: str) -> string =>
    @translate(text, lang);
}

// Let's try it!
val instance = new Translation(); // ERROR
Translation("Hello", "fr"); // ERROR

tr.translate("Hello", "fr"); // Returns: "Bonjour"
tr("Hello", "tr"); // Returns: "Bonjour"
```

As you can see, the `Translation` class does not even exist, in reality. There is only the `tr` instance.

#### `readonly` classes

Read-only classes are classes that can't be written from the outside of the class. All attributes must be set as read-only or be protected/private. Protected and private attributes that are not marked as read-only won't available from the outside of the class (as for a standard class).

### Typecasting

In SilverNight, typecasting is the concept of converting a given type into a primitive type, for example converting a string to an integer or a structure to a string. But it's not magic, types need to have a _transtyping overload_ for each primitive type they want to be typecastable to.

These overloads have to following signature:

```sn
  [public|protected|private] %toType() -> type;
```

If they are public, casting will work anywhere. If they are protected/private, they will work only from the inside of the class (and not in children if private).

For examlple, casting a type to a boolean (`bool` or `Boolean` type) requires the `%toBoolean` overload. Here is an example:

```sn
class MyInteger {
  private value: int;

  public func set (@value: int) {}
  public func get () -> int => @value;

  public func %toBoolean() -> bool => @value isnt 0;
}
```

Now, `MyInteger` instances can be casted to booleans (`false` if they are equal to 0, `true` else).

Here is the list of all typecasting overloads:

```sn
  // ...
  public func %toBoolean()   : bool;
  public func %toInteger()   : int;
  public func %toFloat()     : float;
  public func %toString()    : string;

  public func %toNumber()    : Number;
  public func %toPrimitive() -> string;
  // ...
```

There two last overloads can be automatically available even if they are not written by hand: `%toNumber` and `%toPrimitive`. The first one returns a `Number` instance but exists if and only if either `%toInteger` and/or `%toFloat` is implemented. If `%toFloat` exists, it will return its result, else it will return `%toInteger`'s one.

The `%toPrimitive` overload will simply return a string if **any** typecasting overload is implemented. It will give priority to `%toString`, then to `%toNumber`, then to `%toBoolean`. That's as simple as that. It can be useful in some cases like in interfaces and/or traits like we'll see later.

**NOTE :** `Number` is the mother class of both `int` and `float`, themselves respectively mothers of all integers types like `uint8` or `int32` for the first one and floating-points types like `ufloat` or `double` for the second one.

A concrete example of using these overloads is when using the `println!` macro. It takes as an argument any instance implementing `%toPrimitive`, gets this overload's result, and prints it in the output. There are several usages of it, but most are to use them in interfaces and traits.

### Sub-typing

Here is a very useful feature that simply acts like this: any children class will be accepted if one of its ancestors is required.

To put it clearly: if a function asks for a `Vehicle` and we make a `Motorcycle` child class that inherits from `Vehicle`, the function will accept `Motorcycle` instances.

Here is an example:

```sn
class Vehicle {
  public func accelerate () => println!("Vroom!");
}

class Motorcycle extends Vehicle {
  public func accelerate () => println!("vroom vroom!");
}

func acceleration (vehicle: Vehicle) {
  vehicle.accelerate();
}

acceleration(new Vehicle()); // Prints: "Vroom!"
acceleration(new Motorcycle()); // Prints: "Vroom vroom!"
```

Be aware though: when declaring a resource as a type and using a child type instead, you won't be able to use its new members. The only difference can come from the rewritten methods that already existed in the type we declared, these ones will use the code of the child type.

```sn
class Vehicle {
  public func accelerate () => println!("Vroom!");
}

class Motorcycle extends Vehicle {
  public func accelerate () => println!("vroom vroom!");
  public func stunt () => println!("Wow!");
}

val motorcycle: Vehicle = new Motorcycle();
motorcycle.stunt(); // ERROR because `stunt` is not part of the `Vehicle` class
```

That may appear to be simple and not very useful at the moment, but as we will see later that's an extremly useful concept. Also, note there is a way to ask for a specific type and not its children, thanks to the `#mustbe<T>` directive. Yes, directive can be templated. Here is an exemple:

```sn
func precise (vehicle: #mustbe<Vehicle>) =>
  vehicle.accelerate();

let car        : Vehicle    = new Vehicle();
let motorcycle1: Vehicle    = new Motorcycle();
let motorcycle2: Motorcycle = new Motorcycle();

println!(precise(car));         // Prints: "Vroom!"
println!(precise(motorcycle1)); // ERROR
println!(precise(motorcycle2)); // ERROR
```

### Interfaces

Because understanding the concrete point of an interfaces isn't always easy, let's take an example to introduce the concept.

Let's say we have a function that takes two arguments of any type, and add them as integers. In order to perform the addition, they need to be convertible to integers, of course. So our function will take any argument that implements the `%toInteger` overload. But how can we do that?

The first idea would be to make a virtual class called `ConvertibleToInt` with an abstract method called `%toInteger`, like this:

```sn
virtual class ConvertibleToInt {
  abstract func %toInteger() -> int;
}
```

But that would be a very bad idea. Why ? Because all classes would have to inherit from it to be used in our function so it would restrict the accepted type of arguments to the only classes that implement it. Right from the start it excludes all the native types (which doesn't inherit from your own class, of course) plus all the classes you haven't made yourself (which are part of a library, for example) and the classes that already inherits from a class, because a class can't have multiple mother classes. This also would be very heavy to write.

So, the solution to this problem is to use an interface. An interface is simply a list of functions and attributes a class **must** implement - it can't write the body of functions. When declaring a class, you explicitly tell what interface(s) it uses, and not implementing any of the interface's members will result in an error.

Also, and that's the great point about interfaces, any class that implements all of its members (with the exact same signature, accessibility etc.) will be considered as implementing the interface itself. If we use it with sub-typing, you could easily imagine to solve our problem.

Try to find the solution by yourself. The solution is just below:

```sn
interface ConvertibleToInt {
  public func %toInteger() -> int;
}

func add (left: ConvertibleToInt, right: ConvertibleToInt) -> int {
  return int(left) + int(right);
}
```

**NOTE :** Writing `int(value)` calls the `int` class as a function with `value` as an argument to convert it to an integer. It accepts any value implementing the `%toInteger` value, like our interface.

If we try this code, it works perfectly fine.

#### Self-references

An interface can use the `self` keyword to refers to the class that is implemeting it. Here is an exemple:

```sn
interface Duplication {
  public func duplicate () -> self;
}

class Product {
  public readonly name: string;

  public func %construct(@name: string) {};

  public func duplicate () -> self => new Product(@name);
}
```

The `parent` keyword is also available.

#### Native typecasting interfaces

Here are some native typecasting interfaces we can use in our programs:

* `BooleanConvertible`
* `IntegerConvertible`
* `FloatConvertible`
* `NumberConvertible`
* `Stringifyable`
* `Clonable`
* `Freezable`
* `Serializable`
* `Randomizable`
* `Primitivable`

**NOTE :** `Randomizable` forces to implement the `%random` overload that generates a random element of the current class.

#### Implemeting interfaces in a class

To implement an interface in a class, simply use the `implements` keyword like the `extends` one:

```sn
class Two implements ConvertibleToInt {
  public func %toInteger() => 2;
}
```

Think to it if you have to accept any type of value that simply implements some attributes and/or methods.

#### The `Any` interface

The smallest interface in SilverNight is the `Any` interface. It allows us to take absolutely any instance of any class as an argument. Here is its full declaration:

```sn
interface Any {
  // Nothing here
}
```

Yes, this interface is empty. Because it is empty, every single class implements it. So every class will match the requirement of implementing the `Any` interface, and we can use it in our programs!

But, because it is empty, we can't use **any** member of the values we get from it. So, how could we ever need it? That's because of things like reflection we'll later, that can grant information on absolutely any type, and with some macros. But most of the time, we simply won't use it. Simply remember that if you need to accept any type of value in one of your functions for instance, this interface exists.

### Traits

Traits act kind of virtual classes. The main difference though is they can't implement static members, but they can still write the body of the function they declare. They aim to provide _horizontal reuse_, while virtual classes aim to provide _vertical reuse_ (plus the fact they can implement static members).

A good example of traits is when you want to inherit from multiple classes. This is absolutely impossible in SilverNight, but you implement multiple traits. Here is how it goes:

```sn
trait Vehicle {
  public val speed: float;
  public func accelerate () -> string => "Vroom !";
}

trait Wheeled {
  public val wheels: uint;
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
printlnl!(car.accelerate()); // Prints: "Vroom!"
```

## Templates

Here we are, another of the most important concepts of Object-Oriented Programming: the templates. In fact, you won't use them explicitly very often, but you will use them _implicitly_. To be exact, you already do this as lists and arrays use templates, as we will see now.

Remember when we talked about `List` and `Array` as _templated_ types? This meant these two classes take a class reference, called a _template_, to work.

Basically, a template is the name of a class. Any class, function, structure... can use one or several templates to work, and it will register it as an _alias_.

To take an example, let's say I have a structure that aims to associate any kind of value with an identifier. With what we saw until now, we can't do that because there is no way to accept any type in a structure. That's where the templates come.

```sn
struct ValueWithID<T> {
  val id: int;
  val value: T;
}
```

Let's detail this. We have a structure, called `ValueWithID`, with two attributes: `id` (which is an integer) and `value`, which is an instance of `T`. Both are constants to ensure they won't change after the structure's creation.

Here, `T` is called the structure's _template_. When a structure is declared with a template, we can't just write `val something: ValueWithID`, but `val something: ValueWithID<SomeClass>`. Then, `T` will simply refer to `SomeClass`, so `value` will need to be an instance of `SomeClass`. Here is an example:

```sn
struct ValueWithID<T> {
  val id: int;
  val value: T;
}

val test: ValueWithID<string> = {
  id: 1,
  value: "Hello !"
};
```

There's also a feature in SilverNight called _Inferred Templating_, which acts like IST for structures and ICT for callbacks: it _guesses_ the template's type, and can be combined with both IST and ICT. So, we can declare our `test` constant like this:

```sn
val test = {
  id: 1,
  value: "Hello !"
};
```

That's more simple, right? Now, let's see an application in classes. We will make a class that acts as a dictionary: it will associate a key (of any type) to a value (of any type). Here is how it could look like:

```sn
class KindOfDict<K, V> {
  private keys: K[];
  private values: K[];

  public func has (key: K) -> bool => @keys.has(key);

  public func set (key: K, value: V) {
    // If this key is not already known...
    if (not @has(key)) {
      // Create it
      @keys.push(key);
      // Add the new value
      @values.push(value);
    } else
      // Else, associate the new value to the existing key
      @values[@keys.indexOf(key)] = value;
  }

  public func get (key: K) -> V =>
    // Return the value associated to the key
    @values[@keys.indexOf(key)];
}
```

**NOTE :** As for a real dictionary, an error will be thrown if someone tries to get the value associated to an unknown key. The `has()` function is here in order to avoid such a thing to happen.

Here, we use two templates for our class: `K`, which refers to the keys, and `V` for the values. We can know make a new "dictionary" like this:

```sn
val myDict: KindOfDict<Array<int>, string>;

myDict.set([ 2, 5 ], "Message 1");
myDict.set([ 4, 8, 3 ], "Message 2");

println!(myDict.get([ 2, 5 ])); // Prints: "Message 1"
```

As you can see, templates you can even be other templated classes. Because, yes, both `Array` and `List` are templated types - they are in reality custom dictionary classes this chapter aims to present.

### Optional templates

Many native functions use optional templates. They work exactly like optional arguments for functions:

```sn
struct Data<T = float> {
  val id: int;
  val value: T;
}

val test: Data = {
  id: 5,
  value: 2.8
}; // Works fine
```

### Static templates

When inheriting from a class, the child class must have the exact same number of templates, in order to use all of its parent's ones. But, sometimes we don't want to let the user choose and prefer to force a specific class instead. Here is how it goes:

```sn
class Mother<K, V> { /* ... */ }
class Child<K is string, V> { /* ... */ }
```

The `Child` class will now only require a single template: `V`, because `K` is forced to be the `string` class (we say it's a _static_ template, while `V` is a _dynamic_ one).

```sn
val child = new Child<int>; // K = string ; V = int
```

### Restricting templates

Because the chosen template will always vary, we can't instanciate it nor use its methods/attributes. But we may want to interact with the template or its instances, by ensuring it implements some methods or attributes. That's possible, and here is the syntax:

```sn
// Make a structure
struct Data<T implements Stringifyable> {
  val value: T;
  func stringify () -> string = () => string(value);
}

// Make a class that works with the structure
class Working {
  public func %toString() => "It's working!";
}

// Make a class that doesn't work with the structure
class NotWorking {
  public func %toInteger() -> int => 28;
}
```

Let's try this code:

```sn
// This works
val workingTest: Data<Working> = {
  value: new Working();
};

println!(workingTest.stringify()); // Prints: "It's working!"

// This doesn't work
val notWorkingTest: Data<NotWorking> = {
  value: new NotWorking()
}; // ERROR because `NotWorking` does not implement `ConvertibleToString`
```

Here are some examples of constrained templates:

```sn
T extends SomeClass;

T implements SomeInterface;
T implements SomeInterface1, SomeInterface2;

T use SomeTrait;
T use SomeTrait1, SomeTrait2;

T extends SomeClass implements SomeInterface use SomeTrait;
```

Pretty powerful, right? We can this syntax to force the templates to do codes like this:

```sn
class StringDict<K, V implements Stringifyable> extends KindOfDict<K, V> {
  public stringify(key: T) -> string => string(@values[@keys.indexOf(key)]);
}
```

Note that inheritance is a little but special with templates: writing `T extends SomeClass` will of course accept all classes inheriting from `SomeClass`, but also `SomeClass` itself. Be aware of that.

That's all! Note that, if a class inherits from another that uses some template(s), it must have the exact same number of templates (must it is not forced to use the same names).

For information, the `T`, `X`, `Y`, `Z`, `K` and `V` names are reserved to templates.

### Dynamic return types

Here is a problem we may encounter soon: we have a function, that takes a single argument of any type, do some things with it (like putting it in an array or something) and return an instance of the exact same type. A first idea would be to do this:

```sn
func treat(something: Any) -> Any;
```

But we're wrong, because the following code won't work:

```sn
let height = 8;
height = treat(hello); // ERROR
```

An error will be thrown because `height` is typed as an `int` but `treat` returns an instance of `Any`. This is where we block: the function tells it can return absolutely any type of values. To solve this problem, we'll simply use templates with inferred templating:

```sn
func treat<T>(something: T) -> T;

let height = 8;
height = treat(hello); // Works fine
```

Here, this works because when we call the `treat()` function, inferred templating guesses that `T` refers to `int` thanks to `something` being an `int`. So, this function's call will return a `T`. That's as simple as that.

## Dictionaries in depth

Let's see the final part about classes: dictionaries. As you already, dictionaries in SilverNight are instances of the `Dictionary` class. But how do they really work? That's what we will see in this chapter, as well as how to make your own dictionary classes to store key/values (or more) dictionaries with a custom behaviour.

### Dictionary classes

Here is an heavy part of this chapter: how to make custom dictionaries.

First, what's a dictionary, exactly? In SilverNight, a dictionary is any instance of a dictionary class. These classes provides an instance that aims to associate a key to a value, whatever their type and content are, but with a single type for keys and a single type for values.

#### The truth about vectors

The `Array` and `List` classes are in fact dictionaries. They both inherits from the `Vector` dictionary class, which associates integers to any type of value. The integers in question cannot be manually manipulated, they are automatically handled by the dictionary class, to keep keys from 0 to any positive integer.

#### How to make dictionary classes

Dictionary classes (also called custom dictionaries) are defined this way:

```sn
// K = type for keys
// V = type for values
dict Custom<K, V> {
  // Code here
}
```

There are a special kind of classes. First, some overloads **must** be implemented. These are `%get`, `%set`, `%unset`, `%has`, `%keys` and `%values`, which are specific to dictionaries and can't be used in standard classes. All other overloads (like `%clone` or `%random`, even `%construct` and `%free`) can be implemented but are not required. Also, dictionary classes must take two templates (they can have any name) but they can force the type of keys and/or the type of values by writing a class' name instead (like `dict Vector<K is int, V>` for vectors).

Let's detail these overloads:

```sn
// K = type for keys
// V = type for values
dict Custom<K, V> {
  // Get a value from a key
  public func %get(key: K) -> V;
  // Associate a value to a key
  public func %set(key: K, value: V);
  // Delete a key (and the value it refers to)
  public func %unset(key: K);
  // Check if a key is known
  public func %has(key: K) -> bool;
  // Get the list of all keys
  public func %keys() -> List<K>;
  // Get the list of all values
  public func %values() -> List<V>;
}
```

As always, the return type of these overloads is omittable, put they are written here to see their complete signature.

About `%keys` and `%values`, their behaviour is a little special. They can be called automatically, when iterating the dictionary through a loop (we'll see that soon), or manually thanks to a function. If they are called automatically (in a loop iterator, for instance), the return value will be kept as it is. But if they are called manually, the return value will automatically be cloned - and there's no way to prevent it. Why this behaviour? Because, if a loop iterates through the list of keys/values, there is no need to clone the values as the list will not be written. But if the list is retrieved manually and written by some piece of code, this could cause some garbage in the dictionary - because some dictionary use a special behaviour like forbidding duplicate values or restricting keys to a specific list of names.

Most of the time, custom dictionaries should always inherit from the `Dictionary` class (the same one that is used when using `#Dynamic` in a key/value association with IST). The syntax is the same as for classes:

```sn
dict Custom<K, V> extends Dictionary<K, V> {
  // Do some stuff here
}
```

This will inherits all functions that comes with basic dictionaries, like `.filter()` or `.map()`. It will grant access to two protected members, `keys` and `values`, which are arrays referring respectively to the dictionary's keys and its values, as well as all overloads you can implement in a dictionary with no restricted template.

A specificity about dictionary overloads is that they can be implemented by **any** standard class. This is why we can use integer indexes on a string even though that's not a dictionary, for example. The `dict` keyword simply indicates the class implements every overloads required for a dictionary and explicitly indicates its use.

### Exploring dictionaries

#### Dealing with public members

As we saw before, dictionaries associate a key to a value. So, getting any index from the dictionary, like `mydict.someIndex` will return a key, whatever happens. But, what about public members?

For example, the `Dictionary` class implements a `.fill()` function, so we can do `mydict.fill("hello")`. But then, `mydict.fill` won't return a value of the dictionary, right?

This is a conception choice that hopefully has a solution if we want to access any index. In order to be assured to get the value corresponding to the key we have, we simply have to do: `mydict[index]`, where `index` is an instance of `K` (the dictionary's key type). Getting an index between brackets means we're explicitly trying to get an index, not a public member, while `mydict.index` means we are first trying to get a public member if it exists, else to get the value associated to this key (if it exists).

#### Using loops to iterate dictionaries

Loops are our best friend when exploring dictionaries. While we can still get access to the list of a dictionary's keys thanks to `mydict.keys()` and to its value with `mydict.values()`, the most simple remains to use the `for` loop:

```sn
// Explore a dictionary using its keys
for key in myArray.keys() {
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

#### The case of vectors

This is very simple: a `Vector<T>` (`List` or `Array`) is a `<K is int, T>` dictionary (with different members, though). That's as simple as that.

#### Collections

There is a native type called `Collection<T>`, which is a strict equivalent to `Dictionary<string, T>`.

#### Shortened typing

A way to simplify the writing of dictionary names is to use the shortened syntax, as it follows:

```sn
// Collection<double> <=> Dictionary<string, double>
val dict: { double };

// Dictionary<string, int>
val dict: { string, int };

// Dictionary<string, Dictionary<int, float>>
val dict: { string, { int, float } };

// Dictionary<Dictionary<string, int>, float>
val dict: { { string, int }, float };

// Dictionary<Dictionary<Dictionary<string, int>, float>, string>
val dict: { { { string, int }, float }, string };
```

## Advanced concepts

Here is a transitional chapter between the end of object-oriented programming and deeper concepts of SilverNight like errors, pointers or packages. The notions we will see here may not be used in every single program, be they can still be useful.

### Bindings

A useful concept when using libraries with a lot of resources is the _bindings_. It consists in applying an alias object on a function to extract resources in the local scope.

Let's imagine we have an `engine` class instance with a `run` function, which takes as an argument a function. This game engine runs the function but it also wants to provide a huge number of functions to manage the scene, the collisions, the geometry, the physics, etc.

A first solution would be to provide them each one after another as an argument. But this would result in a lambda with thousands of arguments, so that's not a good idea, even with the `#auto` lambda (because we still have to write the argument's name and order).

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

This works but involves to create a large structure, and then make an object with it, then give it as an argument. Putting aside the fact it is really heavy, all the functions would need to be called with `functions.init()`, `functions.createScene()` etc. which is long to write and heavy too if we call them multiple times. Plus, there's no difference between writing `engine.init()` or `engine.createScene()`.

That's where we use bindings. Bindings act like plain structure that links a name to a resource. Let's take an example:

```sn
func run (callback: lambda () #bind
  {
    printInConsole: "println!",
    sayHello: "println!(\"Hello \" + ${1})",
    sayHappyBirthday: "println!('Happy birthday ' + ${1} + ' you are now ' + ${2} + ' years old!')"
  })
  => callback();
```

Here, `myBindings` generates several links.

* The first one simply aliases `println!` as `printInConsole`, s we can do `printInConsole("Hello")`.
* The second one uses `${1}` in its body, so it acts as a function and takes one, and only one argument, that cannot be omitted. Doing `sayHello("Jack")` will result in `println!("Hello" + "Jack")`.
* The third one acts like the first one, but with two arguments. So writing `sayHappyBirthday("Jack", 28)` will result in `println!('Happy birthday ' + 'Jack' + ' you are now ' + 20 + ' years old!')`. Thanks to typecasting, `20` will be understood to `"20"`.

So, we can use the `run` function like this:

```sn
run(() => {
  #bind;

  printInConsole("Hello, world!");
  sayHello("Jack");
  happyBirthday("Jack", 28);
});
```

This will work as expected, even if the three functions we use in the callback don't really exist but are part of the bindings object. Note that `#bind` directive at the beginning of the callback: it means we know a bindings object will be applied to it and that we accept it. This is needed because bindings can also rewrite the native functions/macros, so the program needs to be sure we really want to perform the binding.

#### Using a declared bindings object

Because writing bindings is heavy in a function's signature (like we saw), and because we may want to re-use bindings several times, we can declare the bindings as an object to use them later. The bindings object is a plain structure linking a string (the name) to another string (the resource). Here is how it goes:

```sn
pln engineBindings = #makebindings {
  printInConsole: "println!",
  sayHello: "println!(\"Hello \" + ${1})",
  sayHappyBirthday: "println!('Happy birthday ' + ${1} + ' you are now ' + ${2} + ' years old!')"
};
```

This is all! We can now rewrite our `run` function:

```sn
func run (callback: lambda () #bind engineBindings) => callback();
```

### Constrained types

Sometimes we want to get restricted values from a specific type. For example, if we make a function named `treatCars` that takes a `Vehicle` instance as a parameter, we could only want to accept vehicles with four `wheels` or less.

This time, because we haven't seen any feature that could achieve it, let's just see how it we could do it: with _constrained types_. Assuming we have this code:

```sn
class Vehicle {
  public readonly wheels: int;
  public func %construct(@wheels: int);
}

val car = new Vehicle(4);
val motorcycle = new Vehicle(2);
```

Our function will have this look:

```sn
func treatCars (car: Vehicle with (c => c.wheels <= 4)) =>
  println!(`This vehicle has ${car.wheels} wheels.`);
```

Here, the `with` keywords indicates a constrained type. At its left, we write the type we want to constraint, and at its right a callback (the constraint).

But how does it work? This is simple: when we read the value, it acts exactly like if we didn't put a constraint on its type. But when we try to write it (assign something else), the callback will be ran with an argument, the value we are trying to assign. It could also receive a second argument, which would then be the current value of the resource. As you can see, ICT works in the constraint callback because arguments' types as well as its return type can be guessed.

If we put aside the fact that writing is controlled by a callback, constrained types act **exactly** like standard types: sub-typing work with them (in the example above, writing `Vehicle` instead of its constrained version would accept it as well).

Here is an exemple to better understand the concept:

```sn
func treatCars (car: Vehicle with (c => c.wheels <= 4)) {
  c = new Vehicle(2); // Works fine
  c = new Vehicle(4); // Works fine
  c = new Vehicle(8); // ERROR because the constraint returned `false`
}

treatCars(new Vehicle(4));
```

When the resource is written, the callback receives its value (plus the current value of the resource if it takes two arguments), and returns a boolean. If it accepts the changes, it will return `true` (in our case, this will happen only if the vehicle has four wheels or less). Else, it will return `false` and the writing will be rejected, which will result in an error.

But, because of the need to match the constraint, constrained resources cannot be declared without an initialization value. Here is an example:

```sn
let car: Vehicle with (c => c.wheels is 4); // ERROR
let car: Vehicle with (c => c.wheels is 4) = new Vehicle(4); // Works fine
```

Also, because we could want to re-use a constrained type later, the `#type` directive allows us to register:

```sn
#type Car is Vehicle with (c => c.wheels is 4);

let car: Car;                  // ERROR
let car: Car = new Vehicle(2); // ERROR
let car: Car = new Vehicle(4); // Works fine
```

### Macros

Remember the very first "function" we saw in this book? Yes, this was `println!`. Why there are quotes about "function"? Because `println!` is not a function. It's a macro.

But what's a macro, anyway? A macro is simply a function that replaces some parts of the code by anothers. To take, an example, `println!` will replace the arguments you give to it by `Output::println(...<your arguments>...)`.

To understand better the concept, here is how we define a macro:

```sn
#macro sayHello(name: string) => println!(`Hello, $${name}`);
```

Note the double `$` symbol here: it means we are retrieving a macro variable and we want to insert it as it is. Now, how do we use the macro? Like this:

```sn
// Call the macro
sayHello!("Jack");

// Will produce:
println!(`Hello, Jack`);

// Which will itself produce:
Output::println(`Hello, Jack`);
```

As you can see, a macro is simply a way to simplify the writing of a call. It would be heavier to write `Output::println` each time we want to display something in the console, right? That's why the `println!` macro is here. And as you can guess, the `!` symbol indicates we are calling a macro and not a function (except unsafe functions, but we'll see that later).

Macros can have several arguments, which must be typed. But it can also have a return type if it is ensured to return a specific type of value. For example, in our example, because `println!` is void-typed, the macro will return a `void`. So, we write:

```sn
#macro sayHello(name: string) => println!(`Hello, $${name}}`);
```

One of the native macros can be useful when using arguments. In fact, when writing the same macro as above but like this:

```sn
#macro sayHello(name: string) => println!("Hello, " + name);
```

Using it will almost certainly throw an error. Why? Because it would produce this result:

```sn
// Call the macro
sayHello!("Jack");

// Will produce:
println!("Hello, " + Jack);
```

Until a `Jack` resource is declared, the code above will throw an error because of an undefined reference. This is due to the fact every argument given to a macro is gave as a plain content. The solution to this problem is to use the `#uneval` directive.

```sn
#macro sayHello(name: string) => println!("Hello, " + #uneval(name));
```

Also note that macros can use a special type for their arguments, that are not available for standard functions. It's the `#raw` type, which prevent the arguments from being checked and evaluated. For example, the following code will work fine:

```sn
// Declare the macro
#macro sayHello(name: #raw) => println!("Hello, " + name);

// Call it
sayHello( 'Jack' );
// This will produce:
println!("Hello, " +  'Jack' );
```

As you can see, even the spaces are kept in `name`. Note that plain arguments can also be unevaluated to a string:

```sn
// Declare the macro
#macro test(name: #raw) => #uneval(name);

// Call it
println!(test( 'Jack' ));
// This will produce:
println!(" 'Jack' ");
```

There is also a type to ask specifically for an assignable entity (variables, constants and frozens):

```sn
// Declare the macro
#macro test(name: #var) =>
  println!(`$${name} is an assignable entity`);

// Declare a constant
val hello = "World";

// Declare a structure
struct Hero {}

// Call it
test!(hello); // Prints: "hello is an assignable entity"
test!(notfound); // ERROR because `notfound` does not exist
test!(Hero); // ERROR because `Hero` is not an assignable entity
```

Note that `#var` can be templated, like `#var<string>` to accept any assignable entities with `string` type.

Another type we can use is `#name`: it forces to use a valid entity name, but does not check if it exists. It can be especially useful if we want to make some declarations:

```sn
#macro make_vehicles(name: #name) => val $${name}: Array<Vehicle>;

// Writing this:
make_vehicles(hello);
// Will produce:
val hello: Array<Vehicle>;
```

Another type we can use is `#name`: it forces to use a valid entity name, but does not check if it exists. It can be especially useful if we want to make some declarations:

```sn
#macro make_vehicles(name: #name) => val $${name}: Array<Vehicle>;

// Writing this:
make_vehicles(hello);
// Will produce:
val hello: Array<Vehicle>;
```

There are is last type for macros: `#noptr<T>`. It only accepts assignable entities, like `#raw`, but refuses pointers. Like `#raw`, it can be written without its template to accept any type. This is a specialized macro you probably won't encounter very often, but it's here if you need them.

_Tip :_ If you absolutely require a pointer in a macro, simply use the `&` symbol like functions. For pointer assignable entities, use `*pointer: #var<T>`.

To conclude, simply remember that every function signature (with `#macro` replacing `func`) is a valid macro signature, but that a macro can also use additional features like the `#var` directive.

### Unsafe functions

Unsafe functions are declared like macros, except they are called like standard functions and therefore won't replace their own call by another content. To be exact, when they are called their content replaces their call but in a transparent way. Let's see it:

```sn
unsafe func sayHello(name: string) -> void {
  println!(name);
}

sayHello!("Yeah");
```

The first thing we can see here is the use of the `unsafe` keyword, which indicates the following function is unsafe. The function is then called using the `!` symbol after its name, as for macros.

When the function is called, its content is directly evaluated, as for macros. The main difference comes from the fact when an error occurs in an unsafe function (like an incompatible type or something), the error will be located in the function's body, not in the code's body. Considering the following function:

```sn
// A sample function
func takeAnInt(ent: int) -> void {}
```

Here is how it goes with macros:

```sn
#macro sayHello(name: string) -> void => println!(name); \
  takeAnInt(name);

sayHello!("Yoh"); // Line 4
```

The error is thrown at line 5. Why? Simply because the call to `sayHello!` is replaced to the macro's content, so the evaluated content is in reality:

```sn
#macro sayHello(name: string) -> void => println!(name); \
  takeAnInt(name);

println!(name); // Line 4
takeAnInt(name); // Line 5
```

Here is the same thing with unsafe functions:

```sn
unsafe func sayHello(name: string) -> void {
  println!(name);
  takeAnInt(name); // Line 3
}

sayHello!("Yoh"); // Line 6
```

The error is now throw at line 3. Even though the unsafe function's content is instantly evaluated, errors are reported following the function's location. This is one the main points of unsafe functions, in fact.

Another high point is that unsafe functions can be part of a class. When so, `this`, `self` and `parent` will automatically refer to the current instance's class, the current class, and the parent class (as if these keywords were used inside a standard function). If the function is written outside of a class, using them will throw an error (as for a standard function). So, these keywords can never be used to refer the class that _calls_ the unsafe function, unlike macros that don't care about it.

Also, arguments are not directly replaced by their content, so errors will not tell that `takeAnInt("Yoh")` is an invalid call (this is what happens using the above macro), but that `takeAnInt(name)` is an invalid call because `name` is typed as a `string`.

Otherwise, unsafe functions are exactly like macros (for example type checking is performed only when the function is called and not at its definition).

### Overloading operators

Superoverloads are overloads that don't act only as a class level, but as the whole program's level. Some of them work with some concepts we haven't seen yet, so we'll only see operators superoverloads.

How do they work? That's simple: each operator superoverload overwrites the behaviour of an operator. Here is the list:

* `%plus` (`+`)
* `%less` (`-`)
* `%times` (`*`)
* `%divide` (`/`)
* `%modulo` (`**`)

You can see the matching operator on the right of the corresponding superoverload. Each of them take two arguments, and return a new value. Let's see an example: we have a class called `BankAccount`, with a public readonly member called `money` and a method to add and substract money from the account. We now want to be able to add two bank accounts. Here is how we could do it:

```sn
class BankAccount {
  public readonly money: int with (c => c >= 0);
  public func %construct(@money: int);
  public func add (amount: int) => @money += amount;
  public func sub (amount: int) => @money -= amount;
}

let account1 = new BankAccount(1000);
let account2 = new BankAccount(2000);

func %plus(left: BankAccount, right: BankAccount) -> int =>
  left.money + right.money;

println!(account1 + account2); // Prints: "3000"
```

That's as simple as that. Note that, conventionally, an operator superoverload's arguments are called `left` and `right` - even though we're not forced to call them this way.

We could also implement a way to handle operations between bank accounts and numbers:

```sn
func %plus(left: BankAccount, right: Number) -> Number =>
  left.money + right;

println!(account1 + 20); // Prints: "1020"
```

There are though some operators that can't return any type. These are the logical operators, which must return a boolean. Here is the list :

* `%equal` (`==`)
* `%greater` (`>`)
* `%smaller` (`<`)
* `%greater_eq` (`>=`)
* `%smaller_eq` (`<=`)

So, we could compare two bank accounts:

```sn
func %equal(left: BankAccount, right: BankAccount) -> bool =>
  left.money is right.money;

println!(account1 == account2); // Prints: "false"
println!(account1 == new BankAccount(1000)); // Prints: "true"
```

This works the same way for the other logical operators.

#### Order-aware superoverloads

Some superoverloads can be implemented automatically in some ways: if we define the `%equal` superoverload, the `!=` operator will also work and return the opposite of `%equal`. If we implement the `%greater` superoverload, `%smaller_eq` will automatically be implemented.

To avoid this behavior, simply write:

```sn
func %equal(left: BankAccount, right: BankAccount) #only : bool =>
  left.money is right.money;
```

This will prevent the `!=` operator from being automatically implemented as the opposite to our `%equal`.

#### Reversable superoverloads

Also, by default, implemeting a superoverload will preserve the argument's order. This means the following code:

```sn
func %equal(left: BankAccount, right: int) -> bool =>
  left.money is right.money;

println!(new BankAccount(1000) is 1000); // Prints: "true"
println!(1000 is new BankAccount(1000)); // ERROR
```

Will result in an error, because `%equal` only takes on its _left_ a `BankAccount` instance, and on its right an `int`. To make the superoverload working whatever the arguments order is without rewriting it with the opposite order, we can simply use the `#reversable` directive:

```sn
func %equal(left: BankAccount, right: int) #reversable : bool =>
  left.money is right.money;

println!(new BankAccount(1000) is 1000); // Prints: "true"
println!(1000 is new BankAccount(1000)); // Prints: "true"
```

This now works as expected. Note that `#only` and `#reversable` can be combined:

```sn
func %equal(left: BankAccount, right: int) #reversable #only : bool =>
  left.money is right.money;

println!(new BankAccount(1000) is 1000); // Prints: "true"
println!(1000 is new BankAccount(1000)); // Prints: "true"
println!(new BankAccount(1000) isnt 1000); // ERROR
```

#### Templating

It's possible to use templates on superoverloads, but only if these templates are part of the type of at least one argument of the function. Here are some examples of signatures:

```sn
// Doesn't work because "T" cannot be guessed
func %plus<T>(left: string, right: int) -> int[];

// Doesn't work because "T" cannot be guessed
func %plus<T>(left: string, right: int) -> T;

// Works fine
func %plus<T>(left: T, right: int) -> bool;

// Works fine
func %plus<T>(left: string, right: Dictionary<int, T>) -> string[];
```

## Nullable types

Here is a short chapter to show another of the most useful concepts in SilverNight: the nullable types. Basically, nullable types are types that can either be an instance of the class they refer to, or `null`. What's the point? Simply to provide a way of returning _nothing_.

### An example with points

To take an example, let's imagine we have a function that look for a point with `x` and `y` attributes equal to zero. It could look like this:

```sn
struct Point {
  name: string;
  x: int;
  y: int;
}

func getNilPoints (list: Point[]) -> Point {
  for point in list {
    if (point.x is 0 and point.y is 0)
      return point;
  }
}
```

This works fine. Now, what if we run this code:

```sn
val point: Point = getNilPoints([]);
```

Our program will crash because `getNilPoints` returned a `void` while a `Point` was expected. This is simply due to the fact no point matched the condition in the `for` loop, so the function ended without returning nothing (which is equivalent to returning an instance of `void`). So, in order to make this function works anyway, and without returning a whole structure with a `success` boolean or something ugly, we can use a nullable type:

```sn
func getNilPoints (list: Point[]) -> Point? {
```

This allows the function to return a `Point` instance **or** a `void` instance. But, our program will still crash with an error message telling that `Point?` cannot be converted to `Point`. That's simply because we declared our constant with the `Point` type, but we must now tell it can also contain a `void`:

```sn
val point: Point? = getNilPoints();
```

This now works fine. Also, inferred typing can do it automatically, like this:

```sn
val point = getNilPoints();
```

Note that writing:

```sn
val point: Point?;
```

Will, as for a standard type, be understood as this:

```sn
val point: Point? = new Point?();
```

Instanciating a nullable type will return the `null` value by default.

### The `null` value

As we saw, the `getNilPoints()` function can now return an instance of `void`. But what's that, exactly? That's simply a special SilverNight value with no member at all, excepted some overloads like `%toString()` or `%clone()`.

A strict equivalent to the function we saw would be:

```sn
func getNilPoints (list: Point[]) -> Point? {
  for point in list {
    if (point.x is 0 and point.y is 0)
      return point;
  }

  return new void();
}
```

This would achieve exatly the same thing. There's also a native value, named `null`, which is an instance of `void`:

```sn
func getNilPoints (list: Point[]) -> Point? {
  for point in list {
    if (point.x is 0 and point.y is 0)
      return point;
  }

  return null;
}
```

The function still works as expected. In fact, `null` is defined natively with the following instruction (here, `Void` is strictly equivalent to `void`):

```sn
frozen null: Void = new Void();
```

Be aware though, using inferred typing with `null` could result in the following behavior:

```sn
let point = null;
point = getNilPoints([]); // ERROR
```

This will result in an error because inferred typing gave the `void` type to `point`, so it can't receive a `Point?` value.

Now we've saw all this, let's try our function:

```sn
val point1 = getNilPoints([ { name: "Test point", x: 0, y: 0 } ]);
println!(point1.name); // Prints: "Test point"

val point2 = getNilPoints([]);
println!(point2.name); // ERROR
```

The second call to `getNilPoints()` makes our program crash. Why? Simply because `point2` is a `void` instance, so it has no `name` member. We have to check first if our constant contains a `null` value or not, thanks to the equality operator `==` or the difference operator `!=`. This can be done thanks the fact two instances of the same class can be compared with these two operators (we'll see that in details in the pointers chapter). So we can write:

```sn
val point = getNilPoints([]);

if (point is null)
  println!("No point found.");
else
  println!(`A point was found: ${point.name}`);
```

Also, thanks to `void` implementing a `%toBoolean` overload which always return `false`, we can do use some native operators like `!` or `point ? doSomething() -> doSomethingElse()` on our constant.

### The nullable `?` operator

Here is an operator we can use to do something only if the value is not null. Here is an example:

```sn
val point = getNilPoints([]);
println!(point?.name);
```

Here, because `point` is null, the program won't try to access its `name` property thanks to the `?` operator. Instead, it will return a `void`, so the return type of the expression, whatever `name` is null or not, will be `string?`. This operator avoids crashes when accessing a value's attribute, and will always return null if the value it is applied (the value on its left) on is null.

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
val dataHero = data?.hero; // dataHero == null

// Prints the hero's name
println!(dataHero?.name); // Prints: "" (== string(null))
```

What happened here? Well, doing `data?.hero` returned `null` because `data` was null. Then, doing `dataHero?.name` also returned a `void` because `dataHero` was null. So the final expression between the `println!`'s parenthesis is a `string?`.

### Automatic typecasting

Let's take an example for this one: we have a function that takes a `string` as an argument, but we want to give it a constant that was declared as a `string?`. Because the function may not be able to handle the `null` value, this should result in an error.

But there's a specific typecasting for nullable types. When giving a nullable type where a standard type is expected, it is automatically cast into the standard type, and an error will be thrown if the value was `null`. Let's take an example:

```sn
func inc (num: int) -> int => num + 1;

val one: int = 1;
val two = inc(one); // Returns: 2

val three: int? = 3;
val four = inc(three); // Returns: 4

val nothing: int? = null;
val result = inc(nothing); // ERROR
```

Note that `two` and `four` automatically gets the `int` type, which is the `inc`'s return type, not `int?`.

The last call to `inc` fails because a `null` value was gave, so typecasting to an `int` failed to be done. In order for this instruction to work, typecasting must be done manually, using:

```sn
val result = inc(int(nothing)); // Returns: 1
```

This works only because both `null` implements `%toInteger()` (which returns `0`).

### Forced nullable typecasting

There's two macros available to turn a nullable value into a standard value, which is `strict!`, and another to turn a standard value into a nullable value, which is `nullable!`. Here is how they go:

```sn
val standard: int = 1;
val nullable: int? = 2;

val one = nullable!(standard);
val two = strict!(nullable);
```

Now, `one` has nullable `int?` type and `two` has standard `int` type.

### A concrete example

A concrete example of nullable types usage: the problem of list initialization.

Here is the program we want to make:

1. Declare a list of integers with 4096 cells.
2. Generate a random boolean.
3. If it's "true", fill the list with zeros
4. If it's "false", fill the list with ones

The problem is: if we simply declare the list with `val`, we create a `List<Vehicle>` instance that will be filled with vehicles later. So this will generate 4096 instances of the `Vehicle` class at the same time the list is declared, and then we will make again 4096 instances in our `if` block. Performances are so divided by 2.

In order to avoid this problem, we can declare the list using an optional type. When the resource is declared, no instance is created, and we will only instanciate it in our conditional block, so "only" 4096 instances of `Vehicle` will be created, instead of 8192 with the previous method - that's a considerable speed up.

Here is how it works:

```sn
let list: List<Vehicle>? = null;

if (random!(bool))
  list = (new Vehicle[4096]).fill(new Car());
else
  list = (new Vehicle[4096]).fill(new Motorcycle());
```

But, because it's always preferable to avoid using nullable types as they can cause errors if not manipulated correctly, and because the code above is not optimized, we should write this one instead:

```sn
val list = (new Vehicle[4096]).fill(
  random!(bool) ? new Car() -> new Motorcycle()
);
```

Even though this code is not pretty, it's better optimized and avoid using a nullable type. Plus, our `list` resource is now a constant instead of being a mutable.

## Errors

In SilverNight, behaviours that can't natively be handled throw errors. For instance, dividing a number by zero will throw an error because the program doesn't know how to handle it.

### How errors are thrown

Throwing an error consists in throwing an _instance_ of an error class. What's that? This is simply a child class of the native `Error` class, or `Error` itself. After instanciating it, the error is thrown using the `throw` keyword, like this:

```sn
throw new Error("Something bad happened.");
```

Here, `throw` indicates it will throw an error. The instance written on its right is the error we want to throw. If we write the code above in our programs, they will crash with this error message (if debugging is enabled).

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
  public readonly traceback: List<ErrorStep>;
  public func %construct(@message: string);
  public func %toString();
}
```

As you can see, an error instance has a `message` attribute that is the message we give to it when we instanciate the class, and a `traceback` which is a list of functions that were ran until the error. Here is an example:

```sn
func a () => b();
func b () => c();
func c () => throw new Error("Test");

a();
```

If we run this script from a file named `src.sn`, `traceback` will be equal to the following object:

```sn
[
  {
    file: "src.sn",
    line: 3,
    column: 20,
    function: "global.c"
  },

  {
    file: "src.sn",
    line: 2,
    column: 20,
    function: "global.b"
  },

  {
    file: "src.sn",
    line: 1,
    column: 20,
    function: "global.a"
  },

  {
    file: "src.sn",
    line: 5,
    column: 1,
    function: "global.main"
  }
]
```

The `global` object refers to resources that are defined in a global context, which means they aren't defined inside a class for example. The `line` and `column` refers to the moment the current `function` calls another one. For the last function, it refers to the location of the `throw` keyword that has been ran.

### `try` and `catch` errors

Errors can either be automatically thrown (e.g. when dividing by 0) or manually (thanks to the `throw` keyword). But errors does not only aim to make the program crash when something goes wrong ; it also provides a way to understand something hasn't worked as expected and do something in consequence.

For exampe, we could imagine using a function to read a file. Reading the file could fail because of numerous reasons (file does not exist, error while reading the disk, invalid files table, etc.). Still, we don't want our program to stop just because the reading failed.

The same thing applies if we do a division, we could want to be able handle division errors. Here is an example:

```sn
func divide (left: int, right: int) -> float =>
  float(left) / right;

divide(2, 5); // Returns: 0.4
divide(2, 0); // ERROR
```

To catch the errors, we use a couple of blocks named `try` and `catch`. In the first one, which has no block head, we put the code that could throw an error. In the second one, which takes a single parameter (the error which could have been thrown) we put a code that is ran only if an error was thrown. If no error occured, this code will simply be ignored. Here is how it goes:

```sn
try {
  divide(2, 0);
} catch (e: Error) {
  println!("Division failed");
}
```

Here, a message will be displayed because an error has been automatically thrown when `divide` attempted to divided two by zero.

The great point of `try` and `catch` blocks is that the error is, well, _catch_ by the second block, so our program won't crash.

We can also use the `catch` block's argument to get additional informations about the error, like its message or traceback.

### Sub-typing with errors

Of course, as `catch` blocks ask for an error type, they support sub-typing. There are several numerous native error classes, like `ArithmeticError` or `OutOfMemoryError` (which occurs when the memory is filled). So, if we want to catch only some type of errors, we can use sub-typing in the `catch`, like this:

```sn
try {
  divide(2, 0);
} catch (e: OutOfMemoryError) {
  println!("Program is out of memory.");
}
```

Unless we really fill the memory up, this `catch` block will never display anything. But, we can also chain multiple `catch` blocks, to catch distinctly several types of error.

```sn
try {
  divide(2, 0);
} catch (e: OutOfMemoryError) {
  println!("Program is out of memory.");
} catch (e: ArithmeticError) {
  println!("Division failed because we can't divide by zero.");
}
```

Thanks to sub-typing (again), we can also use a final `catch` block that will catch absolutely any type of error:

```sn
try {
  divide(2, 0);
} catch (e: OutOfMemoryError) {
  println!("Program is out of memory.");
} catch (e: ArithmeticError) {
  println!("Division failed because we can't divide by zero.");
} catch (e: Error) {
  println!("An unknown error occured. Here is its message:");
  println!(e.message);
}
```

Also, thanks to inferred typing, if we give no type to the block's argument, it will be considered as `Error` automatically:

```sn
try {
  divide(2, 0);
} catch (e) {
  println!("Some error occured. Here is its message:");
  println!(e.message);
}
```

A last version of this syntax is if we don't care about getting an error object. In this case, we can simply omit the block's head:

```sn
try {
  divide(2, 0);
} catch {
  println!("Some error occured.");
}
```

### Making custom errors

Throwing custom errors simply consists in throwing an instance of a child class of `Error`. This allows us to make a distinction between native error types and our own ones. Here is an exemple:

```sn
func divide (left: int, right: int) -> float {
  if (right is 0)
    throw new CustomError("Cannot divide by zero.");

  return float(left) / right;
}
```

The `CustomError` class could look like this:

```sn
class CustomError extends Error {
  // A sample function
  public func why () -> string =>
    "This is a custom error class";
}
```

Here is a usage example:

```sn
try {
  divide(5, 0);
} catch (e: CustomError) {
  println!(e.why()); // Prints: "This is a custom error class"
}
```

Here, `CustomError` can be caught apart from other errors like `OutOfMemoryError`.

### Inline `try` and `catch`

These blocks are quite useful, but they can be heavy to write. Like `for` or `while` loops, there is an _inline_ version of `try` and `catch` blocks. Here is how it goes:

```sn
// Classic way
try {
  divide(5, 0);
} catch (e: CustomError) {
  println!(e.why());
}

// Inline way
try divide(5, 0) catch (e: CustomError) {
  println!(e.why());
}
```

That's as simmple as that. There's also a syntax even lighter for single-instruction blocks:

```sn
try divide(5, 0) catch (e: CustomError) => println!(e.why());
```

Also, if the function returns something, we can use its result, like this:

```sn
val result = try divide(5, 0) catch (e: CustomError) => println!(e.why());

val result = try divide(5, 0)
             catch (e: CustomError) =>
               println!(e.why());
```

But be aware here. Because the `catch` block does not return anything, the return value could be nothing. In this case, the `null` value is returned, which makes the return data either the specified type (here, `float`) or a `void`. See the problem? Yes, the mix of a single type and a `void` is a _nullable type_, so `result` will be typed as a `float?` instead of a `float`. Remember this, else this could lead to unexpected behaviours when using these inline blocks.

Except this point, this will work as expected. If we don't care about getting an error object, we can omit the `catch`'s argument:

```sn
val result = try divide(5, 0) catch => println!(e.why());
```

Note that this last block can also return a value. Thanks to this, if an error occurs, it is still possible to return an alternative value:

```sn
val result = try divide(5, 0) catch () -> float => {
  println!(e.why());
  return 0;
};
```

This syntax is a little heavier but it also fixes the type of `result`. It won't be a `float?` anymore but a strict `float` because in all cases it receives a floating-point number.

Please note that the `catch` block must of course the same type of data than the `try` one, else an error will be thrown due to incompatible types.

## Pointers

### References and pointers

In SilverNight, each object (not primitives) has a unique identifier associated to it, called the RUID (Reference Unique Identifier). This means that when we do a `new SomeClass()` or create an object from a structure (flying or not), an invisible identifier is put on it. It is not available to the program itself, but allows to compare if two objects are the same, by comparing their RUID.

Here is the signature of the native `%equal` superoverload:

```sn
func %equal<T>(left: T, right: T) -> bool;
```

It can compare two instances of the same class and tell if they are identical by comparing their RUID. Of course, this could not be done manually because we can't access the RUID, but this is a native superoverload so the builder can implement it itself.

One of the most basic concepts of SilverNight is the references. To take an example, when an object is gave to a function, the object is not cloned automatically, so it keeps the same RUID. That's why modifying an object inside a function will also modify the original one that was gave to it.

Primitives don't have this problem, has they are very special classes. When a primitive is gave to a function or assigned to another resource, it will automatically be cloned - there's no way to prevent it.

Pointers aim to provide a new way to deal with references. Let's take the following code:

```sn
// Make a 'Hero' structure
struct Hero {
  name: string;
  attack: int;
}

// Make a function that changes a single property of the function
func changeProperty (obj: Hero) {
  obj.attack = 20;
}

// Make a function
func assignSomethingNew (obj: Hero) {
  obj = {
    name: "John",
    attack: 50
  };
}

// Create a 'Hero' object
val hero = {
  name: "Jack",
  attack: 10
};

// Test the two functions
changeProperty(hero);
assignSomethingNew(hero);

// Show the result
println!(obj.name); // Prints: "Jack"
printon!(obj.attack); // 20
```

So, what happened here? After we created a hero object, we sent it to the `changeProperty` function. But technically, only a link to `hero` was sent to the function, which was assigned to its `obj` arguments. This way, when the function changed one of the `obj`'s properties, it also changed `hero`, because they are exactly the same object.

In the second function, `assignSomethingNew`, only a link to `hero` was also sent and assigned to `obj`. But no changes were made to the original `hero`. Why? Because the two entities only share the same _RUID_, they are still two separate entities. So assigning something new to `obj` grants it a new RUID that replaces the previous one.

But what if we wanted to make the whole `hero` object change within a function? Well, for that, we use _pointers_.

### How pointers work

While references simply share a RUID referring to a specific object in the memory, pointers share an EUID, which stands for Entity Unique Identifier. The difference between a RUID and an EUID is that a RUID simply refers to an object, while an EUID refers to an entity. This means that, when modifying an entity, even if something new is assigned, all entities with the same EUID will be affected the same way.

By default, each entity has its new EUID. That's where pointers come: they provide a way to create a new entity with the same EUID than another. To create a pointer, we use the `&` symbol followed by the entity's name, which returns an identical entity (with the same type) and the same EUID. Here is how it goes:

```sn
let hero = {
  name: "Jack",
  attack: 10
};

&hero = {
  name: "John",
  attack: 20
};

println!(hero.name); // Prints: "John"
```

Note that, if `hero` had been declared with the `val` keyword, an error would have been thrown. Because this is not very convenient to always use `&` to get a pointer, we can also store it into a _pointer variable_:

```sn
// Create a hero
let hero = {
  name: "Jack",
  attack: 10
};

// Create a pointer to it
let *ptr = &hero;

// Assign a new object to the pointer
ptr = {
  name: "Jack",
  attack: 10
};

// Display the result
println!(ptr.name); // Prints: "John"
println!(hero.name); // Prints: "John"
```

It's also possible to make pointers on primitive entities, like a string or a number:

```sn
let str = "Hello";

let *ptr = &str;
ptr += " World!"

println!(str); // Prints: "Hello World!"
```

Last but not least, pointers can be made on attributes:

```sn
val hero = {
  name: "Jack",
  attack: 20
};

let *ptr = &(hero.name);
ptr = "John";

println!(hero.name); // Prints: "John"
```

The syntax is as follow:

```sn
&object.property;   // Make a pointer to `object` and get `property`
&(object).property; // Make a pointer to `object` and get `property`
(&object).property; // Make a pointer to `object` and get `property`
&(object.property); // Make a pointer to `object.property`
```

### Pointers using expressions

Pointers can also be defined without referring to an entity. See the code below:

```sn
let *ptr = "Hello !";
```

When this code is ran, an entity is created with content `"Hello"`, and `ptr` points to it. It's an equivalent to the code above:

```sn
// Doing this...
let *ptr = "Hello !";
// Is the same as doing...
let str = "Hello !";
let *ptr = &str;
```

### Pointers in functions

Pointers can be used to manipulate data in functions. Here is how it goes:

```sn
func increment (*counter: int) => counter ++;

let counter = 0;
increment(&counter);
println!(counter); // Prints: "1"
```

They can also return a pointer:

```sn
func increment (*counter: int) -> &int => &(counter + 1);

let *ptr = increment(&(0));

println!(ptr); // Prints: "1"
```

This example is a little bit complex. First, we define a function that takes as an argument a pointer, and returns another. In its body, it adds 1 to the counter on-the-fly (without assigning anything). This results in making a brand new integer, which is not a pointer but a simple value. Then, it makes a pointer from this new value and returns it, by transparently creating a new assignable entity containing this value and returning a pointer to it. So `ptr` receives a new pointer. The function could also have returned a simple number, without making a pointer from it: assigning a simple integer to `ptr` would automatically have turned it into a pointer. So that doesn't change anything here.

### Reassigning pointers

A pointer can be reassigned to a new entity easily, using the `*` symbol. Here is how it goes:

```sn
// Make two simple integers
let i = 0;
let j = 0;

// Make a pointer from it
let *ptr = &i;

// Assign a new value to the pointer (its target remains the same)
ptr = 8;
println!(i); // Prints: "8"
println!(j); // Prints: "0"

// Assign a new target to the pointer
*ptr = &j;

// Assign a new value to the pointer
ptr = 3;
println!(i); // Prints: "8"
println!(j); // Prints: "3"
```

### The `NULL` pointer

Sometimes we simply want to make a pointer referring to nothing, after using it. In fact, using `free!` on a pointer may not free the value it refers to (it depends on its scope usage) but it will make assign the `NULL` pointer to the current pointer, which is constant, so nothing can be assigned to it.

```sn
let i = 0;

let *ptr = &i;
ptr = 8; // Works fine

free!(ptr);
ptr = 3; // ERROR because the pointer was freed

*ptr = &i; // ERROR because the pointer was freed
```

This can also be done using a manual assignment, if we want to re-use the pointer later by assigning a new target to it:

```sn
let i = 0;

let *ptr = &i;
ptr = 8; // Works fine

*ptr = NULL;
ptr = 3; // ERROR because the pointer refers to `null`

*ptr = &i; // Works fine
ptr = 2; // Works fine

println!(i); // Prints: "2"
```

### Impact on lifetime duration

Creating a pointer on an entity will prevent it from being automatically freed when it goes out of the scope, because there its EUID is still used somewhere. The pointer itself, though, will be freed automatically since it goes out of the scope (unless there is another pointer referring from it - a double pointer).

### Checking a pointer

It is possible to check if an entity is a pointer, thanks to the `is_ptr!` macro:

```sn
let i = 0;
let *ptr = &i;

println!(is_ptr!(i)); // Prints: "false"
println!(is_ptr!(ptr)); // Prints: "true"
```

The target of a pointer can also be checked using the equality operator, thanks to the fact a pointer and its referer always have the same EUID:

```sn
let i = 0;
let j = 0;

let *ptr = &i;

println!(ptr is &i); // Prints: "true"
println!(ptr is &j); // Prints: "false"
```

### Target's state

A pointer must respect the state of its target. For example, if a pointer refers to a constant, assigning anything to the pointer will result in an error (excepting rewriting the pointer's target, of course).

```sn
val i = 1;

let *ptr = &i;
ptr = 8; // ERROR
```

Don't forget that everything in a frozen is considered as a frozen too.

```sn
frozen obj = {
  value: 2
};

let *ptr = &(obj.value);
ptr = 8; // ERROR
```

A last word about state: pointers cannot have their own state to prevent from being written. They must have the exact same type as the target they are referring to:

```sn
let i = 1;
let *ptrI = i; // Must be a mutable

val j = 2;
val *ptrJ = j; // Must be a constant

i = 2;
println!(ptrI); // Prints: "2"

ptrJ = 8; // ERROR
```

### Multiple-level pointers

Pointers can refer to an entity, but they can also refer to other pointers (which also are entities, after all). Here is how it goes:

```sn
let i = 1;
let j = 2;

let **ptr = i;
// `ptr` refers to an unnamed pointer itself refering to `i`

ptr = 8;
println!(i); // Prints: "8"

**ptr = &i; // ERROR
**ptr = &&i; // Works fine (changes nothing)
```

Now, let's take two examples to detail this because this is a bit complex:

```sn
*ptr = &j; // Works fine
println!(ptr); // Prints: "2"
```

This code rewrites the target of the pointer `ptr` is itself referring to, let's call it the intermediate pointer. So this code rewrites the target of the intermediate pointer, and because `ptr` is referring to it, its value will be the same.

```sn
**ptr = &&i; // Works fine
println!(ptr); // Prints: "8"
```

This code makes `ptr` referring to a brand new unnamed pointer, itself referring to `i`. So it removes the intermediate pointer we had just before.

Note that the `*` symbol, when not used as the name of an entity in its declaration, allows to retrieve the entity it refers to:

```sn
let i = 1;
let j = 2;

let **ptr = i;
let *inter = *ptr;

inter = 8;
println!(ptr); // Prints: "8"

// The two lines above are strictly equivalent
*ptr = &i;
*inter = &i;

// Use a brand new intermediate pointer
**ptr = &&i;

inter = 3;
println!(ptr); // Prints: "8"
```

This part is complex, so don't hesitate to read it again until you understand it.

## Packages

In SilverNight, packages are simply a couple formed by a _package file_ and a _package source code_. It is usually formed by a folder, with a `package.yaml` as the package file, and an `index.sn` file as its source code - though their can be additional source code files.

### Creating a package

First, create a new folder (with any name you want). Inside of it, create a `main.sn` and open it in your favorite code editor: this will be our program's main file. Now, create a `_packages` folder, and inside it a `test-package` folder. Create a `package.toml` file and an `index.sn` file, open them in the same code editor.

`main.sn` will be our main program, which will be ran. The two other files will constitute the _package_ we will use.

#### The package file

First, let's make our package file. It's a TOML ([Tom's Obvious Language](https://github.com/toml-lang/toml)) file we will fill as follows:

```toml
[package]
name = "name-manager"
version = "0.1.0"
authors = [ "Your Name <you@example.com>" ]
license = "MIT"
main = "index.sn"

[dependencies]
```

This tells that our package's name is `name-manager` (so it will be located in a `name-manager` directory when downloaded from the package manager - we'll see that soon) and gives informations about its version (which is very important as we'll see soon) and the list of authors, plus the license it uses (you're free to change it, but since it's an example, there's no real point to do that now). Next, it gives the _dependencies_ of this package, and ends by giving the filename of the package's main file. For now, don't worry about the file's content, we'll see it in details later.

#### The package source code

Now we've written our package file, we can write the package's source, which will be written in `index.sn` as specified in the package file. Here is an example:

```sn
#package

let name: string;

func defineName (newName: string with (c => c) =>
  name = newName;

func readName () -> string {
  if (name)
    return name;
  else
    throw new Error("Name is not defined.");
}

export { defineName, readName };
```

First, the `#package` directive tells this is the main file of the package. It defines a `name` variable, with two functions, one to set it, one to read it.

_Tip :_ Because `(c => c)` is a constraint callback, it must return a boolean. Strings does implement the `%toBoolean` overload, which returns `false` if they are empty, and `false` else. So this constraint simply ensures the string is not empty.

The last line of the file **exports** some entities. This simply creates an object that will be available from the outside of the package, so `name` won't be available from the outside.

Because a package's source code can (and will often) be heavy, we can use the `#include` directive to import a file's content at its position. Here is an example:

```sn
// File: "index.sn"
#package

let name: string;
#include "functions.sn"
export { defineName, readName };

// File: "functions.sn"
func defineName (newName: string with (c => c) =>
  name = newName;

func readName () -> string {
  if (name)
    return name;
  else
    throw new Error("Name is not defined.");
}

export { defineName, readName };
```

Here, the content of `functions.sn` will be imported as it is right where the `#include` directive is. This way, we can split our source code into several files.

_Tip :_ The `#include` directive can be used everywhere, even outside a package. Think to it to structure your code!

### Importing a package

To import a package, we must use the `import` keyword followed by the package's _name_ (not its slug). So here is our `main.sn` file:

```sn
// Import the package
import name-manager as manager;

// Use its exported entities
manager.defineName("John");
println!(manager.readName()); // Prints: "John"

// Try to access an entity not exported by the package
println!(manager.name); // ERROR because `name` hasn't been exported
```

This is as simple as that. Also, because this name could be a little heavy, we can make an alias:

```sn
// Import the package
import name-manager as manager;

manager.defineName("John");
println!(manager.readName()); // Prints: "John"
```

Note that `name-manager`'s content is strictly equivalent to the value exported by the package. Our one exported an object with two attributes referring to its functions, but it could have only exported a single function for example, so we would have been able to call `manager` as a function.

Note that it's also possible to import a package without an alias, like this:

```sn
// Import the package
import name-manager;

// Because the "-" symbol cannot be part of a name, it is replaced by "_"
name_manager.defineName("John");
println!(name_manager.readName()); // Prints: "John"
```

It's even possible to import several packages at once:

```sn
// Import the packages
import name-manager, another-package;

name_manager.defineName("John");
println!(name_manager.readName()); // Prints: "John"
```

#### The `import!` macro

The `import!` macro allows to import a package as an object, so we can use it as we want. Here is an example:

```sn
val manager = import!(name-manager);

manager.defineName("John");
println!(manager.readName()); // Prints: "John"
```

Also, the macro will never the package several times, so we can write:

```sn
import!(name-manager).defineName("John");
println!(import!(name-manager).readName()); // Prints: "John"
```

This will work as expected. A good point about this macro is that the package isn't imported multiple times ; once you imported it, either with `import` or `import!`, it will just retrieve the imported data.

### The package manager

**WARNING: Because the toolchain is not ready yet, the package manager is not available at this time. This part of the book is purely informative and won't work if you try it.**

When you installed the toolchain at the beginning of this book, it came with the package manager in it, because it's part of the toolchain.

This tool aims to provide a way to simply manage the packages used by our program, so we can in a single line download and install a new package from the official repository, update and remove the installed packages, etc.

#### Installing a new package

To install a new package, simply a terminal, go into our project's folder, and run the following command:

```bash
snt add hello-world
```

This will download the package which has the `hello-world` slug in the official repository, then install it into the `_packages/hello-world` folder, so we can use it in our programs. We can of course replace `hello-world` by any other package name.

#### Removing a package

To remove a package that is locally installed, simply write:

```bash
snt remove hello-world
```

#### Update a package

To update a single package installed locally, do:

```bash
snt update hello-world
```

We can also update all packages at once, by doing:

```bash
snt upgrade
```

#### Dependencies

Remember the `dependencies` block we saw in our package file sooner? It simply described the packages _required_ by our program in order to make it work. It's a list of `package = "expected_version"` lines. Here is how it could look like:

```toml
[dependencies]
hello-world = "^1.0.0"
```

The dependency we put here indicates we accept all versions compatible with the `1.0.0` version, which means every `1.x.y` version. It is based on the following semantic versioning:

* A patch release, which only fixes some bugs in the package, increments once the third digit of the version ;
* A minor release, which grants new features without breaking backward compatibility, increments once the second digit of the version ;
* A major release, which grants new features and breaks some of the backward compatibility, increments once the first digit of the version

We can use the following version names in the `dependencies` section of the package file:

* `=1.0.0` or `1.0.0`: accepts only the specific `1.0.0` version (rarely used) ;
* `~1.0.0` or `1.0.x` or `1.0`: accepts any `1.0.x` version (patch releases) ;
* `^1.0.0` or `1.x` or `1`: accepts any `1.x.y` version (patch and minor releases) ;
* `latest` or `*`: accepts any version

When downloading a package, the package manager will get the latest version accepted by the version we gave in our package file. For instance, if a package releases `1.0.5` and `1.1.0` versions, and as a dependency we specify the `~1.0.5` version, it will download the `1.1.0` version instead.

This is why we told previously that version numbers were so important: our package file declares the slug, name, license etc. but also the version of our package, meaning that if we publish it, the programs from other developers that will depend on it will expect us from respecting this semantic versioning. Be aware of this!

### Project as a package

Did you know that any project we make could be considered as a package? For that, all we have to do is to create the package file `package.toml` in our project's root folder, and so we can manage its dependencies. When you need some package, simply use `snt add <package_name>` and so on.

When someone will get your project, we maybe won't want to transfer all the packages we use (some can be very heavy), especially if publishing on a public repository or something. So, we can simply release the project folder, without the `_packages` directory, and any person wanting to run the project will simply have to run `snt install` inside the project's root folder to download all its dependencies.

### The lockfile

When a package is downloaded, updated or removed by the package manager, it edits a little file called `packages_lock.toml` inside the project's root folder. This file specifies the exact version of all the modules we use. What's the point?

Let's admit we are using version `1.0.1` of a module that treats web requests. We accept any `1.x` version, and we send the source code to a person using the project. She run `snt install` in the folder and, surprise, there is a new version called `1.1.0` that was released a few hours before. That's not a bad deal, you'll say, after all we accepted minor changes. But, let's imagine the person who made the package didn't followed the semantic versioning convention, or that a bug appeared in the package, making it unable to work properly? The person using our source code will not be able to test it and will think it's buggy because of a not-working package.

That's where the lockfile comes: it stores the exact version of every package downloaded from the package manager, plus some other little informations. Because it's an important file that aims to provide a way to test and run our project at the exact same state than its original developer, the lockfile is not placed under `_packages` but in the project's root folder, so we won't forget to send it to the persons who use it.

## Asynchronous behaviour

Sometimes we can't foretell when an even will occur. For example, if we are making a web server, we can't predict the incoming connections. But we still have to handle these events, and in order to do that we use _asynchronous_.

Asynchronous features such as promises are also very useful when dealing with multi-threading: a great tool that allows our code to run several functions simultaneously.

### The problem

Some events are synchronous even though they appear to be asynchronous. For example, errors handling with the `%error` superoverload may appear to be asynchronous becacuse it is called only when an error occured, and implicitly. But in fact, it is called synchronously, because the builder turns all `throw` instructions in the code by a call to `%error` (which is not possible manually). So, `%error` is fully synchronous.

Another case is callbacks. In the following code:

```sn
class Event {
  private static handler: lambda ();

  public static func handle (@handler: lambda ()) {}
  public static func trigger () => @handler();
}

Event::handle(lambda () => println!("Callback was triggered"));
Event::trigger();
```

If we don't have we source code of `Event`, we could think this is asynchronous because the function is not called directly but only when a specific even occur. But it's still synchronous, because the callback is ran in the `Event::trigger()` function.

In SilverNight, asynchronous functions happen in two cases:

* When dealing with multi-threading ;
* When the program is going to be transpiled in an asynchronous language

The first point is about threads, a concept we will see that in details later, but for now we'll put it aside. The second point, though, is interesting.

In some languages, such as JavaScript, several functions can be ran at the same time automatically. For example, the `setTimeout()` function that takes a callback and a delay runs the given function after the delay expires, even if the program is already running some tasks. This will not block the main tasks' execution, because the callback will run in parallel of the main tasks. This specificity makes JavaScript a _non-blocking language_, which means it can run several functions at the same time without blocking one.

Node.js takes advantage of this feature to allow JavaScript being used in servers. When five clients connect at the same time to the server, they can be delivered simultaneously. In a synchronous language, the first client would be served first, and when it's done the second client would be served, then the third one, and so on... That makes a long waiting time for the last users, though. That's why synchronous languages are never used to deliver resources on a server.

Because SilverNight supports transpiling, it can take advantage of this using asynchronous functions.

### Promises

Before talking about asynchronous functions, let's talk about promises. Promises are a great tool when coming to asynchronous actions. It is modeled as a templated class, `Promise<T, X = Error>`, which takes at instanciation time two lambdas, the first one taking a single `T` value, the second one taking a single `X` argument.

Promises are basically a software conception of tasks that can either return a result or throw an error. Here is an example of promises, when dealing with filesystem:

```sn
// We admit the function below is already defined
func readAsync (path: string) -> Promise<int, Error>;

// Let's use it
readAsync("hello.txt")
  .then(lambda (content: string) => println!(`File's size is ${content.length} bytes.`))
  .catch(lambda (err: Error) => println!(`Something went wrong: ${content.message}`));

// And with ICT:
readAsync("hello.txt")
  .then(content => println!(`File's size is ${content.length} bytes.`))
  .catch(err => println!(`Something went wrong: ${content.message}`));
```

Here, the `then()` function simply registers the callback for the case the promise succeeds, and `catch()` the callback for the case it fails. Here, a great point is we don't have to use any `try`/`catch` block to handle potential errors ; there is callback for that.

Now we've seen how to use the promise, let's write the `readAsync()` function:

```sn
func readAsync (path: string) -> Promise<string, Error> {
  // Make a new promise and return it
  return new Promise<string, Error>(lambda (resolve: lambda (content: string), reject: lambda (err: Error)) {
    let content: string;

    // Read the file
    try {
      content = import!('fs').readFile(path, "utf8");
    } catch (e) {
      // Failed
      reject(value);
      return ;
    }

    // Success
    resolve(content);
  });
}
```

Quite heavy, right? Let's still see how this works.

First, we define a function that returns our promise. `T` (here, `string`) is its _success type_, and `X` (here, `Error`) is its _error type_. This function directly returns an instance of this promise class, and give it a callback that takes two arguments.

The first argument is the callback triggered in the case the promise succeeds, which must take a single argument with the `T` type. The second one is the same for the case the promise fails, and must take a single argument with the `X` type.

Now we've seen the detailed syntax of this function, let's rewrite it with ICT:

```sn
func readAsync (path: string) -> Promise<string, Error> =>
  // Make a new promise and return it
  new Promise<string, Error>((resolve, reject) => {
    // Read the file and handle errors
    let content: string;

    try {
      content = import!('fs').readFile(path, "utf8");
    } catch (e) {
      reject(e);
    }

    // Resolve the promise if the reading worked fine
    if (content isnt null)
      resolve(content);
  });
}
```

This is a lot simplier already, but still heavy. This is why we'll now see the `async` keyword.

### `async` functions

The `async` keyword describes an asynchronous function in a syntaxical way - it's pretty explicit. This means the function's signature must return a promise and work only in it. To understand the concept, let's rewrite our `readAsync` function with this new keyword:

```sn
async func readAsync (path: string) -> string => {
  try
    resolve import!('fs').readFile(path, "utf8");

  catch (e)
    reject e;
}
```

Many things changed here, but this function works exactly as the original.

To begin, the return type changed from `Promise<string, Error>` to `string`. If we would have wanted to use a different error type than `Error`, we would have written `: (string, Error)` to indicate the error type.

Then, because the `async` keyword indicates our function is asynchronous, it transparently wraps it into a promise, with the callbacks.

Finally, the `resolve` and `reject` keyword respectively call the callback they are related to and stop the function.

Note that an asynchronous function can also use the `return` keyword ; it will have the same effect as `resolve` if used in the function's root (not in sub-functions like callbacks, of course). Here is an example:

```sn
async func readAsync (path: string) -> string => {
  try
    return import!('fs').readFile(path, "utf8");

  catch (e)
    reject e;
}
```

Also, when an error happens in an asynchronous functions, the error is automatically caught and transformed into a rejection. If the error is not compatible with the rejection type (e.g. if the rejection type is `int`), an error is thrown (for real, this time). So we could write our function like this:

```sn
async func readAsync (path: string) -> string =>
  import!('fs').readFile(path, "utf8");
```

If the filesystem fails to read the file, an error will be thrown, but because our function use `Error` as its rejection type (because, as we saw, specifying no rejection type use it as default) the error will be turned into a simple promise rejection.

So, this keyword is pretty powerful when coming to simplify asynchronous functions. Plus, it makes clear for developpers and documentation systems the function is asynchronous.

### Promises chaining

Where promises are useful is when chaining several callbacks. Sometimes, because of using many imbricated callbacks, our code can quickly become unreadable. Here is an example when fetching a user from a website:

```sn
// Download a file from the web
func fetch (url: string, callback: lambda (data: string, err: Error)) { /* ... */ };
// Parse a JSON string as a dictionary (numbers and booleans are converted to strings)
func parseJsonAsync (json: string) -> Dictionary<string, string> { /* ... */ };

// Here is the code:
fetch("/api/last-article/author.json", (data, err) => {
  if (err)
    return println!(err.message);

  parseJsonAsync(data, (user, err) => {
    if (err)
      return println!(err.message);

    fetch("https://api.github.com/users/" + user.name, (githubData, err) => {
      if (err)
        return println!(err.message);

      parseJsonAsync(githubData, (githubUser, err) => {
        if (err)
          return println!(err.message);

        println!(`This author has ${githubUser.public_repos} public repositories.`);
      });
    });
  });
});
```

See the problem? And this is a tiny example, things would be even worse in a more complex program.

That's where we use _chained promises_. Assuming our functions now return promises instead of taking a callback, here is the same code, rewritten:

```sn
// Fetch the author's JSON profile
fetch("/api/last-article/author.json")
  // Parse it
  .then(data  => parseJsonAsync(data))
  // Get informations about this author on GitHub
  .then(user  => fetch("https://api.github.com/users/" + user.name))
  // Parse the received JSON data
  .then(gdata => parseJsonAsync(gdata))
  // Display the number of public repositories for this author
  .then(guser => println!(`This author has ${githubUser.public_repos} public repositories.`))
  // If any of the above promises failed, catch the error
  .catch(err  => println!(`An error occured: ` + err.message));
```

Let's detail what happen here. First, the `fetch()` function returns a promise. When this promise is resolved, a callback is triggered to parse the data as JSON. And here is the first specificity of this code: instead of returning nothing, it returns a new promise. To be honest, we could have written this line like this:

```sn
  // Parse it
  .then<{ string }, Error>(lambda (data: string) { return parseJson(data); });
```

In fact, the `then()` function can take two templates, and if so takes as its single argument a callback that returns a new promise with the templates being respectively its resolution and rejection type.

The final `catch()` call will be triggered if _any_ of the promise fails. Also, it will prevent the next ones from being ran.

### `await` with promises

Sometimes we have to make some asynchronous action in order for the program to continue. For example, this can happen when loading a resource from the web or waiting for a user's input. In these cases, our program would be wrapped inside the callback took by the Promise's `then()` function.

In order to solve this problem, we can use the `await` keyword.

```sn
// Resolve a promise after a specific delay
async func sleep (delay: uint) {
  // Wait for the given delay...
  Scheduler::setTimeout(delay)
    // ...then run the callback
    .then(() => resolve void);
}

println!("A");  // Prints: "A"

await sleep(1); // After 1 second...
println!("B");  // Prints: "B"

await sleep(2); // After 1 second...
println!("C");  // Prints: "C"
```

As we can see, `await` simply blocks the program until the promise is resolved. If it's rejected, it will simply throw a `PromiseError`. This error class is a little special since its constructor takes a `Primitivable` argument and converts it into a string so we can use its `str_data` attribute to read it.

Also, `await` returns the resolution value of the promise (if there is one). So, the following code works:

```sn
// Add two numbers after a second
async func delayed_add (left: int, right: int) -> int {
  // Sleep for 1 second
  await sleep(1);
  // Perform the addition and return the result
  return left + right;
}

val seven = await delayed_add(2, 5); // int
println!(seven); // Prints: "7"
```

We've now finished with promises and asynchronous behaviours.