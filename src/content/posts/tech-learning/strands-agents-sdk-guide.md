---
title: Strands Agents SDK 完全指南：构建生产级 AI Agent
date: 2025-12-14
description: 深入介绍 AWS 开源的 Strands Agents SDK，学习如何用 Python 构建可靠、可扩展的 AI Agent 应用。
keywords: [Strands Agents, AWS SDK, AI Agent开发, Python Agent, 生产级AI, Agent框架]
author: DoggyDad
tags: [AI Agent, Python, AWS, LLM, SDK]
---

# Strands Agents SDK 完全指南

## 什么是 Strands Agents？

**Strands Agents** 是 AWS 开源的一个 Python SDK，用于构建和部署 AI Agent。它的设计理念是：

> 用最简单的代码构建最强大的 Agent

与其他 Agent 框架相比，Strands 的特点是：

- 🎯 **简洁的 API** - 几行代码就能创建功能完整的 Agent
- 🔧 **工具优先** - 内置丰富的工具，也支持自定义
- 🏢 **生产就绪** - 来自 AWS 的企业级设计
- 🔌 **模型无关** - 支持多种 LLM 提供商
- 📦 **模块化架构** - 按需使用，灵活组合

## 核心概念

### Agent 的本质

在 Strands 中，Agent 是一个能够：
1. 理解用户意图
2. 选择合适的工具
3. 执行任务
4. 返回结果

的智能实体。

```
用户输入 → Agent（LLM + 工具）→ 执行结果
```

### 三大核心组件

```python
from strands import Agent
from strands.models import BedrockModel
from strands.tools import calculator

# 1. 模型 (Model) - Agent 的大脑
model = BedrockModel(model_id="anthropic.claude-3-sonnet")

# 2. 工具 (Tools) - Agent 的能力
tools = [calculator]

# 3. Agent - 组合模型和工具
agent = Agent(model=model, tools=tools)
```

## 快速开始

### 安装

```bash
pip install strands-agents
```

如果需要使用 AWS Bedrock：

```bash
pip install strands-agents[bedrock]
```

其他可选依赖：

```bash
pip install strands-agents[anthropic]  # Anthropic API
pip install strands-agents[openai]     # OpenAI API
pip install strands-agents[all]        # 所有依赖
```

### 第一个 Agent

```python
from strands import Agent

# 创建最简单的 Agent
agent = Agent()

# 与 Agent 对话
response = agent("你好，请介绍一下你自己")
print(response)
```

### 添加工具

```python
from strands import Agent
from strands.tools import calculator, current_time

# 创建带工具的 Agent
agent = Agent(tools=[calculator, current_time])

# Agent 会自动选择合适的工具
response = agent("现在几点了？")
print(response)

response = agent("计算 123 * 456 + 789")
print(response)
```

## 模型配置

### 使用 AWS Bedrock

```python
from strands import Agent
from strands.models import BedrockModel

# 配置 Bedrock 模型
model = BedrockModel(
    model_id="anthropic.claude-3-sonnet-20240229-v1:0",
    region_name="us-east-1"
)

agent = Agent(model=model)
```

支持的 Bedrock 模型：
- `anthropic.claude-3-opus`
- `anthropic.claude-3-sonnet`
- `anthropic.claude-3-haiku`
- `amazon.titan-text-express`
- `meta.llama3-70b-instruct`

### 使用 Anthropic API

```python
from strands import Agent
from strands.models import AnthropicModel

model = AnthropicModel(
    model_id="claude-3-sonnet-20240229",
    api_key="your-api-key"  # 或设置环境变量 ANTHROPIC_API_KEY
)

agent = Agent(model=model)
```

### 使用 OpenAI API

```python
from strands import Agent
from strands.models import OpenAIModel

model = OpenAIModel(
    model_id="gpt-4-turbo",
    api_key="your-api-key"  # 或设置环境变量 OPENAI_API_KEY
)

agent = Agent(model=model)
```

### 模型参数配置

```python
model = BedrockModel(
    model_id="anthropic.claude-3-sonnet",
    temperature=0.7,        # 创造性程度 (0-1)
    max_tokens=4096,        # 最大输出长度
    top_p=0.9,              # 核采样参数
    stop_sequences=["\n\n"] # 停止序列
)
```

## 工具系统

### 内置工具

Strands 提供了丰富的内置工具：

```python
from strands.tools import (
    calculator,      # 数学计算
    current_time,    # 获取当前时间
    file_read,       # 读取文件
    file_write,      # 写入文件
    http_request,    # HTTP 请求
    shell,           # 执行 Shell 命令
    python_repl,     # Python 解释器
    web_search,      # 网页搜索
)
```

