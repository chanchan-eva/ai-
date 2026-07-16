import { CaseStudy } from "@/components/case-study"
import {
  CategoryStackedBars,
  ModelBiasBars,
  RadarComparison,
} from "@/components/research-charts"
import { caseContent, researchStats } from "@/lib/research"

const githubUrl = "https://github.com/chanchan-eva/ai-"

export default function Page() {
  const historicalCategory = researchStats.summary.byCategory["历史典故与文化知识"]
  const historicalAverage = historicalCategory.total / 12

  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-5 px-5 py-3 sm:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-3" aria-label="返回页面顶部">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-primary font-serif text-lg text-primary-foreground shadow-sm">
              偏
            </span>
            <div className="min-w-0">
              <p className="truncate font-serif text-base font-semibold tracking-wide text-foreground sm:text-lg">
                AI 文化解释偏差研究
              </p>
              <p className="hidden text-[11px] text-muted-foreground sm:block">
                魏晋文本 · GPT / Claude / Gemini
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-xs text-muted-foreground md:flex" aria-label="页面导航">
            <a className="nav-link" href="#overview">研究概览</a>
            <a className="nav-link" href="#statistics">数据统计</a>
            <a className="nav-link" href="#cases">典型案例</a>
            <a className="nav-link" href="#conclusion">研究结论</a>
          </nav>

          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-sm border border-border bg-card px-3 py-2 text-xs text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            GitHub ↗
          </a>
        </div>
      </header>

      <section id="top" className="hero-paper relative border-b border-border">
        <div className="hero-grid mx-auto grid min-h-[660px] max-w-[1280px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:py-28">
          <div className="relative z-10 max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-3 text-xs tracking-[0.22em] text-primary">
              <span className="h-px w-9 bg-primary" aria-hidden />
              数字人文研究项目
            </div>
            <h1 className="font-serif text-4xl font-semibold leading-[1.2] tracking-[0.04em] text-foreground sm:text-5xl lg:text-[4.1rem]">
              当 AI 解释魏晋，
              <span className="mt-2 block text-primary">它带来了谁的文化框架？</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              本项目比较 GPT、Claude 与 Gemini 对中国魏晋时期文本的解释，观察训练语料与文化背景如何影响模型的理解路径。研究关注的不是能力排名，而是解释框架如何被技术系统选择、放大或忽略。
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#statistics" className="primary-link">
                查看研究数据 <span aria-hidden>↓</span>
              </a>
              <a href="#method" className="secondary-link">了解研究方法</a>
            </div>
          </div>

          <aside className="relative z-10 mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
            <div className="ink-card relative p-7 sm:p-8">
              <span className="absolute right-5 top-5 font-serif text-5xl text-primary/10" aria-hidden>文</span>
              <p className="mb-6 font-serif text-sm tracking-[0.24em] text-primary">RESEARCH SNAPSHOT</p>
              <div className="grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-border bg-border">
                <div className="stat-cell">
                  <strong>{researchStats.meta.textCount}</strong>
                  <span>篇文本</span>
                </div>
                <div className="stat-cell">
                  <strong>{researchStats.meta.recordCount}</strong>
                  <span>条回答</span>
                </div>
                <div className="stat-cell">
                  <strong>{researchStats.meta.totalBiasOccurrences}</strong>
                  <span>次偏差</span>
                </div>
              </div>
              <dl className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
                <div className="flex justify-between gap-6">
                  <dt className="text-muted-foreground">文本范围</dt>
                  <dd className="text-right text-foreground">魏晋及相关六朝文本</dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="text-muted-foreground">标注维度</dt>
                  <dd className="text-right text-foreground">6 类文化解释偏差</dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="text-muted-foreground">统计单位</dt>
                  <dd className="text-right text-foreground">偏差出现次数</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section id="overview" className="section-shell">
        <div className="section-heading grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="section-kicker">01 · 研究概览</p>
            <h2>把模型视为<br className="hidden lg:block" />文化解释系统</h2>
          </div>
          <div className="space-y-5 text-[15px] leading-8 text-muted-foreground">
            <p>
              大语言模型并不只是在“翻译”或“概括”古代文本。它也在决定哪些历史信息值得保留、哪些概念适合套用，以及哪一种价值判断可以成为解释的中心。
            </p>
            <p>
              因此，本研究将文化偏差拆分为过度现代化、西方文化框架代入、历史背景遗漏、典故误读、情感倾向偏差和其他偏差六个维度，并以人工标注的出现次数进行描述性统计。
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-3">
          <article className="concept-cell">
            <span>壹</span>
            <h3>同一文本，三种框架</h3>
            <p>比较模型如何选择思想史、心理学、政治或现代价值语言来组织解释。</p>
          </article>
          <article className="concept-cell">
            <span>贰</span>
            <h3>次数而非能力得分</h3>
            <p>统计的是回答中被标注的偏差出现次数，不等同于模型准确率或综合能力。</p>
          </article>
          <article className="concept-cell">
            <span>叁</span>
            <h3>保留人工判断语境</h3>
            <p>图表展示整体结构，案例则把偏差标签重新放回具体文本和回答中理解。</p>
          </article>
        </div>
      </section>

      <section id="statistics" className="border-y border-border bg-card/45">
        <div className="section-shell">
          <div className="section-heading flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="section-kicker">02 · 数据统计</p>
              <h2>偏差出现在哪里，<br />又如何组成不同的解释结构</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-muted-foreground">
              以下均为原始出现次数。雷达图仅为比较结构而转换为模型内部占比；其他图表保留人工标注的整数计数。
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-12">
            <ModelBiasBars data={researchStats} />
            <RadarComparison data={researchStats} />
            <CategoryStackedBars data={researchStats} />
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="finding-card">
              <span>最高频偏差</span>
              <strong>历史背景遗漏 · 56 次</strong>
              <p>与过度现代化解释（55 次）接近，说明语境缺失与现代概念替代常同时出现。</p>
            </div>
            <div className="finding-card">
              <span>类别集中度</span>
              <strong>典故知识类 · 96 次</strong>
              <p>共 12 条回答，平均每条 {historicalAverage.toFixed(1)} 次，为四类文本中最高。</p>
            </div>
            <div className="finding-card">
              <span>结构差异</span>
              <strong>同一标签，不同组合</strong>
              <p>Claude 更集中于背景遗漏与情感偏差；Gemini 的现代化解释占比更突出。</p>
            </div>
          </div>

          <div className="method-note mt-6">
            <strong>阅读提示</strong>
            <p>回答长度、论述密度和文本类别样本数并不完全一致。本页不以原始次数对模型作优劣排序，也不把相关性解释为训练语料造成偏差的直接因果证据。</p>
          </div>
        </div>
      </section>

      <section id="cases" className="section-shell">
        <div className="section-heading grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="section-kicker">03 · 典型案例</p>
            <h2>从统计数字回到<br />文本、回答与人工判断</h2>
          </div>
          <div className="rounded-sm border-l-2 border-primary bg-primary/[0.035] px-5 py-4 text-sm leading-7 text-muted-foreground">
            <span className="font-medium text-foreground">案例选取规则：</span>
            {caseContent.selectionRule}
          </div>
        </div>

        <div className="mt-10 space-y-8">
          {researchStats.selectedCases.map((stats, index) => {
            const content = caseContent.cases.find((item) => item.textId === stats.textId)
            if (!content) return null
            return (
              <CaseStudy
                key={stats.textId}
                index={index}
                stats={stats}
                content={content}
                data={researchStats}
              />
            )
          })}
        </div>
      </section>

      <section id="conclusion" className="conclusion-section border-y border-border">
        <div className="section-shell">
          <p className="section-kicker text-primary-foreground/70">04 · 研究结论</p>
          <div className="mt-8 grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <blockquote className="font-serif text-3xl font-medium leading-[1.55] tracking-wide text-primary-foreground sm:text-4xl">
              AI 不只是技术系统，
              <br />也是文化解释系统。
              <span className="mt-7 block text-lg font-normal leading-9 text-primary-foreground/75 sm:text-xl">
                当 AI 成为理解世界的媒介时，它会放大某些文化框架，也可能忽视或边缘化另一些文化经验。
              </span>
            </blockquote>
            <div className="space-y-5 border-l border-primary-foreground/20 pl-6 text-sm leading-7 text-primary-foreground/75">
              <p>偏差不仅表现为事实错误，也表现为概念替换、语境删减和价值倾向的重新组织。</p>
              <p>不同模型呈现出不同的偏差组合，说明解释框架本身应成为 AI 评估的重要对象。</p>
              <p>数字人文研究的任务，不只是让模型“更懂古文”，还要追问它以谁的知识传统来理解古文。</p>
            </div>
          </div>
        </div>
      </section>

      <section id="method" className="section-shell">
        <div className="section-heading grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="section-kicker">05 · 方法与来源</p>
            <h2>可追溯的本地研究材料</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="source-card">
              <span>数据表</span>
              <h3>{researchStats.meta.sourceWorkbook}</h3>
              <p>Sheet1 · A1:L46。45 条模型回答记录，所有偏差字段均为整数次数。</p>
            </div>
            <div className="source-card">
              <span>原始回答</span>
              <h3>GPT / Claude / Gemini 回答文档</h3>
              <p>完整回答作为实验记录保存；网页只展示四个代表案例的人工摘要。</p>
            </div>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-sm border border-border">
          <dl className="method-grid">
            <div><dt>分析单位</dt><dd>单篇文本 × 单个模型回答</dd></div>
            <div><dt>文本类别</dt><dd>伦理价值、社会结构、审美表达、典故知识</dd></div>
            <div><dt>偏差维度</dt><dd>现代化、西方框架、背景遗漏、典故误读、情感倾向、其他</dd></div>
            <div><dt>展示原则</dt><dd>描述性统计 + 语境化案例，不做模型能力排名</dd></div>
          </dl>
        </div>
      </section>

      <footer className="border-t border-border bg-card/50">
        <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-4 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:px-8">
          <p>AI 文化解释偏差研究 · 数字人文研究展示</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <span>本地静态数据</span>
            <span>无数据库 · 无登录 · 无 API</span>
            <a className="text-foreground hover:text-primary" href={githubUrl} target="_blank" rel="noreferrer">源代码 ↗</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
