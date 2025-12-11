---
title: James H. Wilkinson：数值分析的守护者，让计算“算得准”而非“算得快”
date: 1970-01-01
description: James H. Wilkinson：数值分析的守护者，让计算“算得准”而非“算得快”
tags: [图灵奖, 计算机历史, 算法, 人工智能]
---

# 图灵奖第五届 | James H. Wilkinson：数值分析的守护者，让计算“算得准”而非“算得快”

> 一句话概括：他用“后向误差”守住了科学计算的底线。


## 🏆 获奖简介

**James Hardy Wilkinson**（詹姆斯·H·威尔金森）是数值分析与科学计算领域的奠基者之一。[1][2]

- 出生时间：1919年9月27日
- 出生地点：英国 肯特郡·斯特罗德（Strood, Kent, UK）
- 获奖年份：1970年
- 获奖原因：在数值分析，特别是线性代数与特征值计算中提出并系统化“后向误差（backward error）分析”，极大提升了计算的可靠性与稳定性。[1]

### 文本风格与术语标注说明

- 引号：中文内容统一使用中文全角引号“……”。
- 术语：首次出现时采用“中文（英文）”形式，如“后向误差（backward error）”“前向误差（forward error）”“主元选取（pivoting）”“条件数（condition number，记作 $\kappa$）”。
- 人名/机构：首次出现给出英文名/缩写，例如“皇家学会（Royal Society, RS）”“国家物理实验室（National Physical Laboratory, NPL）”。
- 数学：公式用 KaTeX 书写，如 $p(x)=\prod_{k=1}^{20}(x-k)$、$\|r\|/\|b\|$。

## 🚀 他的重大贡献

### 1. 后向误差分析（backward error）：把“错”放回输入里
- 思想要点：与其盯着算法输出与真值的差（“前向误差”，forward error），不如问“是否存在一个与原问题极近的‘近似问题’，其精确解恰好就是算法的输出？”——这就是“后向稳定（backward stability）”。[3][5]
- 价值：只要问题的“条件数（condition number，$\kappa$）”不过分糟糕，后向稳定算法意味着“可相信的结果”。[3]


### 2. 线性代数算法的稳定性与可实施性
- 高斯消元的主元选取（partial pivoting）分析，避免数值爆炸，控制“增长因子（growth factor）”。[3]
- 特征值与奇异值计算：对 QR 迭代（Francis/Kublanovskaya）及相关位移策略进行了系统的实用化分析；对 SVD 的稳定计算给出准则。[4][6][7][10]
- 影响：支撑了现代 BLAS/LAPACK 等高性能数值库的设计准则与实践实现。[9]

### 3. 误差传播与条件数（conditioning）
- 区分“问题的病态（ill-conditioning）”与“算法的不稳定（instability）”。条件数的现代形式可追溯至Alan Turing 对矩阵问题的研究。[8]
- 实践准则：先看“问题可不可靠”，再谈“算法靠不靠谱”。[3]

### 4. 经典著作与教育
- 《Rounding Errors in Algebraic Processes》（1963）：舍入误差与稳定性经典著作。[5]
- 《The Algebraic Eigenvalue Problem》（1965）：特征值问题的里程碑综述与实用算法指南。[4]
- 长期在英国国家物理实验室（NPL）工作，参与与领导科学计算研究，培养一代数值分析人才。[2]

## 🌍 影响力
- 从航天到气象，从有限元到机器学习数值内核，Wilkinson 的方法论让“算得准”成为工程底线。
- 他把数值计算从“碰运气”带向“有章法”。

## 🏅 获奖理由（通俗版）
他证明：正确性不是算完就行，而是要“有可验证的稳定性依据”。这套标准，至今仍是科学计算的金科玉律。


## 🔬 深入拆解与小例子

### A. Wilkinson 多项式：系数微扰 → 根大幅漂移
- 构造：$p(x)=\prod_{k=1}^{20}(x-k)$。把乘积展开成系数后，只要在高阶系数上做极小扰动，求根会大幅偏移。[5]
- 启示：由系数“直接”求根是病态问题；优先用分解/正交化的稳定表述（如用伴随矩阵求根需谨慎）。[3]


### B. 高斯消元的“增长因子”与主元（pivoting）
- 无主元消元易引发中间量爆炸；带部分/完全主元可显著降低增长因子，保持稳定。[3]
- 经验法则：一般场景优先 LU（partial pivoting），病态/秩亏用 QR/SVD；必要时进行尺度化与预处理。[3][9]