### 自定义工具

使用 `@tool` 装饰器创建自定义工具：

```python
from strands import Agent, tool

@tool
def get_weather(city: str) -> str:
    """获取指定城市的天气信息
    
    Args:
        city: 城市名称，如 "北京"、"上海"
    
    Returns:
        天气信息字符串
    """
    # 实际应用中这里会调用天气 API
    return f"{city}今天晴，温度 25°C"

@tool
def send_email(to: str, subject: str, body: str) -> str:
    """发送电子邮件
    
    Args:
        to: 收件人邮箱
        subject: 邮件主题
        body: 邮件正文
    
    Returns:
        发送结果
    """
    # 实际发送邮件的逻辑
    return f"邮件已发送至 {to}"

# 使用自定义工具
agent = Agent(tools=[get_weather, send_email])

response = agent("北京今天天气怎么样？")
print(response)
```

### 工具参数验证

Strands 使用 Pydantic 进行参数验证：

```python
from strands import tool
from pydantic import Field

@tool
def create_user(
    name: str = Field(description="用户姓名"),
    age: int = Field(ge=0, le=150, description="用户年龄"),
    email: str = Field(pattern=r"^[\w\.-]+@[\w\.-]+\.\w+$", description="邮箱地址")
) -> dict:
    """创建新用户"""
    return {"name": name, "age": age, "email": email, "status": "created"}
```

### 异步工具

```python
from strands import tool
import aiohttp

@tool
async def fetch_url(url: str) -> str:
    """异步获取 URL 内容"""
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()
```

## 对话管理

### 多轮对话

```python
from strands import Agent

agent = Agent()

# Agent 会自动维护对话历史
agent("我叫张三")
agent("我喜欢编程")
response = agent("你还记得我的名字和爱好吗？")
print(response)  # Agent 会记住之前的对话
```

### 手动管理对话历史

```python
from strands import Agent
from strands.types import Message

agent = Agent()

# 获取对话历史
history = agent.messages

# 清空对话历史
agent.clear_messages()

# 添加自定义消息
agent.add_message(Message(role="user", content="你好"))
agent.add_message(Message(role="assistant", content="你好！有什么可以帮助你的？"))
```

### 系统提示词

```python
from strands import Agent

agent = Agent(
    system_prompt="""你是一个专业的 Python 编程助手。
    
    你的特点：
    - 代码简洁优雅
    - 注重最佳实践
    - 解释清晰易懂
    
    请用中文回答问题。"""
)

response = agent("如何实现一个单例模式？")
```

## 高级功能

### 流式输出

```python
from strands import Agent

agent = Agent()

# 流式输出
for chunk in agent.stream("写一首关于编程的诗"):
    print(chunk, end="", flush=True)
```

### 异步调用

```python
import asyncio
from strands import Agent

agent = Agent()

async def main():
    response = await agent.ainvoke("你好")
    print(response)

asyncio.run(main())
```

### 回调函数

```python
from strands import Agent
from strands.callbacks import CallbackHandler

class MyCallback(CallbackHandler):
    def on_llm_start(self, prompt):
        print(f"🚀 开始调用 LLM: {prompt[:50]}...")
    
    def on_llm_end(self, response):
        print(f"✅ LLM 返回: {response[:50]}...")
    
    def on_tool_start(self, tool_name, tool_input):
        print(f"🔧 调用工具: {tool_name}")
    
    def on_tool_end(self, tool_name, tool_output):
        print(f"📤 工具返回: {tool_output[:50]}...")

agent = Agent(callbacks=[MyCallback()])
agent("计算 100 的平方根")
```

### 错误处理

```python
from strands import Agent
from strands.exceptions import ToolError, ModelError

agent = Agent()

try:
    response = agent("执行一些操作")
except ToolError as e:
    print(f"工具执行错误: {e}")
except ModelError as e:
    print(f"模型调用错误: {e}")
except Exception as e:
    print(f"未知错误: {e}")
```

### 重试机制

```python
from strands import Agent
from strands.models import BedrockModel

model = BedrockModel(
    model_id="anthropic.claude-3-sonnet",
    max_retries=3,           # 最大重试次数
    retry_delay=1.0,         # 重试间隔（秒）
    timeout=30.0             # 超时时间（秒）
)

agent = Agent(model=model)
```

## 实战案例

### 案例一：智能客服 Agent

