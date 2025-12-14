---
title: Ole-Johan Dahl & Kristen Nygaard：面向对象编程的鼻祖，用Simula播下了OOP的种子，从此改变了整个软件世界
date: 2001-01-01
description: Ole-Johan Dahl & Kristen Nygaard：面向对象编程的鼻祖，用Simula播下了OOP的种子，从此改变了整个软件世界
tags: [图灵奖, 计算机历史, 编程语言, 算法, 人工智能, 操作系统]
---

# 图灵奖第三十六届（2001）| Ole-Johan Dahl & Kristen Nygaard：面向对象编程的鼻祖，用Simula播下了OOP的种子，从此改变了整个软件世界

> **一句话概括**：他们创造了Simula语言，发明了"类""对象""继承""虚方法"等革命性概念，开创了面向对象编程范式，影响了从C++到Java、Python的所有现代编程语言，改变了我们思考和组织代码的方式。

## 🏆 获奖简介

**Ole-Johan Dahl**（奥利-约翰·达尔，1931-2002）和**Kristen Nygaard**（克利斯登·尼高尔，1926-2002）是挪威计算机科学家，面向对象编程（OOP）之父。

- **出生时间**：
  - Dahl：1931年10月12日
  - Nygaard：1926年8月27日
- **出生地点**：挪威
- **逝世时间**：
  - Nygaard：2002年8月10日
  - Dahl：2002年6月29日
- **主要成就**：发明Simula语言，开创面向对象编程
- **获奖年份**：2001年
- **获奖原因**：在面向对象编程方面的基本概念（ideas basic to object-oriented programming）

**为什么他们是第三十六位？** 1960年代，当程序员还在用FORTRAN和COBOL写线性代码时，挪威的两位科学家Dahl和Nygaard提出了一个全新的问题：能否让程序的结构模仿现实世界？他们为了模拟船坞调度系统，创造了Simula语言，引入了"类"（class）、"对象"（object）、"继承"（inheritance）、"虚方法"（virtual methods）等革命性概念。这些概念不仅是语法特性，更是思考程序结构的全新方式——把复杂系统分解为对象及其交互，每个对象封装数据和行为。Simula的思想传播到施乐PARC，启发了Alan Kay创造Smalltalk；传播到贝尔实验室，启发了Stroustrup创造C++；最终影响了Java、Python、C#等所有主流编程语言。今天，面向对象编程已成为默认范式，从游戏引擎到企业系统，从移动应用到Web框架，OOP无处不在。2001年，Dahl和Nygaard因这一开创性贡献获得图灵奖，但历史开了个残酷的玩笑——2002年，两人在几个月内相继去世，都未能亲自领取这一荣誉。

## 🚀 重大贡献详解

### 1. Simula语言：面向对象编程的起源

**历史背景（1960年代初）**：

**当时的编程现状**：
- **FORTRAN**：面向科学计算，过程式
- **COBOL**：面向商业数据处理，记录式
- **ALGOL 60**：结构化，但缺乏抽象机制

**Nygaard的需求**：
- 在挪威计算中心工作
- 需要模拟复杂系统：
  - 船坞调度（轮船到达、装卸、离港）
  - 生产线管理
  - 社会系统模拟

**问题**：
用传统语言模拟这些系统极其困难：
- **状态爆炸**：太多全局变量
- **逻辑分散**：相关代码散布各处
- **难以扩展**：添加新实体需要改动整个程序

#### 1.1 Simula I（1962-1965）

**目标**：模拟语言（Simulation Language）

**核心概念：进程（Process）**
```simula
PROCESS Car;
BEGIN
    INTEGER speed;

    PROCEDURE arrive;
    BEGIN
        ! 到达码头
        IntoQueue(DockQueue);
    END;

    PROCEDURE depart;
    BEGIN
        ! 离开码头
        OutOfQueue(DockQueue);
    END;

    ! 进程生命周期
    arrive;
    HOLD(5);  ! 等待5个时间单位
    depart;
END Car;
```

**突破**：
- **进程**：独立的模拟实体
- **时间管理**：自动处理事件调度
- **队列**：管理等待的实体