### C. 残差与后向误差的专业报告
- 计算 $\hat x$ 后给出残差 $r=b-A\hat x$ 与 $\|r\|/\|b\|$，并估计 $\kappa(A)$。[3]
- 诠释：$\hat x$ 是“稍微改变了 $A$”的线性方程的精确解——这正是后向稳定的含义。

### D. 正交变换与 Wilkinson shift（特征值）
- Householder/Givens 正交变换几乎不放大误差，是 QR/SVD 稳定性的关键。[3][10]
- 对称三对角 QR 迭代中的“Wilkinson 移位”，使用尾部 $2\times2$ 子块的特征值作为位移，显著加速收敛并提升鲁棒性。[4]


### E. 病态问题的经典样例：Hilbert 矩阵
- 定义：Hilbert 矩阵 $H\in\mathbb{R}^{n\times n}$，$H_{ij}=\tfrac{1}{i+j-1}$。
- 特性：随规模 $n$ 增长，$\kappa_2(H)$ 呈爆炸式上升，导致最小的输入扰动也会放大为巨大的解误差。
- 启示：面对病态问题，仅提升数值精度往往杯水车薪；必须进行尺度化、正则化或改写问题表述。[3][10]

### F. 正交化的选择：Householder vs. Gram–Schmidt
- 经典 Gram–Schmidt（CGS）在数值上较不稳健；修改型 Gram–Schmidt（MGS）相对更好，但仍逊于 Householder 反射的稳定性。
- 在最小二乘与 QR 分解中，工程上优先 Householder；对流式/稀疏场景可选 Givens 旋转或混合策略。[3][10]

### G. 为什么“正规方程”危险？
将最小二乘转为正规方程 $(A^\top A)x=A^\top b$ 会将条件数平方化：$\kappa(A^\top A)=\kappa(A)^2$，显著放大病态性与舍入误差。工程上应优先基于正交变换的 QR 或基于双对角化的 SVD。[3][10]

## 🧭 给今天开发者的实用清单
- 最小二乘：优先QR/SVD，避免正规方程 (AᵀA)x=Aᵀb。
- 线性方程：默认带主元LU；大条件数问题考虑预处理/尺度化。
- 特征值/SVD：优先库实现（LAPACK/Eigen/MKL/cuSOLVER），避免手写“天真算法”。
- 质量度量：残差、条件数估计、迭代次数/收敛准则要可追溯。

## 🧩 常见误区与澄清
- “双精度一定够”——对病态问题，增加精度只是延缓失败；先改问题与算法。
- “SVD太慢”——在病态/秩亏场景是“该花的成本”，稳定性优先。
- “不带主元也能跑”——容易在实际数据上失稳；除非有强结构理由，否则不要。

## 📅 生平时间线（简要）
- 1919：出生于英国萨里郡。
- 1946 起：英国国家物理实验室（NPL）从事数值计算。
- 1963：著《Rounding Errors in Algebraic Processes》。
- 1965：著《The Algebraic Eigenvalue Problem》。
- 1970：获图灵奖。
- 1986：逝世。

> 历史事实核对与更正：
> - 出生地为英国肯特郡斯特罗德（Strood, Kent），而非萨里郡。[2]
> - 《Rounding Errors in Algebraic Processes》出版于 1963 年（常见误记为 1959）。[5]

## 📚 参考资料与延伸阅读

[1] ACM A.M. Turing Award – James H. Wilkinson (1970) 授奖词与生平简介.

[2] Royal Society, Biographical Memoirs: James Hardy Wilkinson (1919–1986). 国家物理实验室（NPL）与生平档案.

[3] Higham, N. J., Accuracy and Stability of Numerical Algorithms, SIAM, 2nd ed., 2002.

[4] Wilkinson, J. H., The Algebraic Eigenvalue Problem, Oxford University Press, 1965.

[5] Wilkinson, J. H., Rounding Errors in Algebraic Processes, Prentice-Hall, 1963.

[6] Francis, J. G. F., The QR Transformation: A Unitary Analogue to the LR Transformation, The Computer Journal, 1961.

[7] Kublanovskaya, V., On Some Algorithms for the Solution of the Complete Eigenvalue Problem, USSR Computational Mathematics and Mathematical Physics, 1961.