```python
from strands import Agent, tool

# 定义业务工具
@tool
def query_order(order_id: str) -> dict:
    """查询订单状态"""
    # 模拟数据库查询
    orders = {
        "ORD001": {"status": "已发货", "tracking": "SF123456"},
        "ORD002": {"status": "处理中", "tracking": None},
    }
    return orders.get(order_id, {"error": "订单不存在"})

@tool
def create_ticket(issue: str, priority: str = "normal") -> str:
    """创建工单"""
    return f"工单已创建，编号: TKT{hash(issue) % 10000:04d}"

# 创建客服 Agent
customer_service = Agent(
    system_prompt="""你是一个友好的客服助手。
    
    职责：
    1. 帮助用户查询订单
    2. 处理用户投诉和问题
    3. 创建工单跟进复杂问题
    
    态度：耐心、专业、有同理心""",
    tools=[query_order, create_ticket]
)

# 使用
response = customer_service("我想查一下订单 ORD001 的状态")
print(response)
```

### 案例二：代码审查 Agent

```python
from strands import Agent, tool

@tool
def read_file(filepath: str) -> str:
    """读取代码文件"""
    with open(filepath, 'r') as f:
        return f.read()

@tool
def run_linter(filepath: str) -> str:
    """运行代码检查工具"""
    import subprocess
    result = subprocess.run(
        ['pylint', filepath, '--output-format=text'],
        capture_output=True, text=True
    )
    return result.stdout or "No issues found"

code_reviewer = Agent(
    system_prompt="""你是一个资深的代码审查专家。
    
    审查要点：
    1. 代码风格和可读性
    2. 潜在的 bug 和安全问题
    3. 性能优化建议
    4. 最佳实践建议
    
    请提供具体、可操作的改进建议。""",
    tools=[read_file, run_linter]
)

response = code_reviewer("请审查 main.py 文件")
print(response)
```

### 案例三：数据分析 Agent

```python
from strands import Agent, tool
import pandas as pd

@tool
def load_csv(filepath: str) -> str:
    """加载 CSV 文件并返回基本信息"""
    df = pd.read_csv(filepath)
    info = f"""
    行数: {len(df)}
    列数: {len(df.columns)}
    列名: {list(df.columns)}
    数据类型: {df.dtypes.to_dict()}
    """
    return info

@tool
def run_query(filepath: str, query: str) -> str:
    """对数据执行 pandas 查询"""
    df = pd.read_csv(filepath)
    result = eval(f"df.{query}")
    return str(result)

@tool
def create_chart(filepath: str, chart_type: str, x: str, y: str) -> str:
    """创建图表"""
    import matplotlib.pyplot as plt
    df = pd.read_csv(filepath)
    
    plt.figure(figsize=(10, 6))
    if chart_type == "bar":
        df.plot(kind='bar', x=x, y=y)
    elif chart_type == "line":
        df.plot(kind='line', x=x, y=y)
    
    output_path = "chart.png"
    plt.savefig(output_path)
    return f"图表已保存至 {output_path}"

data_analyst = Agent(
    system_prompt="你是一个数据分析专家，擅长数据探索和可视化。",
    tools=[load_csv, run_query, create_chart]
)

response = data_analyst("分析 sales.csv 文件，找出销售额最高的产品")
print(response)
```

### 案例四：多 Agent 协作

```python
from strands import Agent

# 研究员 Agent
researcher = Agent(
    system_prompt="你是一个研究员，负责收集和整理信息。"
)

# 写作 Agent
writer = Agent(
    system_prompt="你是一个技术作家，负责将信息转化为易读的文章。"
)

# 编辑 Agent
editor = Agent(
    system_prompt="你是一个编辑，负责审核和改进文章质量。"
)

# 协作流程
def create_article(topic: str) -> str:
    # 1. 研究
    research = researcher(f"请研究以下主题并提供关键信息: {topic}")
    
    # 2. 写作
    draft = writer(f"基于以下研究内容写一篇文章:\n{research}")
    
    # 3. 编辑
    final = editor(f"请审核并改进以下文章:\n{draft}")
    
    return final

article = create_article("Python 异步编程最佳实践")
print(article)
```

## 部署与生产

### 环境变量配置

```bash
# AWS 配置
export AWS_REGION=us-east-1
export AWS_ACCESS_KEY_ID=your-key
export AWS_SECRET_ACCESS_KEY=your-secret

# 或使用其他提供商
export ANTHROPIC_API_KEY=your-key
export OPENAI_API_KEY=your-key
```

### 日志配置