**局限**：
Simula I只是模拟专用语言，不能作为通用编程语言。

#### 1.2 Simula 67：面向对象的诞生

**1965-1967年的突破**：

Dahl和Nygaard意识到"进程"概念可以推广为更通用的"类"，从而创造了面向对象编程。

**革命性概念一：类（Class）**

**定义**：
```simula
CLASS Car;
BEGIN
    INTEGER speed;
    INTEGER fuel;

    PROCEDURE accelerate(amount);
    BEGIN
        IF fuel > 0 THEN
        BEGIN
            speed := speed + amount;
            fuel := fuel - 1;
        END;
    END accelerate;

    PROCEDURE brake(amount);
    BEGIN
        speed := speed - amount;
        IF speed < 0 THEN speed := 0;
    END brake;
END Car;
```

**意义**：
- **数据与行为封装**：speed、fuel和操作它们的方法在一起
- **抽象数据类型**：使用者不需要知道内部实现
- **代码复用**：类是可重用的模板

**革命性概念二：对象（Object）**

**实例化**：
```simula
REF(Car) myCar, yourCar;

myCar :- NEW Car;
yourCar :- NEW Car;

myCar.speed := 60;
myCar.accelerate(10);

yourCar.speed := 50;
yourCar.brake(20);
```

**意义**：
- **多个实例**：同一个类可以创建多个独立的对象
- **状态隔离**：myCar的speed不影响yourCar的speed
- **引用语义**：REF(Car)是对象引用

**革命性概念三：继承（Inheritance）**

**子类定义**：
```simula
Car CLASS SportsCar;
BEGIN
    INTEGER turboCharge;

    PROCEDURE turboBoost;
    BEGIN
        IF turboCharge > 0 THEN
        BEGIN
            speed := speed + 50;
            turboCharge := turboCharge - 1;
        END;
    END turboBoost;
END SportsCar;
```

**语法解释**：
- `Car CLASS SportsCar`：SportsCar继承自Car
- SportsCar拥有Car的所有属性和方法
- SportsCar添加新的turboCharge和turboBoost

**意义**：
- **代码复用**：不用重写Car的代码
- **层次结构**：建立类之间的"是一个"（is-a）关系
- **渐进式扩展**：在不改动原类的情况下扩展功能

**革命性概念四：虚方法（Virtual Methods）**

**多态机制**：
```simula
CLASS Vehicle;
VIRTUAL: PROCEDURE makeSound;
BEGIN
    PROCEDURE makeSound;
    BEGIN
        OutText("Generic vehicle sound");
    END;
END Vehicle;

Vehicle CLASS Car;
BEGIN
    PROCEDURE makeSound;
    BEGIN
        OutText("Beep beep!");
    END;
END Car;

Vehicle CLASS Motorcycle;
BEGIN
    PROCEDURE makeSound;
    BEGIN
        OutText("Vroom vroom!");
    END;
END Motorcycle;

! 使用
REF(Vehicle) v1, v2;
v1 :- NEW Car;
v2 :- NEW Motorcycle;

v1.makeSound;  ! 输出: Beep beep!
v2.makeSound;  ! 输出: Vroom vroom!
```

**意义**：
- **动态绑定**：运行时确定调用哪个方法
- **多态性**：同一个接口，不同的实现
- **开闭原则**：对扩展开放，对修改封闭

#### 1.3 Simula的完整特性

**前缀类（Prefixing）**：
- 类似多重继承的机制
- 组合多个类的特性

**协程（Coroutines）**：
- 模拟并发的轻量级机制
- 可以暂停和恢复执行

**垃圾回收**：
- 自动内存管理
- 开创了自动GC的先河

**类型系统**：
- 静态类型检查
- 类型转换安全

**块结构**：
- 继承自ALGOL 60
- 词法作用域

### 2. 对编程思想的深远影响

#### 2.1 封装（Encapsulation）

