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