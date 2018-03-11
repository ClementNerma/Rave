# The Hybrid Book

## Introduction

Welcome to _"The Hybrid Book"_, a feature-exhaustive tutorial to learn SilverNight. SilverNight is borned from the wish to have a language almost as simple as JavaScript or Python but as powerful, safe and fast as Rust to cover most of developpers' need. It is a statically-typed, functional programming language. Intended for multi-platform development, it comes with great flexibility and a large native library.

**This book is still a draft, some features could be added, changed or removed completely in the final version of the language. Please be careful about this.**

### Why is it an hybrid book?

This book is called "hybrid" because it provides a simple specification for the language but also acts as a tutorial for persons who want to learn it from the beginning to the very end.

### For whom is this book?

This book is for everyone who wants to learn all the features of SilverNight, or simply for developers who are curious to know how this language work.

In order to fully understand this book, you should already know at least one other programming language (the lower level it is, the better), ideally with a good knowledge in Oriented-Object Programming (OOP) because SilverNight always deal with objects.

Please note if you simply want to learn the language, you should read [The SilverNight Book](https://github.com/ClementNerma/SilverNight/doc/books/tutorial.book.md) instead. This hybrid book aims to provide a deep, complex view of the language with all of its detailed concepts.

### Who is this language for?

SilverNight's purpose is to provide a multi-platform compatibility coupled with an expressive syntax. Because of that, this language is not designed for very low-level applications, like drivers or operating systems - though it's still possible to make them, it is not originally intended for. In order to make such low-level programs, you should use other programming languages such as [C++](https://en.wikipedia.org/wiki/C%2B%2B) or [Rust](https://www.rust-lang.org).

## Setting up environment

### Installation

**As the compiler is not done yet, your programs will not compile and you will not be able to run it. The book is here to details the languages' concept and the way it works. Thanks for your understanding.**

As a pre-requisite you must have [Git](https://git-scm.com/) as well as [Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com) (or [NPM](https://www.npmjs.com)) installed on your computer.

Open a terminal and run the following commands:

```bash
git clone https://github.com/ClementNerma/SilverNight.git
cd SilverNight/compiler
yarn install-tools # NPM: `npm run install-tools`
```

_NOTE :_ As this program installs the tools on your computer, you may be asked for the **root** password on Linux systems.

To check if all the tools were correctly installed, simply run this command in a terminal:

```bash
snt -v
```

If it shows a version number, then the tools are now available globally!

### Compiling programs

You can write SilverNight with any text editor - even with the Windows' Notepad! But we advise you to use a code editor, like [Atom](https://atom.io) or [Visual Studio Code](https://code.visualstudio.com), and install the _SilverNight_ extension for them. This will highlight your code following different rules to make it more pleasant to see.

Once you wrote your code, save it in a file with the `.sn` extension. Then, open a terminal and go into the folder in which your file is, and run `snt program.sn` (replace `program.sn` the name of your file) to compile it. This will produce an executable file in the same directory (the name will depend on the platform you are using). You can run this executable directly on any computer that is under the same platform.

### Commenting your code

SilverNight has several types of comments for different purposes, but the main ones are the single-line and the multiple-line comments. These are passive comments (which means they don't do anything and are perfectly ignored by the compiler).

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

### Displaying values

You can display values to your terminal (called _output_) by using the `println!` macro (we'll see what is a macro later in this book).

```sn
println!("Hello !");
```

For now, consider you can display any value with it, only special values (like custom classes or conceptual resources) cannot be displayed, but we will see this in details before we encounter this problem.

## Variables and typings

In SilverNight, everything is object. Every single number or string is considered as an object. The thing that describes what an object is is a _type_. What is a type? That's simply a set of methods, properties and other tricks that provides tools to manipulate a resource, like a variable or a constant. You can also see it as a describer that indicates what kind of value a resource can take.

_Tip :_ For those who already programmed in Java, C, C++ or Rust, the concept of type is roughly the same in SilverNight.

There's several way to declare a resource in SilverNight. Let's take a look at variables (mutable resources). We define it with the `let` keyword and give them a _type_ (the class that describes it).

```sn
let hello: string;
```

This will declare a string mutable called "hello". When declared like this, an empty string is put in this (we call it an _instance_ of the "string" class).

To assign a contant, use the `=` operator:

```sn
let hello: string;
hello = "I am a variable!";
```

You can also assign a value in the declaration statement:

```sn
let hello: string = "I am a variable!";
```

This syntax is kind of heavy. Because we don't want to declare a type and an initial value for each variable, we can use a feature called _inferred typing_ which guesses the variable's type thanks to the value you assign to it.

```sn
let hello = "I am a variable!";
```

In the above code, the compiler understands you are trying to assign a string to `hello`, so it guesses its type is `string`.

### Mutability

Some data are not intended to be modified. To store them, we use _constants_, which are declared like variables but with the `val` keyword:

```sn
val constant = "I am a constant!";
```

You can also specify the constant's type, but you will have to give it an initialization value anyway.

```sn
val constant = "I am a constant!"; // Works fine
val constant: string = "I am a constant!"; // Works fine
val constant: string; // ERROR: Initialization value expected
```

Constants cannot have their value changed, so can't use the `=` operator only. See them as read-only resources (though this is not fully true, as we will see later). But you can still use other resources to initialize them:

```sn
// Declare a variable
let str = "I am a string!";

// Declare a constant
val constant = str;

// Assign a new value to the constant
constant = "A new value"; // ERROR: Cannot assign a value to a constant
```

### Plain constants

You can also declare "_plain constants_", which are explicit values that can be used by the compiler to optimize some calls but also to perform additional tests about program's validity. Some functions also require plain constants, as we will see later.

```sn
// Declare a plain constant
pln MY_JOB = "Developer";
```

A convention is to use a capitalized name for plain constants, to make them distinctive from variables. As always, you can declare the value's type, but it's still optional. Note that you cannot assign any content taken from a variable or a standard constant here.

```sn
val MY_JOB = "Developer";
pln MY_REAL_JOB = MY_JOB; // ERROR: Plain value expected
```

You can only assign values from other plain constants:

```sn
pln MY_JOB = "Developer";
pln MY_REAL_JOB = MY_JOB; // Works fine
```

Take the reflex to declare you values using plain (or simple) constant instead of mutables when you won't change their value. This assigns something by error, and helps the compiler finding some errors in your code. Plus, in some languages like JavaScript, it even makes your program a little faster!

### Primitive types

There are two categories of types in SilverNight: _primitives_ and _objects_. The first ones are the `void` value, booleans, numbers and strings. Every other type outside of these is not primitive.

Primitive types can access additional features object types cannot use, such as the optional operator `.=`. It will assign the provided value on its right if and _only if_ the value is NIL (any value between: `void`, `false`, `0`, `""`, `NULL`). This doesn't work with the other types.

## Numbers

### Integers

There is not only one type to represent numbers. The "default" one is **int**, also known as **int32**, a signed 32-bit integer. Basically, it can handle any number between `−2,147,483,648` and `2,147,483,647`.

_Tip:_ The more bits a number uses for its representation, the more memory it takes. If you don't need such a large number, you can use the `int16` number instead (handling from `-32,768` to `32,767`). For very small numbers or when making programs for platforms with a limited amount of memory (like Arduino boards) you can even use the `int8` (`byte`) type (handling from `-128` to `127`).

_Tip:_ All signed type has its unsigned counterpart, which is basically this type prefixed by the `u` symbol. What are unsigned numbers? These are numbers that don't have a positive or negative sign, so they are always positive. For example, `uint32` will handle numbers from `0` to `4,294,967,295` while `uint16` while deal with numbers from `0` to `65,536`.

For very large numbers, you can use the `int64`, `uint64`, `int128` or even `uint128` type (this last one handles from `0` to `~ 3.4 E +38`, so really huge numbers).

_NOTE :_ Here the `E` symbols refers to `10^`: `3.4 E +38` refers to `3.4 x 10^38`.

### Floating-point numbers

SilverNight also supports floating-point numbers. There are two signed types for them, `float`, `double`. Unlike integers, their isn't unsigned floating-point number types.

Their ranges is huge but, where numbers have an exact value, these types have a limited precision:

* `float` handles from `~ 1.2 E -38` to `~ 3.4 E +38` with a 6-decimal precision ;
* `double` handles from `~ 2.3 E -308` to `~ 1.7 E +308` with a 15-decimal precision.

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
let result = 2 / 3;
```

Why should the compiler understand here? It sees an integer divided by an integer, so the result should be an integer. But any human would understand the result should be here a `float` as the result is around `0.66666...`.

Because of this confusion, the code above will produce `0`. An unexpected number that could result in strange behaviours in your programs. The simpliest and shortest way to indicate you are dealing with a `float` is to do explicit conversion:

```sn
let result = 2.0 / 3.0;
```

Giving a decimal part to a number indicates it's a `float` (or a `double` if it exceeds the range), even if it's `.0`.

### Alternative bases

Because not everyone want to deal with decimal numbers, but also with binary, hexadecimal or even octal, there is a way to represent way simply:

```sn
let dec1 =    92; // Decimal
let dec2 = 0d192; // Decimal

let bin = 0b110; // Binary
let oct = 0o675; // Octal
let hex = 0xFFA; // Hexadecimal
```

Note that all numbers, whatever is the representation you use, are converted to decimals and manipulated by the computer as bits. This is just a way to represent simply numbers in an alternative base.

### Underscore separator

Representing large numbers can quickly become a big deal if you don't have a number separator. Because the comma `,` is reserved to separate arguments and the single quote `'` to delimit strings, we will use the underscore `_` symbol.

```sn
0b10000011;
0b1000_0011; // Strictly equivalent
```

When writing a plain number, all underscores are simply removed from its representation.

## Operators

### Mathematical operators

_Operators_ are symbols that provides a way to add, substract, multiply or do some operations with one or several numbers. The most common ones are the addition `+`, the substraction `-`, the multiplication `*` and the division `/` operators. Here's how we use it:

```sn
let result = 2 + 5; // Perform an addition
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

### Incremental operators

There only two incremental operators, they only take a variable (not a constant or a plain value) and change its value depending on the operator. You can write the operator before or after the variable's name but be aware, this will change the operator's effect.

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

### Bitwise operators

These are bit-by-bit operators - operators that work on each single bit of numbers. They take two number and return a number.

They are:

* `&` (bit-by-bit and)
* `|` (bit-by-bit or)
* `^` (bit-by-bit exclusive or)
* `<<` (binary left shift operator)
* `>>` (binary right shift operator)

The last bitwise operator takes a single number and return a number: that's the one's complement `~` operator.

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

### Logical operators

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

### Assignment operators

Unlike operators above that create a value from two other ones, assignment operators directly affect the variable it operates on.

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

### Concatenation

In SilverNight, the `+` (add) operator also acts as the _concatenation operator_. It provides a way to _concatenate_ two stringifyable entities, like a `string` and an `int`. For example, if you have a variable called `area` and you want to display its value with a message, you can do:

```sn
println!("The area is: " + area);
```

Here, the compiler will understand you want to do a concatenation because the first entity is a string, and the second one a number. So it will perform the concatenation.

### Bonus: String expressions

Here is a useful trick when using strings: you can _evaluate an expression_ from the inside of a string and get its result directly. Let's try it:

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

As you can see, indexes start at `0`. That's a standard implementation of vectors in almost any programming language. If you run the code above, it will display three empty strings, because we haven't initialized our list yet. We know have several choices:

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

When we saw vectors, we didn't talked about what they _really_ are. They are in fact represented by two classes, `List` and `Array`. There are different on some little points:

* `List` is a fixed-length list. We cannot extend it or remove some elements, we can just do some operations on the elements it contains ;
* `Array` is an extensible list.

We will be able to access exactly the same functions for both the `List` and the `Array` type, excepted there are some additional ones for `Array` (like extension or elements removing).

There is a specificity about these types, though. If you simply try to create variables with them, like for a list of names:

```sn
let names: List; // ERROR
```

Your program won't work. Why? Because these types are called _templated_ types. This mean they need _another type_ to work correctly. In fact, vectors need to know what _type_ the values will take. In our case, we want to store a list of names, which are strings, so let's declare it:

```sn
let names: List<string>;
```

Here, `List` is called a _templated type_ and `string` is called its _template_. There's still a problem though: while arrays have a flexible length, lists have a fixed one. So we know have an empty `names` list we cannot anything with. Let's say we have 3 names:

```sn
let names: List<string> = new List<string>(3);
```

Here's a keyword we don't know: `new`. It simply creates an _instance_ of a type, an object. This won't work on primitive types like `string`.

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

### IST (Inferred Structured Typing)

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

## Controlling the program's flow

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
let i: int;

for (i = 0; i < 5; i ++) {
  println!(i);
}
```

What does this code do? First, we declare a variable called `i` (the `int` type here is optionnal ; it is written to be more clear). The loop starts by giving it a first value (the _start value_) to 0. The loop indicates it will run **until** its condition is true (`i < 5`). Then, it specifies its _incremental expression_, an expression which is evaluated each time the loop is runned (excluding the first time).

So, the loop starts by setting 0 to `i`. The condition is checked, and is evaluated to `true`, so the instructions set will be executed. The program displays `0`. Then, the incremental expression is evaluated so `i` is now equal to `1`. We check again the condition which is still `true`, the expression is ran, the incremental expression is evaluated a second time so `i` is equal to `2`, and so on until, after running the incremental expression, the condition became a NIL value.

The loop above will therefore display `0`, `1`, `2`, `3` and `4`. That's all.

Note that you could also write the variable's declaration directly in the loop's head:

```sn
for (let i: int = 0; i < 5; i ++) {
  println!(i);
}
```

You can write declarations in any block's head, but they will be _scoped_ to this block, which means you can use it only inside the block and that the variable will be deleted outside.

Another thing is about the incremental expression. It can be absolutely any expression, like `i --` to decrement it:

```sn
// This loop does exactly the same thing than the previous one
for (let i = 4; i >= 0; i ++) {
  println!(i);
}
```

Or `i += 5`, or whatever you want. Also, any block made by a single instruction can omit `{` and `}` symbols, so you could write:

```sn
for (let i = 0; i < 5; i ++)
  println!(i);
```

Or even:

```sn
for (let i = 0; i < 5; i ++) println!(i);
```

There is an alternative syntax made to replace the one we saw above. This is called the _range syntax_:

```sn
for (let i : 0 -> 5)
  println!(i);

// Equivalent to
for (let i: int = 0; i <= 5; i ++)
  println!(i);
```

Be aware here, the end value is applied to the set of expressions. So, this code will print: `0` `1` `2` `3` `4` `5`.

```sn
for (let i : 5 -> 0)
  println!(i);
```

This will result in printing: `5` `4` `3` `2` `1` `0`.

### `while` for conditional repeat

A useful loop every developer has ever used is the `while` block. It repeats a set of instructions _while_ its condition is not a NIL value.

The syntax is:

```sn
let counter = 8;

while (counter > 1) {
  println!(counter);
  counter /= 2;
}
```

This code will print `counter`'s value and then divide it by 2, while it's higher than 1. So it will display: `8` `4` `2`. Then `counter` is equal to 1 so the loop ends.

### `while` variant: `until`

The `until` loop is the exact inverse of `while`: it runs the set of instructions _until_ its condition become anything else than a NIL value.

```sn
let counter = 8;

until (counter <= 1) {
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
when (name) {
  "Paul"  => println!("Happy birthday, Paul!");
  "John"  => println!("How are you, John?");
  "Marc"  => println!("Hello there Marc!");
  default => println!("I don't know you...");
}
```

If you want to specify a condition, you can write it between parenthesis. You will have access to the `_` variable which refers to the value given in the block's head.

```sn
let adult: string = when (age) {
  (_ < 20) => "No";
  (_ > 20) => "Yes";
  default  => "Kind of";
}
```

You can also specify a set of expressions for a match, but you will have to return manually the value:

```sn
let adult: string = when (age) {
  (_ < 20) => "No";
  (_ > 20) => "Yes";
  default  => { println!("Default value taken."); return "Kind of"; }
}
```

Note that the `break` instruction does nothing on this block. The `when` block can also be used without assignment:

```sn
when (age) {
  (_ < 20) => adult = "No";
  (_ > 20) => adult = "Yes";
  default  => adult = "Kind of";
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

You can do this with any condition or loop block:

```sn
println!(i) for (let i = 0; i < 5; i ++);
```

But be aware when dealing with inline loops, this could accidentally result in inline generation and make your program crash, as we will see now.

### Inline generation

Inline generation is a useful feature when coming to generate a list of data. For example, let's say we want to generate a list of the cube of every number between 1 and 10. Intuitively, we could write this:

```sn
let cubes: int[10]; // List<int>

for (let i : 1 -> 10)
  cubes.push(i * i * i);
```

But there is another, simplier way to generate this list.

```sn
let cubes: int[10] = (i * i * i) for (let i : 1 -> 10);
```

This will do exactly the same thing. Because the compiler has a great support of inferred typing, you can also omit the `cubes`' explicit type:

```sn
let cubes = (i * i * i) for (let i : 1 -> 10);
```

This is also why we told you should be careful when using inline loops. All inline loops generate a vector (`List` for explicit `for` loops like ranges or simple incremental / decremental expressions, `Array` for anything else).

Note that inline loops will not perform a generation if a `void` is returned (not any NIL value, only this one). So, if you do:

```sn
println!(i) for (let i : 1 -> 10)
```

Nothing will be generated. Also, nothing will be generated if you don't give the result to a function or assign it to a variable.

### Loop's `break` and `continue`

When dealing with a loop, you can want to exit it if a specific even happens. For example, if we have an `hadError` function that returns a boolean to indicate an error happened, we could want to exit the loop.

Let's try it:

```sn
for (let i : 1 -> 10) {
  println!(i);

  if (hadError())
    break; // Exit the loop
}
```

This will work as expected: if `hadError` returns `true`, the `break` instruction will be executed and the loop will break.

Another keyword is `continue` that provides a way to ignore all instructions below it but only one time.

```sn
for (let i : 1 -> 10) {
  if (hadError())
    continue;

  println!(i);
}
```

This code will check each time if there had an error. If so, it will ignore all instructions above `continue` and iterate the loop a new time. Else, it will run the `println!` macro, just as expected.

## Functions

Another common concept in almost every programming language is the concept of _functions_. A function is a special block that can is not ran by default but that can be called manually. It eventually takes values called _arguments_ and generally return a value called the _return value_.

### Declaration

Let's imagine I want to calculate the area of a triangle depending on its base and its height, then print it and store the result in a constant.

This is very simple and can be achieved very simply, but imagine we have to do this dozens of time. This would be heavy to repeat again and again the same instructions. Each time, we will have to rename the variable. And if we wanted to change anything to the algorithm, we would have to reflect the changes in all our files - which could be very long and introduce new errors.

In order to avoid copy-pasting this block of code again and again, we can use a general programming concept known as _function_.

A function is declared using the `func` keyword. We give it a name, and its arguments between parenthesis, separated by commands. An argument is basically a couple of a name and a type, written as `argname: type` (though we will see later this is not the only syntax for arguments). We then write a double point `:` symbol and the function's return type - the type of the value which is returned by the function.

Let's write the block's head:

```sn
func triangle_area (base: float, height: float) : float {
  // Function's body
}
```

The very first line (without the `{` symbol) is called the function's _prototype_. It declares what the function's name is, what are its arguments, and the type of value it returns. We commonly say that the _prototype_ (the line we saw) _declares_ the function's _signature_ (its name, arguments, their types, and the return type).

We want to first calculate the triangle's area. Let's do this:

```sn
func triangle_area (base: float, height: float) : float {
  val area = 0.5 * base * height;
}
```

Now we want to print it:

```sn
func triangle_area (base: float, height: float) : float {
  val area = 0.5 * base * height;
  println!(`The triangle's area is: ${area}`);
}
```

Now we want to assign it a variable each time we calculate the area. So we will have to declare a variable and make an assignment **outside** of the function. How can we do this?

There's a simple way to achieve this called the _return statement_. It uses the `return` keyword to return a value from the function. This value is an entity can be assigned to a variable or a constant. Let's do it!

```sn
func triangle_area (base: float, height: float) : float {
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
func i_need_a_plain (integer: #pln<int>) : int {
  return integer * 2;
}

i_need_a_plain (2); // Works fine

val num = 2;
i_need_a_plain(num); // ERROR
```

### Optional arguments

Optional arguments are... optional. Well, that's pretty explicit, at least. When declaring a function's arguments, we list them with their respective types. But, we can also make some of them _omittable_ by giving them a _default value_. Let's try it:

```sn
func sayHello (name: string, justTheName: bool = false) : void {
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

### Lambdas and callbacks

We saw that functions can be declared with a name, a list of arguments, a return type and a body. But there are some functions that omit the name, called _lambdas_.

What is their point? The more simple is to take an exemple: let's say we have a list of signed integers, and we want to keep only the positive values called `arr`. The first idea we could have would be to write:

```sn
val posArr: int[];

for (let i = 0; i < arr.size; i ++)
  if (arr[i] >= 0)
    posArr.push(arr[i]);
```

But we have a problem here. We have to define `posArr` as an `Array<int>` while `arr` is a `List<int>`. This could introduce compatibility issues when we'll want to give it to functions that require a list. We can still convert `posArr` to a list by doing `posArr.toList()`, but this would involve to make a whole new list, which takes both memory and time.

That's where lambdas come. There is a function called `filter` we can use on lists, which takes a specific function as an argument. Here is how we use it:

```sn
val posArr = arr.filter(func (value: int, key: int) : bool { return value >= 0; });
```

What happened here? Because it's a little cryptic, we'll re-write the code, with a greater spacing:

```sn
val posArr = arr.filter(
  func (value: int, key: int) : bool {
    return value >= 0;
  }
);
```

Here, we declare a _lambda_ with two arguments `value` and `key` which both are integers, and we say it will return a boolean. Then, we write the function's body, which simply evaluates an expression (returns `true` if `value` is positive, `false` else).

Because this function does not have a name, it's called a lambda: it could not be declared like a standard function which require a name.

Also, why do we need the `key` argument while we don't use it? It's simply because the `filter` function requires it. Let's see the declaration of this function:

```sn
  // ...
  public func filter(callback: func (value: T, key: int) : bool) : self<T>;
  // ...
```

Let's just concentrate on the function's only argument: called `callback`, it is described as a function that takes a `value` and a `key` argument, then returns a boolean. That's why we gave these specific types to our lambda. If we had specificied a `string` for the `key` argument for example, an error would have been throw at compilation.

Note that, while the argument's number, type and the lambda's return type is declared in the function's signature and cannot be changed, you can still change their names to take your own ones. We could have called them `num` and `k` if we wanted to.

There's another way to apply this filter on our list: declaring the function, and then using it as an argument. Because an example will be more clear than a big explanation:

```sn
val myFunc = func (value: int, key: int) : bool {
  return value >= 0;
};

val posArr = arr.filter(myFunc);
```

This will do the same thing than the first version. Here, we declare a `myFunc` variable that works exactly like the lambda we made before, then we use it as an argument for the `.filter` function.

In fact, this constant has an inferred type ; its full declaration would be:

```sn
val myFunc: func (value: int, key: int) : bool = func (value: int, key: int) : bool {
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
func myFunc(value: int, key: int) : bool {
  return value >= 0;
};

val posArr = arr.filter(myFunc);
```

So, lambdas are great to reduce the size of a program, but it's kind of heavy to use this syntax. This is why we can use the _arrow syntax_:

```sn
val posArr = arr.filter((value: int, key: int) : bool -> value >= 0);
```

We don't have the `func` keyword anymore, but the `->` one appeared. This symbol means that the value on its right is automatically returned by the function. This symbol can in fact even be used with functions, like `function returnTrue() : bool -> true;`. We can also use the `{` and `}` symbols while omitting the `func` keyword to use several instructions, but we'll then have to use manually the `return` keyword.

Showcase:

```sn
// Classic functions
func returnTrue() : bool { return true; }
func returnTrue() : bool -> true;

// Classic lambdas
val returnTrue = func () : bool { return true; }
val returnTrue = func () : bool -> true;

// Arrow syntax
val returnTrue = () : bool { return true; }
val returnTrue = () : bool -> true;
```

But even with the arrow syntax, this is still heavy as we have to write the arguments' type as well as the lambda's return type. So there is a last feature called **ICT** for **I**nferred **C**allback **T**yping we will see now.

### ICT (Inferred Callback Typing)

ICT works like IST but for functions. Instead of inferring a data's structure, it will infer a function's arugments and return type based on a signature.

This may be appear complex, but let's take a simple example. Remember the `.filter` function we can apply on any `List<T>` value? We gave it a lambda and we had to declare the lambda's arguments' type as well as a return type. But because these types are already specified in the `.filter` function's signature, we know that we'll have _exactly_ the sames types in our lambda's signature.

So there is a directive that provides a way to perform inferred typing on a lambda, for both its arguments' type and its return type. This directive is `#auto`.

```sn
// Classic lambda
val posArr = arr.filter(func (value: int, key: int) : bool { return value >= 0; });

// Arrow syntax
val posArr = arr.filter((value: int, key: int) : bool -> value >= 0);

// Inferred callback typing
val posArr = arr.filter(#auto (value, key) -> value >= 0);
```

This last syntax is clearly lighter as it avoids to declare the types. But be careful though to read carefully the signature of the function you are giving this lambda to ; else you could have some... surprises, at compilation time.

Also, note this will only work with lambdas that are directly given as arguments. These are known as _"flying lambdas"_ in reference to the fact they are declared before being used. That means you can't use the `#auto` directive if you declare a constant that contains this lambda, and then use this constant as an argument for a function. This is simply because this directive guesses the function's type based on the signature of the function it is gave to, so it wouldn't work with anything that is not a flying lambda.

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
func pointStr (x: float, y: float) : string -> `(${x}, ${y})`;
func pointStr (pt: Point) -> `(${Point.x}, ${Point.y})`;

// Let's try them!
pointStr(2, 5); // Prints: "(2, 5)"
pointStr({ x: 2, y: 5 }); // Prints: "(2, 5)"
```

They work as expected and print the same result.

## Oriented-Object Programming

### The concept of class

Here we are. We will now talk about the most important concept in SilverNight, which is also the most complex one: **Oriented-Object Programming**.

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

  public func @construct(name: string, hp: int, mp: int, atk: int, def: int) {
    this.name = name;
    this.hp = hp;
    this.mp = mp;
    this.atk = attack;
    this.def = defense;
  }
}
```

That becomes a little more complicated here. We start by declaring the `@construct` function which is called the _constructor_. This function is called when a resource (variable, constant or frozen) is created with the `Hero` type. Because any return value would be lost from it there is an exception in the language's rules that allow us to not give it a return type (it will implicitly be `void`), without any directive.

The constructor will take as an argument a name, an amount of HP and MP, an attack and a defense. Then, it will assign these given values to its _members_, which are not available from outside the class.

```sn
  // ...
  public func getAttack() : int {
    return this.atk;
  }

  public func beAttacked(ennemy: Hero) : void {
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
  public func beAttacked(ennemy: Hero) : void {
    this.hp -= ennemy.getAttack() - this.def;
  }
  // ...
```

Here we consider our defense. But now we have to assure HP loss is not negative. That would be weird to win HP while _being attacked_ by an ennemy.

```sn
  // ...
  public func beAttacked(ennemy: Hero) : void {
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
  public func beAttacked(ennemy: Hero) : void {
    // Calculate the loss
    val loss = ennemy.getAttack() - this.def;
    // Decrease HP
    this.hp -= loss;
  }

  public func fight(ennemy: Hero) : void {
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

  public func @construct(name: string, hp: int, mp: int, atk: int, def: int) {
    this.name = name;
    this.hp = hp;
    this.mp = mp;
    this.atk = attack;
    this.def = defense;
  }

  public func getName() : string {
    return this.name;
  }

  public func getAttack() : int {
    return this.atk;
  }

  public func beAttacked(ennemy: Hero) : void {
    // Calculate the loss
    val loss = ennemy.getAttack() - this.def;
    // Tell what happens
    println!(`${this.name} is attacked by ${ennemy.getName()} and loses ${loss} HP!`);
    // Decrease HP
    this.hp -= loss;
  }

  public func fight(ennemy: Hero) : void {
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

  public func @construct(theThingName: string) {
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

  public func @construct(theThingName: string) {
    this.name = theThingName;
  }

  public func getName() {
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
  
  public func getName() {
    return @name;
  }
}
```

`@` is a strict equivalent to `this.`, so we can use it to access the members of the current class.

### Private readable attributes

When declaring class' attributes, we sometimes want to make it private because we don't want anyone to change it without control, but we also want a developer to read it. So, this would be a read-only attributes from the class' outside, and a classic attribute from the inside (both readable and writable). Here is how we could implement it:

```sn
class SomeClass {
  private myAttribute: string;

  public func getMyAttribute() : string {
    return @myAttribute;
  }
}
```

This is perfectly valid and works as expected. But doing this can be heavy to write, especially if we have several attributes like this one. So, there is a lighter syntax to achieve this:

```sn
class SomeClass {
  private readable myAttribute: string;
}
```

This will do the same thing as the previous syntax, excepted we won't access the attribute with `instance.getMyAttribute()` from the outside, but simply with `instance.myAttribute`.

### Practice: Let's make a map!

Let's now practice with a little exercice. We want to represent a RPG map with a class. Each cell has a number referring to an empty cell (0), a rock (1) or a trap (2). The map is given at its creation, as a double array of integers. The map is a rectangle and has a fixed width and heigh deducted from the double array.

We can move on this map a player, starting from a location given at the map's creation. The player can move up, down, left and right. It can't go on rock cells, and going to a trap will display a message "You're trapped!" and make the player unable to move.

We have to represent it with a single class, with only private attributes (they can be readable, though). At anytime, we should be able to access to current player's position, to get any cell's value, or to check if the player has been trapped already.

The problem seems to be complex but it is mostly simple to achieve. Read the solution below when you're ready. If you can't solve it, try to read again what we saw before and think about the structure of the class.

Here is the solution:

```sn
class Map {
  private readable playerX: int;
  private readable playerY: int;
  private readable trapped: bool = false;
  // Not readable because sub-arrays could be written from the outside
  private cells: int[][];

  // Create the map
  public func @construct(cells: int[][], startX: int, startY: int) {
    // Initialize attributes
    @cells = cells;
    @playerX = startX;
    @playerY = startY;
  }

  // Move the hero
  private func move(x: int, y: int) : void {
    // If we fall in a trap before...
    if (@trapped)
      // Move is forbidden
      println("You can't move because you're trapped.");

    // Check if we are outside the map
    else if (x < 0 || x > @cells[0].size - 1 ||
        y < 0 || y > @cells.size - 1)
      println!("Cannot move outside the map.");
    
    // Check if the cell we are going to is a rock
    else if (cells[y][x] is 1)
      println!("There's a rock on your way.");

    // Else, move the player    
    else {
      // Save the new player's location
      @playerX = x;
      @playerY = y;

      // If we fell in a trap, game over!
      if (cells[y][x] is 2) {
        println!("You've been trapped!");
        @trapped = true;
      }
    }
  }

  // Move up
  public func moveUp() : void -> @move(@playerX, @playerY - 1);
  // Move down
  public func moveDown() : void -> @move(@playerX, @playerY + 1);
  // Move to the left
  public func moveLeft() : void -> @move(@playerX - 1, @playerY);
  // Move to the right
  public func moveRight() : void -> @move(@playerX + 1, @playerY);
}
```

Here it is! This code answers to the problem.

Of course, your solution could be different, as there are many ways to solve it. This anwser is well optimized and relatively short. Try to compare you own solution to this one and see the differences.

## Classes in depth

Now we've acquired the basis of classes, this part will teach you more complex features of OOP like templates, inheritance or stated classes.

### The destructor

#### A word about overloads

We saw before the constructor, a special method called when the instance is created. This method can't be ran the normal way, meaning you can't do `myInstance.construct()` for example. Such a method, and every method we will see beginning by the `@` symbol, are called _overloads_.

By default, when we instanciate a class, nothing is done (excepted creating the object itself). The constructor overwrites this behavior by running its own code.

The destructor is a special function you probably won't use very often, but it is still useful in some cases. Like the constructor, it's an overload, and is written `@destruct`. It takes no argument and must be `void`-typed, so its return type can also be omitted.

### A word about freeing

When dealing with heavy objects, or simply when using a low-level languages, developers often _free_ their variables themselves. Freeing a variable means its value is definitely removed, so it doesn't take memory anymore. Of course, after a resource is freed, using it will result in an error.

A resource can be freed several ways. The first one is with the _garbage collector_, a little tool that detects what resource isn't used anymore and free it because it knows it won't be used anymore. This is done automatically in JavaScript or Python for example, two interpreted high-level languages. Languages such as Rust have other tools instead that does the same thing, but that insert a piece of code to free the resource when compiling the source code. Some other languages, finally, like C or C++, doesn't have this feature and resources must be freed manually.

In our case, the destructor is called when the instance is manually freed, using the `free!` macro. Here is how it looks like:

```sn
class IntArray {
  private data: int[];

  public func @destruct() {
    println!("I will be freed.");
  }

  public func add(value: int) : void -> @data.push(value);
  public func pop() : bool -> @data.pop();
}

let arr = new IntArray();
arr.push(2);
arr.push(4);
arr.push(3);
free!(arr); // Prints: "I will be freed."
```

This overloads aims to provide a way to run a specific code when the developer explicitly says it doesn't need the instance anymore. After the destructor is ran, the instance is freed and any usage of it will result in an error.