**问题**：
传统编程，数据和操作数据的代码分离：
```fortran
! FORTRAN风格
REAL CAR_SPEED(100)
REAL CAR_FUEL(100)

SUBROUTINE ACCELERATE(CAR_ID, AMOUNT)
    IF (CAR_FUEL(CAR_ID) .GT. 0) THEN
        CAR_SPEED(CAR_ID) = CAR_SPEED(CAR_ID) + AMOUNT
        CAR_FUEL(CAR_ID) = CAR_FUEL(CAR_ID) - 1
    END IF
END
```

**Simula的解决**：
数据和方法封装在类中，隐藏内部细节：
```simula
CLASS Car;
BEGIN
    INTEGER speed;    ! 私有数据
    INTEGER fuel;

    PROCEDURE accelerate(amount);
    BEGIN
        ! 封装实现细节
    END;
END Car;
```

**优势**：
- **信息隐藏**：使用者不需要知道内部实现
- **降低耦合**：减少代码间的依赖
- **易于维护**：修改内部实现不影响外部代码

#### 2.2 抽象（Abstraction）

**层次化抽象**：
```
动物（最抽象）
  ↓ 继承
哺乳动物
  ↓ 继承
猫科动物
  ↓ 继承
狮子、老虎、家猫（最具体）
```

**意义**：
- 在合适的层次思考问题
- 复用共同特性
- 隐藏不必要的细节

#### 2.3 多态（Polymorphism）

**同一接口，不同行为**：
```simula
REF(Shape) ARRAY shapes(1:10);

shapes(1) :- NEW Circle;
shapes(2) :- NEW Rectangle;
shapes(3) :- NEW Triangle;

FOR i := 1 STEP 1 UNTIL 10 DO
    shapes(i).draw;  ! 每个形状自己的画法
```

**优势**：
- **灵活性**：可以添加新类型而不改动已有代码
- **可扩展性**：符合开闭原则
- **表达力**：代码更接近人类思维

### 3. 对软件工程的影响

#### 3.1 设计方法论

**对象导向分析与设计（OOAD）**：
1. **识别对象**：系统由哪些实体组成？
2. **定义类**：这些实体有哪些属性和行为？
3. **建立关系**：实体间如何交互？（继承、组合、关联）
4. **实现**：用OOP语言编码

**UML（统一建模语言）**：
- 类图：展示类及其关系
- 序列图：展示对象交互
- 都基于Simula的概念

#### 3.2 设计模式

**Gang of Four的23个设计模式**：
几乎全部基于OOP原则：
- **创建型**：单例、工厂、原型...
- **结构型**：适配器、装饰器、代理...
- **行为型**：策略、观察者、命令...

**例子：策略模式**
```simula
CLASS SortStrategy;
VIRTUAL: PROCEDURE sort;
BEGIN
    PROCEDURE sort;
    BEGIN
        ! 抽象方法
    END;
END SortStrategy;

SortStrategy CLASS BubbleSort;
BEGIN
    PROCEDURE sort;
    BEGIN
        ! 冒泡排序实现
    END;
END BubbleSort;

SortStrategy CLASS QuickSort;
BEGIN
    PROCEDURE sort;
    BEGIN
        ! 快速排序实现
    END;
END QuickSort;
```

#### 3.3 软件复用

**类库**：
- 标准模板库（STL）
- Java类库
- .NET Framework
- 都是基于OOP的代码复用

**框架**：
- Spring（Java）
- Django（Python）
- Rails（Ruby）
- 提供类层次结构，用户继承扩展

### 4. 对编程语言的影响

#### 4.1 Smalltalk（1970s）

**Alan Kay受Simula启发**：
- "一切皆对象"哲学
- 消息传递机制
- 动态类型

**Smalltalk的纯粹性**：
比Simula更彻底的OOP，连类也是对象。

#### 4.2 C++（1980s）

**Bjarne Stroustrup的动机**：
> "我想要Simula的类机制和ALGOL的效率，C的灵活性。"

**C with Classes → C++**：
- class关键字（直接来自Simula）
- 继承（单继承、多重继承）
- 虚函数（virtual关键字来自Simula）
- 析构函数（超越Simula）

**影响**：
C++让OOP进入主流，成为企业系统的首选。

#### 4.3 Java（1990s）