```python
import logging
from strands import Agent

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# Strands 会自动使用配置的日志
agent = Agent()
```

### 与 FastAPI 集成

```python
from fastapi import FastAPI
from pydantic import BaseModel
from strands import Agent

app = FastAPI()
agent = Agent()

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    response = await agent.ainvoke(request.message)
    return ChatResponse(response=str(response))

# 运行: uvicorn main:app --reload
```

### 与 AWS Lambda 集成

```python
from strands import Agent
from strands.models import BedrockModel

# 在 Lambda 外部初始化（冷启动优化）
model = BedrockModel(model_id="anthropic.claude-3-haiku")
agent = Agent(model=model)

def handler(event, context):
    message = event.get("message", "")
    response = agent(message)
    
    return {
        "statusCode": 200,
        "body": str(response)
    }
```

## 最佳实践

### 1. 工具设计原则

```python
# ✅ 好的工具设计
@tool
def search_products(
    query: str,
    category: str = None,
    max_results: int = 10
) -> list:
    """搜索产品
    
    Args:
        query: 搜索关键词
        category: 产品类别（可选）
        max_results: 最大返回数量，默认 10
    
    Returns:
        产品列表
    """
    pass

# ❌ 不好的工具设计
@tool
def do_stuff(data):  # 参数不明确，没有类型提示
    """做一些事情"""  # 描述不清晰
    pass
```

### 2. 系统提示词最佳实践

```python
# ✅ 好的系统提示词
system_prompt = """你是一个专业的技术支持工程师。

## 你的职责
- 诊断技术问题
- 提供解决方案
- 指导用户操作

## 工作原则
1. 先了解问题全貌，再提供解决方案
2. 使用简单易懂的语言
3. 提供分步骤的操作指南

## 限制
- 不要执行可能造成数据丢失的操作
- 遇到安全相关问题，建议联系安全团队"""

# ❌ 不好的系统提示词
system_prompt = "你是助手"  # 太简单，没有指导性
```

### 3. 错误处理

```python
from strands import Agent, tool
from strands.exceptions import ToolError

@tool
def risky_operation(param: str) -> str:
    """可能失败的操作"""
    try:
        # 执行操作
        result = do_something(param)
        return result
    except ValueError as e:
        raise ToolError(f"参数错误: {e}")
    except ConnectionError as e:
        raise ToolError(f"连接失败: {e}")
```

### 4. 性能优化

```python
# 使用更快的模型处理简单任务
fast_agent = Agent(
    model=BedrockModel(model_id="anthropic.claude-3-haiku")
)

# 使用更强的模型处理复杂任务
smart_agent = Agent(
    model=BedrockModel(model_id="anthropic.claude-3-opus")
)

def route_request(message: str):
    # 简单问题用快速模型
    if len(message) < 50 and "?" in message:
        return fast_agent(message)
    # 复杂问题用强模型
    return smart_agent(message)
```

## 常见问题

### Q: 如何处理长对话导致的 token 超限？

```python
from strands import Agent

agent = Agent(max_history_messages=10)  # 只保留最近 10 条消息
```

### Q: 如何让 Agent 记住用户偏好？

```python
from strands import Agent

# 在系统提示词中包含用户信息
def create_personalized_agent(user_preferences: dict):
    return Agent(
        system_prompt=f"""用户偏好：
        - 语言：{user_preferences.get('language', '中文')}
        - 专业领域：{user_preferences.get('domain', '通用')}
        - 回答风格：{user_preferences.get('style', '详细')}
        """
    )
```

### Q: 如何调试 Agent 的决策过程？

```python
from strands import Agent

agent = Agent(verbose=True)  # 开启详细日志
response = agent("执行任务")
```

## 总结

Strands Agents SDK 提供了一个简洁而强大的框架来构建 AI Agent：

**核心优势**：
- 🎯 简洁的 API 设计
- 🔧 灵活的工具系统
- 🏢 生产级可靠性
- 🔌 多模型支持

**适用场景**：
- 智能客服
- 自动化工作流
- 数据分析助手
- 代码助手
- 内容生成

**学习路径**：
1. 从简单的 Agent 开始
2. 逐步添加自定义工具
3. 优化系统提示词
4. 实现多 Agent 协作
5. 部署到生产环境

---

## 参考资源

- [Strands Agents GitHub](https://github.com/strands-agents/sdk-python)
- [AWS Bedrock 文档](https://docs.aws.amazon.com/bedrock/)
- [Anthropic Claude 文档](https://docs.anthropic.com/)

---

*最后更新：2024-12-13*