[8] Turing, A. M., Rounding-Off Errors in Matrix Processes, The Quarterly Journal of Mechanics and Applied Mathematics, 1948.

[9] LAPACK Users’ Guide, 3rd ed., SIAM, 1999.

[10] Golub, G. H., and Van Loan, C. F., Matrix Computations, 4th ed., Johns Hopkins University Press, 2013.

---

## 🧠 生平与时代背景：从 NPL 到数值分析的“黄金年代”

### 与 Alan Turing 的交汇（NPL 早期）
二战结束后，Wilkinson 在英国国家物理实验室（National Physical Laboratory, NPL）投身电子计算的前沿研究，曾与**艾伦·图灵（Alan Turing）**在 NPL 同事一段时间，共同参与早期自动计算引擎（ACE）相关的规划与工作。[2] 虽然后来图灵离开 NPL，但 NPL 的计算与数值分析传统得以延续与壮大，Wilkinson 也逐步将重心从“造机器”转向“让机器算得可靠”。

### 从手算时代迈向电子计算
20 世纪中叶的数值计算经历了从手算、机助表到电子计算机的剧变。早期程序和数据格式限制极大，内存、字长与舍入规则各异，算法的“可实施性（implementability）”与“鲁棒性”成为首要考量。Wilkinson 的贡献，正是在这一时期将“理论可行”转化为“工程可用”。

### 学术共同体与国际影响
与 Wilkinson 同期并相互影响的还有：
- **Gene Golub**：推动矩阵计算与数值线性代数成为独立学科，开创性工作涵盖 SVD、迭代法与软件实践。
- **Alston S. Householder**：提出 Householder 反射，奠定正交化/相似变换的稳定性基础。
- **James G. F. Francis / Vera Kublanovskaya**：确立 QR 迭代的现代框架。
这些工作与 Wilkinson 的稳定性思想互相促进，共同构成了数值线性代数的“黄金年代”。[3][4][6][7][10]

## 🧩 方法论四原则：问题—数据—算法—实现

Wilkinson 的“稳定性观”可提炼为四个层面的系统工程思维：
1) 问题（Problem）：判定是否病态（ill-conditioned）。例如解线性方程 $A x=b$ 的相对误差下界与条件数 $\kappa(A)$ 有关。
2) 数据（Data）：尺度化（scaling）与预处理（preconditioning）以改善数值幅度与谱性质。
3) 算法（Algorithm）：优先选择后向稳定的算法族（如基于正交变换的 QR/SVD、带主元的 LU）。
4) 实现（Implementation）：利用浮点模型与库例程（BLAS/LAPACK），遵循数据局部性、向量化与稳定性守则。

该四原则贯穿其著述与软件建议，是现代科学计算“从建模到可验证结果”的骨架。[3][9][10]

## 🧮 代表性算法与定理：深入“稳定性”的工程细节

### 1) 相似变换与约化：Hessenberg/三对角化
对于一般矩阵 $A$，在进行特征值计算前常先约化为**上 Hessenberg 形**（上次对角线以下全为零）；若 $A$ 对称，则约化为**对称三对角形**。常用工具是 Householder 反射与 Givens 旋转，它们的共同优点是正交性带来良好的后向稳定性。[3][10]

### 2) QR 迭代与隐式位移（implicit shift）
现代 QR 迭代通常在上 Hessenberg或三对角结构上进行，通过“隐式位移”与“隐式 Q 定理（implicit Q theorem）”避免显式形成位移步骤，从而保持结构与稳定性。对称情形下的**Wilkinson 移位**取自尾部 $2\times2$ 子块较近的特征值，能快速分离特征值、促进“隐式重启—分解（deflation）”。[4][10]

### 3) 增长因子上界与 Wilkinson 矩阵
带部分主元的高斯消元，其增长因子 $\rho$ 在理论上的上界是 $\rho\le 2^{n-1}$（由 Wilkinson 证明），尽管理论界可能极端，但在实际数据中往往远低于此界。数值分析中著名的“Wilkinson 矩阵”族作为测试矩阵，常用于展示近重根/近重特征值与增长因子的“最坏情形”行为。[3][10]

### 4) 迭代改进（iterative refinement）
在求解 $A x=b$ 时，先用 LU 解得近似 $\hat x$，再在更高精度或以稳定残差计算获得 $r=b-A\hat x$，解 $A\Delta x=r$ 并回代 $\hat x\leftarrow \hat x+\Delta x$。在后向稳定的前提下，迭代改进可以显著降低前向误差，尤其当残差计算比求解步骤更准确时（如混合精度框架）。[3]

