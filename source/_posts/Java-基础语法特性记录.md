---
title: Java 基础语法特性记录
intro: 本文不是针对 Java 的 “step by step” 手把手教程，但你可以通过本文来回顾 Java 的一些基础特性。“对象”是 Java 语言中的主要元素，它将生活中事物之间的逻辑抽象成了类与类之间的关系，这是 Jave 语言的基本思想之一，即“一切元素皆为对象”。
comments: true
date: 2016-03-20 22:47:47
tags:
- Java
---

本文不是针对 Java 的 “step by step” 手把手教程，但你可以通过本文来回顾 Java 的一些基础特性。“对象”是 Java 语言中的主要元素，它将生活中事物之间的逻辑抽象成了类与类之间的关系，这是 Jave 语言的基本思想之一，即“一切元素皆为对象”。

**1. 创建引用和初始化对象**：
```java
String s;  // 创建一个引用；
String s = "init object";  // 初始化一个对象；
```

**2. 堆与栈**：

“栈”位于通用 RAM（内存）中，栈指针向下移动则会分配新内存；若向上移动则释放内存；由于创建程序时，Java 系统必须知道所有存在于栈内的对象的生命周期，以便随时释放和分配内存。这一特性限制了程序的灵活性，所以“栈”中一般只存储对象引用，并不存储对象本身。

而“堆”同样位于通用 RAM 中，用于存放所有的 Java 对象，不同于“栈”的是，编译器不需要知道存储的数据在堆里存储多长时间。因此，在堆里分配存储有很大的灵活性。但相对应的，用“堆”进行存储分配和清理可能比“栈”花费更多的时间。

**3. 特例：“基本类型”**：

由于 `new` 操作符将生成的对象存储在“堆”里，所以用 `new` 操作符来创建一些小的、简单的变量往往不是很有效。因此，对于这些变量，Java 采用和 C/C++ 相同的方法，不使用 `new` 操作符，而是创建一个并非是“引用”的自动变量并直接存储其值到“栈”中，这样更加高效。

```java
String s = new String("init object");  // 引用存储于“栈”中，对象存于“堆”中；
String s = "init object";  // 变量值存储于“栈”中；
```

相对于 C/C++，Java 的每种基本类型所确定的存储空间都是固定的。这一点奠定了它良好的可移植性。

**4. GC（垃圾收集器）**：

```java
{
  Stirng s = new String("init object");
}
```

在上面所示的代码中，引用 “s” 以及其所指向的对象在大括号之后的作用域中便不可以再进行调用了，但由 `new` 在“堆”中一直存在着（即便已经不能调用）。在 C++ 中你可能需要手动去清理这些对象来防止内存被填满。但在 Java 中，你完全可以不必担心。你只需创建对象，一旦不再需要，它们就会自动被 Java 的垃圾收集器自动回收，同时这也防止了“内存泄露”的问题。

**5. 默认值**：

如果一个 Java 类的成员属性是基本数据类型之一，那么 Java 会自动给没有初始值的成员属性进行自动初始化默认值。但对于局部变量来说，没有初始值的变量会被赋予一个系统随机产生的默认值，同时 Java 会在编译时返回一个错误。

**6. 包**：

在所有的 Java 应用程序中，`java.lang` 包是被默认自动导入到每个 Java 文件中的。

**7. 编译与链接**：

在 Java 中，我们一般使用 `javac` 命令（安装于 JDK 中）来编译源文件，`java` 命令来链接并执行程序。但也可以选择使用 “build.xml” 文件和 `ant` 命令来自动化构建和运行 Java 程序。

**8. 文档**：

使用 Javadoc 来编辑和维护 Java 文档。

**9. 编码风格**：

类名首字母大写，不要使用下划线来分割名字，其中每个内部单词的首字母都要大写。对于其他方法、字段、成员变量、引用等类型，则首字母小写。