**"C++去其糟粕"**：
- 纯面向对象（除基本类型）
- 自动垃圾回收（Simula已有）
- 单继承+接口（简化继承）

**口号**：
> "Write once, run anywhere"

**影响**：
Java让OOP成为教学标准，影响整整一代程序员。

#### 4.4 其他语言

**Python**：
- 一切皆对象
- 多重继承
- Duck typing（动态多态）

**Ruby**：
- 深受Smalltalk影响
- 纯OOP（连数字也是对象）

**C#**：
- 微软对Java的回应
- 统一类型系统

**JavaScript（ES6+）**：
- 原本基于原型
- 引入class语法糖

**Swift、Kotlin、Rust**：
现代语言仍在继承OOP思想（虽然也融合了函数式编程）。

## 🌍 对世界的深远影响

### 1. 软件开发的范式转变

**之前**（1960年代）：
- 过程式编程：程序=算法+数据结构
- 线性思维：从头到尾的步骤
- 全局状态：变量散布各处

**之后**（1970年代后）：
- 面向对象编程：程序=对象及其交互
- 模块化思维：分解为独立的对象
- 封装状态：数据与行为绑定

### 2. 软件工程的成熟

**大型系统的可能性**：
- **Windows、MacOS**：操作系统用OOP组织
- **游戏引擎**（Unity、Unreal）：场景中的对象
- **企业应用**（SAP、Oracle）：业务对象建模

**团队协作**：
- 不同程序员负责不同的类
- 通过接口协作
- 减少相互干扰

### 3. 教育的变革

**编程教学**：
- **1980年代前**：教FORTRAN、Pascal
- **1990年代后**：教Java、C++
- **今天**：OOP是入门必修

**思维训练**：
- 抽象思维：识别共同特性
- 建模能力：把现实映射到代码
- 系统思维：理解部分与整体

### 4. 产业的繁荣

**软件工具**：
- **IDE**（Eclipse、IntelliJ、Visual Studio）：基于类导航
- **建模工具**（Rational Rose、Enterprise Architect）：UML设计
- **框架**：Spring、.NET、Django等

**企业应用**：
- ERP、CRM系统：业务对象建模
- 银行、保险：复杂业务逻辑用OOP管理

## 🏆 获奖理由（ACM官方表述）

**ACM图灵奖委员会的颁奖词**：
> "For ideas fundamental to the emergence of object-oriented programming, through their design of the programming languages Simula I and Simula 67."
> （表彰他们通过设计Simula I和Simula 67编程语言，对面向对象编程出现所做的基础性贡献。）

**为什么2001年才授奖？**
- Simula在1967年就完成了
- 但OOP的价值经过30多年才充分显现
- C++（1980s）、Java（1990s）的成功证明了OOP的力量
- 2000年前后，OOP已成为主流，是时候表彰源头

## 👤 个人生平与传奇

### Ole-Johan Dahl（1931-2002）

**早年**：
- **1931年10月12日**：出生于挪威曼达尔
- **1952年**：奥斯陆大学数学学士
- **1954年**：数学硕士

**学术生涯**：
- **1960年**：加入挪威计算中心（Norwegian Computing Center）
- **1962年**：开始与Nygaard合作
- **1968年**：奥斯陆大学教授，一直到退休

**性格**：
- **严谨**：数学家的逻辑思维
- **细致**：Simula的形式化定义主要由他完成
- **谦逊**：总说"这是我们两人的工作"

**后期工作**：
- 验证技术（Verification）
- 程序正确性证明
- 形式化方法

**逝世**：
- **2002年6月29日**：因病去世于奥斯陆
- 享年70岁
- 去世前一年刚获得图灵奖

### Kristen Nygaard（1926-2002）

**早年**：
- **1926年8月27日**：出生于挪威奥斯陆
- **1956年**：奥斯陆大学数学学士
- **背景**：运筹学和政治学

**职业经历**：
- **1948-1960年**：挪威国防研究所（运筹学）
- **1960-1970年**：挪威计算中心
- **1970年后**：奥斯陆大学教授

**多面性**：
- **社会活动家**：关注技术对社会的影响
- **工会倡导者**：推动工人参与技术决策
- **教育家**：培养了大批学生