### 5) 条件数估计与误差报告
实际工程中，常用 1-范数条件数估计器（如 Hager/Higham 估计，LAPACK 例程 xLACON），配合残差与相对误差上界给出可信的“结果证据”。这种“结果伴随证书”的理念正是 Wilkinson 倡导的可验证计算范式。[3][9]

### 6) 浮点误差的标准模型（unit roundoff）
在 IEEE 754 浮点体系下，可用如下模型近似描述一次算术运算的舍入误差：

$$\operatorname{fl}(x\ \mathrm{op}\ y) = (x\ \mathrm{op}\ y)(1+\delta),\quad |\delta| \le u,$$

其中 $u$ 称为“单位舍入误差（unit roundoff）”，对二进制 $t$ 位尾数通常有 $u=\tfrac12\,2^{-t}$。这一模型支撑了“后向误差分析”的推导：将多次运算的误差“吸收”为输入数据的微小扰动，从而得到后向稳定界。[3]

> 小提示：在“就近舍入（round-to-nearest, ties-to-even）”策略下，$u$ 的界限最为常用；不同硬件与指令路径（如 FMA）可能改善或改变误差常数，但不改变总体分析框架。[3]

## 🧰 数值软件与社区遗产

### EISPACK / LINPACK / LAPACK 与 NAG
Wilkinson 的书籍与分析直接影响了 20 世纪 70–90 年代三代里程碑式库：
- **EISPACK**：早期的特征值问题软件包，基于 ALGOL/Fortran 的实现，与《Handbook for Automatic Computation, Vol. II: Linear Algebra》关系密切（该卷由 Wilkinson & Reinsch 主编，1971）。
- **LINPACK**：专注稠密线性方程与线性最小二乘问题，为后续 BLAS 分层与性能优化奠基。
- **LAPACK**：面向现代内存层次结构的高性能库，系统吸收稳定性准则并采用分块/BLAS-3 优化。
- **NAG Library**：商业/学术并重的综合数值库，早期受 Wilkinson 方法论深刻影响。

> 注：这些库中关于 QR、SVD、对称三对角特征值分解等核心流程，均以正交变换为骨架，贯彻“后向稳定优先”的设计理念。[9][10]

### Wilkinson Prize for Numerical Software（1991–）
为纪念 Wilkinson 在数值软件中的影响，学术界于 1991 年设立“Wilkinson Prize for Numerical Software”，表彰在数值软件设计与实现方面的突出贡献（常由 NAG、Argonne、NPL 等机构参与）。该奖项强调“可用、可复现、可验证”的理念，即 Wilkinson 的工程精神在软件层面的延续。

### 对现代 AI/ML 的连通性
- 大规模线性代数在推荐系统、PCA/LSA、最小二乘回归中无处不在；稳定的 QR/SVD 是保障模型数值健壮性的底座。
- 优化器的数值稳定（学习率尺度、损失缩放、归一化）与“尺度化/预处理”的思想一致；混合精度训练常结合“高精残差评估+低精主算”的迭代改进思路。
- 稀疏/分布式场景下，库（如 cuSOLVER、MKL、PETSc、Trilinos 等）延续了“后向稳定优先”的传统与证据化报告（残差、迭代准则）。[3][9][10]

## 🧪 工程实践：可落地的“稳定性流程”

下面给出一套可操作的“稳定性检查清单”，与前文“方法论四原则”互相映照：

1) 数据尺度化与预处理：
	- 对列/行进行归一化，使得量纲一致、避免量级悬殊。
	- 必要时使用对角/稀疏预处理提升谱性质。

2) 算法选择：
	- Ax=b：默认 LU（partial pivoting）；病态/秩亏优先 QR/SVD。
	- 最小二乘：优先 QR/SVD，避免正规方程 $(A^\top A)x=A^\top b$。
	- 特征值：对称优先三对角化+位移 QR；非对称优先 Hessenberg+位移 QR/Schur。

3) 误差与证据：
	- 计算残差 $\|b-A\hat x\|/\|b\|$；估计 $\kappa(A)$ 或谱条件数。
	- 如有必要，进行 1–2 次迭代改进，观察残差与解的收敛情况。

4) 软件与实现：
	- 使用成熟库（BLAS/LAPACK/Eigen/MKL/cuSOLVER），避免手写“天真算法”。
	- 遵循分块与内存局部性，减少舍入误差放大的机会。

> 进阶：行/列平衡（equilibration）与自动尺度化常能立竿见影地降低增长因子与迭代步数；对高度病态问题，结合正则化（Tikhonov）或截断 SVD 更稳健。[3][10]

## 🧷 术语对照表（精选）

- 后向误差（backward error）/ 前向误差（forward error）
- 后向稳定（backward stability）/ 数值稳定性（numerical stability）
- 条件数（condition number, $\kappa$）/ 病态（ill-conditioning）
- 主元选取（pivoting）/ 增长因子（growth factor）
- 正交变换（orthogonal/unitary transformations）
- Hessenberg 约化 / 三对角化（tridiagonalization）
- Wilkinson 多项式 / Wilkinson 移位 / Wilkinson 矩阵
- 迭代改进（iterative refinement）/ 预处理（preconditioning）

## 🧸 通俗版小抄：一句话理解这些概念

- 后向误差：把“算出来的不准”归结为“输入数据被轻微改动了”，等价地解释结果为何可信。
- 前向误差：直接看“结果偏离真值多少”；问题一旦病态，前向误差会被条件数放大。
- 后向稳定：算法的误差好像来自“输入的极小改动”，这类算法通常更可靠。
- 条件数（κ）：问题对输入扰动有多敏感的“放大倍数”；κ 大＝病态，任何算法都难办。
- 主元选取（pivoting）：消元时挑“更合适”的元素做支点，避免中间数爆炸（控制增长因子）。
- 增长因子：消元过程中中间量相对变大的程度；越小越稳，越大越容易失控。
- 正交变换：保持长度与角度的“稳健”变换（如 Householder/Givens），误差不容易被放大。
- Hessenberg/三对角化：把矩阵化成“几乎三角”的结构，为 QR 等稳定算法铺路。
- Wilkinson 多项式：一个“系数微扰→根大漂移”的警示样例，说明“用系数直接求根”很危险。
- Wilkinson 移位：QR 迭代里选一个聪明的位移，让特征值更快、更稳地分离出来。
- Wilkinson 矩阵：用来“为难算法”的测试矩阵，展示最坏情形下的增长因子等问题。
- 迭代改进：先求个近似解，再用残差做 1–2 次“纠偏”，常能明显提高精度。
- 预处理：在求解前先把问题“梳理整洁”（如尺度化），让算法更快更稳。
- 正规方程的风险：把最小二乘改写成 (AᵀA)x=Aᵀb 会把条件数“平方放大”，不划算。
- Hilbert 矩阵：著名的病态样例，规模一大，几乎“怎么算都不稳”。
- QR 迭代：特征值的“主力算法”，配合位移/结构约化，稳而有效。
- SVD vs. QR：SVD 最稳健，适合秩亏/病态；QR 更高效，适合结构良好的大问题。
- 单位舍入误差（u）：浮点一次运算的相对误差上界，精度越低 u 越大，累积误差越显著。
- 残差（r）：把解代回去得到的不平衡量（b−Ax̂），是“结果可信度”的第一指标。

## 🙋 扩展 FAQ（工程与理论）

**Q：后向稳定是否保证小的前向误差？**
**A：** 不一定。若问题本身病态（$\kappa$ 很大），后向稳定也可能对应较大的前向误差。因此，先判定问题是否病态，再评价算法输出。[3]

**Q：SVD 为什么被认为稳定？**
**A：** 现代 SVD 算法基于正交变换（双对角化 + QR/分裂），后向稳定性良好，适合处理秩亏与病态问题；代价更高，但在关键环节“值回票价”。[3][10]

**Q：迭代改进何时有用？**
**A：** 当残差能在高于求解步骤的精度下评估，或当 LU 解本身后向稳定而问题不过分病态时，迭代改进能提升前向精度；混合精度（高精残差、低精求解）是现代加速方案之一。[3]

**Q：Wilkinson 多项式是否否定“用系数求根”？**
**A：** 它揭示了“用系数直接求根”的病态，强调以稳定的等价表述（如相似变换、正交化）进行求解；在工程中，通常转为对伴随矩阵的特征值问题，但也需谨慎处理数值放大。[5][10]