**哲学**：
> "技术不是中立的，它塑造社会。程序员应该关心代码的社会后果。"

**逝世**：
- **2002年8月10日**：心脏病突发去世
- 享年75岁
- 比Dahl晚去世约6周

### 两人的合作

**完美搭档**：
- **Nygaard**：提出问题，从实际需求出发
- **Dahl**：设计方案，用数学严谨性实现

**工作方式**：
- 长时间讨论
- Nygaard画图描述问题
- Dahl形式化为数学结构
- 反复迭代

**成果**：
- **Simula I**（1965）：模拟语言
- **Simula 67**（1967）：通用OOP语言
- **数十篇论文**：阐述OOP思想

**友谊**：
- 合作40年
- 相互尊重
- 从未因名利争吵

### 历史的遗憾

**图灵奖的延迟**：
- 2001年宣布获奖
- 2002年3月应该颁奖
- 但两人在颁奖前相继去世

**追授**：
- ACM破例追授
- 家人代为领奖
- 学术界深感遗憾

**评价**：
> "他们活着看到了OOP的胜利，但未能亲自接受这一荣誉。"

## 💭 为什么他们值得纪念？

### 1. 他们改变了编程的思维方式

**之前**：
程序员思考"如何做"（算法）

**之后**：
程序员思考"是什么"（对象）

**意义**：
更接近人类的自然思维。

### 2. 他们的思想历久弥新

**1967年的概念**：
- 类、对象、继承、多态

**2024年仍在用**：
- Java、Python、C++、JavaScript...
- 设计模式、UML
- 微服务、DDD（领域驱动设计）

**超过半个世纪的生命力**！

### 3. 他们是谦逊的先驱

**没有炒作**：
- Simula在挪威安静地诞生
- 没有商业推广
- 纯粹的学术驱动

**无私分享**：
- Simula的思想自由传播
- 启发了Smalltalk、C++
- 从不要求专利或版权费

### 4. 他们体现了科学合作的典范

**40年合作**：
- 从未因名利争吵
- 相互补充
- 共同署名

**对比**：
许多发明的发明者为了名誉对簿公堂，Dahl和Nygaard的友谊令人敬佩。

## 🔍 技术深度：Simula的实现细节

### 1. 类与对象的内存模型

**类定义**：
编译时创建类的元数据：
```
类名: Car
属性: [speed: INTEGER, fuel: INTEGER]
方法: [accelerate: PROCEDURE, brake: PROCEDURE]
```

**对象创建**：
运行时在堆上分配内存：
```
Object {
    vtable: 指向虚方法表
    speed: 60
    fuel: 50
}
```

**引用**：
REF(Car)是指向对象的指针。

### 2. 继承的实现

**前缀机制**：
```simula
Car CLASS SportsCar;
```

编译为：
```
SportsCar布局：
    [Car的部分]
    - speed
    - fuel
    - accelerate方法
    - brake方法
    [SportsCar新增部分]
    - turboCharge
    - turboBoost方法
```

**优势**：
子类对象可以当作父类对象使用（里氏替换原则）。

### 3. 虚方法的动态绑定

**虚方法表（Vtable）**：
```
Vehicle的vtable:
    [0]: makeSound → Vehicle.makeSound

Car的vtable:
    [0]: makeSound → Car.makeSound

Motorcycle的vtable:
    [0]: makeSound → Motorcycle.makeSound
```

**调用过程**：
```simula
v1.makeSound;
```

编译为：
```
1. 从v1获取对象指针
2. 从对象获取vtable指针
3. 在vtable中查找makeSound（索引0）
4. 调用找到的方法
```

**结果**：
运行时确定调用哪个版本的方法。

### 4. 协程与模拟

**协程的实现**：
```simula
CLASS Producer;
BEGIN
    WHILE TRUE DO
    BEGIN
        produce_item;
        DETACH;  ! 让出控制权
    END;
END Producer;

CLASS Consumer;
BEGIN
    WHILE TRUE DO
    BEGIN
        RESUME(producer);  ! 恢复Producer
        consume_item;
    END;
END Consumer;
```