**Q：增长因子上界有什么现实意义？**
**A：** 它是“最坏情形”的理论保障。实践中增长因子通常较小，但上界告诉我们为何必须采用主元选取与尺度化、为何某些对抗数据会导致失败。[3]

**Q：浮点格式差异（float32、float64、bfloat16、fp16）会如何影响稳定性？**
**A：** 精度越低，单位舍入误差 $u$ 越大，累积误差越显著。混合精度常用“高精评估残差+低精主算”的模式，配合迭代改进维持前向精度。[3]

**Q：什么时候必须用 SVD 而不是 QR？**
**A：** 当矩阵秩不确定、可能秩亏或高度病态时，SVD 提供最稳健的伪逆与最小二乘解；若数据规模很大且结构良好，QR 可能在成本与精度间更折衷。[3][10]

## 🎲 趣味科普扩展包（易懂、有趣、可动手）

### 1) 小故事：消失的有效数字
二战后的 NPL 里，年轻工程师在纸带上敲下线性方程组的程序。机器“吭哧”一阵后吐出一个漂亮的答案，他兴奋地贴在黑板上。Wilkinson 走过来，只问了一句：“把它代回去了吗？” 工程师沉默。于是他把结果代回去算残差 $r=b-A\hat x$，发现“漂亮的答案”其实让 $\|r\|$ 大得离谱——有效数字仿佛被黑洞吸走。Wilkinson 并没有责备，只是用粉笔写下：先看残差，再谈结论。这成了后来数值线性代数课堂上最常被引用的一句“门口咒语”。

### 2) 生活类比三连
- 条件数像“扩音器”：音源（输入）有一点抖动，扩音器（问题本身）会把抖动放大很多倍；好扩音器（低 $\kappa$）声音稳，坏扩音器（高 $\kappa$）全是啸叫。
- 主元选取像“搬家先搬大件”：先把最重最稳的柜子（大主元）放在底层，楼房（消元过程）才不至于“摇晃变形”。
- 正交化像“等距离的广场舞”：大家跳舞（向量变换）但彼此间距（内积）基本不变，于是不会越跳越“挤”，数值也不“打架”。

### 3) 迷你实验 A：Hilbert 矩阵的“脆弱玻璃”
下面的代码展示了同一个最小二乘问题，用“正规方程”和“QR 分解”两种方法的差异。你会看到正规方程的解对误差更敏感，残差与条件数也更难看。

```python
import numpy as np

def hilbert(n):
	i = np.arange(1, n+1)
	return 1.0 / (i[:, None] + i[None, :] - 1)

n = 10
H = hilbert(n)
true_x = np.ones(n)
b = H @ true_x

# 正规方程求解（不推荐）
ATA = H.T @ H
ATb = H.T @ b
x_ne = np.linalg.solve(ATA, ATb)

# QR 最小二乘（推荐）
Q, R = np.linalg.qr(H)
x_qr = np.linalg.solve(R, Q.T @ b)

def report(name, x):
	r = b - H @ x
	rel_res = np.linalg.norm(r) / np.linalg.norm(b)
	err = np.linalg.norm(x - true_x) / np.linalg.norm(true_x)
	print(f"{name:12s}  相对残差={rel_res:.2e}  前向误差={err:.2e}")

report("normal eq.", x_ne)
report("QR", x_qr)
print("kappa(H)~", np.linalg.cond(H))
```

小结：正规方程把条件数“平方放大”，于是误差更容易“爆表”；QR 依靠正交性更稳健。

### 4) 迷你实验 B：Wilkinson 多项式的“蝴蝶效应”
把 $p(x)=\prod_{k=1}^{20}(x-k)$ 展开，系数非常大且交替，哪怕高阶系数只改动 $10^{-7}$，某些根也会“跑远”。

```python
import numpy as np

# 构造 Wilkinson 多项式的系数（按根构造再转系数）
roots = np.arange(1, 21)
poly = np.poly(roots)          # 系数从最高次到常数项

# 轻微扰动一个高阶系数（比如三次项）
perturbed = poly.copy()
perturbed[-4] *= (1 + 1e-7)

r0 = np.roots(poly)
r1 = np.roots(perturbed)

print("最大根位移:", np.max(np.abs(np.sort(r0) - np.sort(r1))))
```

小结：从“系数”直接求根是病态表述；现代做法转为稳定的矩阵变换与 QR 迭代。