**意义**：
轻量级并发，无需操作系统线程。

## 🧪 实践意义：今天如何应用OOP

### 1. 设计原则（SOLID）

**Single Responsibility（单一职责）**：
一个类只负责一件事。

**Open/Closed（开闭原则）**：
对扩展开放，对修改封闭（用继承扩展）。

**Liskov Substitution（里氏替换）**：
子类可以替换父类（Simula的继承保证这一点）。

**Interface Segregation（接口隔离）**：
不要强迫类实现不需要的方法。

**Dependency Inversion（依赖倒置）**：
依赖抽象，不依赖具体实现。

### 2. 设计模式的应用

**工厂模式**：
```python
class ShapeFactory:
    def create_shape(self, shape_type):
        if shape_type == "circle":
            return Circle()
        elif shape_type == "rectangle":
            return Rectangle()
```

**观察者模式**：
```python
class Subject:
    def attach(self, observer):
        self.observers.append(observer)

    def notify(self):
        for observer in self.observers:
            observer.update(self)
```

### 3. 现代框架中的OOP

**Django（Python Web框架）**：
```python
class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()

    def save(self, *args, **kwargs):
        # 自定义保存逻辑
        super().save(*args, **kwargs)
```

**Unity（游戏引擎）**：
```csharp
public class Player : MonoBehaviour {
    public float speed = 5.0f;

    void Update() {
        // 每帧更新
        transform.position += direction * speed * Time.deltaTime;
    }
}
```

## 📚 延伸阅读

### 核心文献

1. **"SIMULA: An Algol-Based Simulation Language" (1966)**
   - Dahl和Nygaard的原始论文

2. **"Class and Subclass Declarations" (1967)**
   - 继承机制的形式化定义

3. **"SIMULA 67 Common Base Language" (1968)**
   - 语言规范

### 历史回顾

1. **"The Development of Object-Oriented Programming Languages" - Dahl（1989)**
   - Dahl回顾OOP历史

2. **"How Object-Oriented Programming Started" - Nygaard（2001)**
   - Nygaard的口述历史

### 影响研究

1. **"A History of Object-Oriented Programming Languages" - Cardelli（1996)**
2. **"The Early History of Smalltalk" - Alan Kay（1993)**
   - Kay讲述Simula对Smalltalk的影响

## 🌟 精神遗产

### Dahl和Nygaard的三大遗产

#### 1. 抽象的力量
> "好的抽象比聪明的算法更持久。"

类和对象是强大的抽象工具，让程序员在更高层次思考。

#### 2. 合作的典范
40年的无间合作，没有名利之争，只有对真理的追求。

#### 3. 低调的伟大
在挪威安静地改变了世界，不求名不图利。

### 对年轻程序员的启示

**学会抽象**：
不要陷入细节，提升到概念层面思考。

**设计先于编码**：
花时间设计类结构，比写代码更重要。

**简单胜于复杂**：
Simula的概念简单明了，但威力巨大。

**团队合作**：
像Dahl和Nygaard那样，发挥各自优势。

---

**总结语**： Ole-Johan Dahl和Kristen Nygaard是编程思想史上的革命者。他们用Simula播下了面向对象编程的种子，这颗种子长成了参天大树，枝叶伸向C++、Java、Python、JavaScript...影响了数十亿行代码和几代程序员。

他们证明了：编程不仅是技术，更是思维方式；不仅是代码，更是对世界的建模。类和对象不是语法糖，而是让我们用接近人类自然思维的方式组织复杂系统的强大工具。

从船坞调度到游戏引擎，从企业系统到移动应用，OOP的思想无处不在。每当我们写下`class`关键字，每当我们用继承复用代码，每当我们用多态实现灵活性，我们都在继承Dahl和Nygaard的遗产。

历史开了个残酷的玩笑——两位大师都未能亲自领取图灵奖。但他们的思想已经永生，活在每一个面向对象的程序中，活在每一个程序员的思维里。这才是真正的不朽。

---

*最后更新：2024年12月*
*本文为图灵奖系列文章，旨在以通俗方式介绍计算机科学先驱的贡献*