### 5) 迷你实验 C：迭代改进的“小补丁大效果”
先用较低精度求一个近似解，再用高精度计算残差并回补，前向误差常能明显下降。

```python
import numpy as np

np.random.seed(0)
n = 50
A = np.random.randn(n, n)
x_true = np.random.randn(n)
b = A @ x_true

# 低精度主算（模拟）：把矩阵与 b 投到 float32
Af = A.astype(np.float32)
bf = b.astype(np.float32)
x0 = np.linalg.solve(Af, bf).astype(np.float64)

def relerr(x):
	return np.linalg.norm(x - x_true) / np.linalg.norm(x_true)

print("初始前向误差:", relerr(x0))

# 高精度残差+一次改进
r = b - A @ x0            # float64 残差
dx = np.linalg.solve(A, r)
x1 = x0 + dx
print("一次改进后:", relerr(x1))
```

小结：这与混合精度训练里的“高精评估—低精主算”如出一辙。

### 6) 自测题（附简要答案）
1. 为什么“后向稳定”不一定意味着“小前向误差”？（答：问题可能病态，$\kappa$ 放大了误差。）
2. 正规方程相较 QR 的主要数值风险是什么？（答：$\kappa$ 平方化，误差被二次放大。）
3. 为什么主元选取能降低增长因子？（答：避免用很小的数去消大数，减少中间放大。）
4. Householder 与 MGS 相比的优势？（答：更强的正交性与后向稳定性。）
5. 为何 SVD 在秩亏问题上“值回票价”？（答：能可靠地分离奇异值，提供稳健伪逆。）
6. 迭代改进失败的常见原因？（答：问题过于病态或残差计算不够准。）
7. Hilbert 矩阵常被拿来说明什么？（答：经典病态样例，规模一大就极不稳定。）
8. Wilkinson 移位直觉是什么？（答：用末端 2×2 的就近特征值作为位移，加速分离与收敛。）

### 7) 术语冷知识（学术彩蛋）
- “Householder 反射”来自 Tennessee 大学数学家 Alston S. Householder；“反射”一词强调该变换是把向量“对某个超平面镜像”。
- “Francis QR”常指 1961 年 Francis 的两篇论文，确立了现代 QR 迭代框架；与同年的 Kublanovskaya 工作并称“双子星”。
- “增长因子上界 $2^{n-1}$”虽极端，但告诉我们为何对抗矩阵或错误尺度能把 LU 推到失稳边缘。
- “Wilkinson Prize”强调“数值软件”而不只是论文，奖评非常看重可复现、接口设计与文档。
- “后向误差思想”可追溯到 Turing 对矩阵过程的误差模型，这条学术脉络最终在 Wilkinson 处系统化。

## 🧾 轶事与评价

- Wilkinson 的写作风格以“严谨、明白、工程实用”见长。他善用反例、边界案例与“坏矩阵”来教育研究生与工程师。
- 他常强调“数值分析不是让结果好看，而是要让结果可靠且可验证”。这与今天的可重复研究（reproducible research）理念高度契合。
- 学界对他在特征值问题的贡献评价极高，《The Algebraic Eigenvalue Problem》（1965）被视为一座“百科全书式”的里程碑。
 - 他于 1969 年当选英国皇家学会会士（FRS），这是英国科学界的最高学术荣誉之一。[2]

## 🔚 总结：从“正确地计算”到“计算地正确”

Wilkinson 的遗产让科学计算从“能算出一个数”走向“能为这个数提供证据”。
他将问题条件、算法稳定性与软件工程连接起来，建立了跨越模型—算法—实现—验证的闭环。这套闭环，支撑了从航空航天到气候模拟、从材料设计到机器学习数值内核的可靠性要求。今天，当我们在 GPU 上调用一行线性代数库函数时，其中“稳定性与证据”的精神，依然是 Wilkinson 留给我们的底层“守护”。

---

### 附：进一步阅读与资源建议

- Wilkinson & Reinsch（Eds.）, Handbook for Automatic Computation, Vol. II: Linear Algebra, Springer, 1971.
- Stewart, G. W., Matrix Algorithms（Vol. I–II）, SIAM.
- Trefethen, L. N., and Bau, D., Numerical Linear Algebra, SIAM.
- Demmel, J. W., Applied Numerical Linear Algebra, SIAM.
- NAG Library / LAPACK 官方用户指南与教程（示例和最佳实践）。
