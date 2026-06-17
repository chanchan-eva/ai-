export type ModelId = "gpt" | "claude" | "gemini"

export interface ModelInfo {
  id: ModelId
  name: string
  fullName: string
}

export const MODELS: ModelInfo[] = [
  { id: "gpt", name: "GPT", fullName: "GPT-4o（OpenAI）" },
  { id: "claude", name: "Claude", fullName: "Claude 3.5（Anthropic）" },
  { id: "gemini", name: "Gemini", fullName: "Gemini 1.5（Google）" },
]

export type BiasType =
  | "modernization"
  | "western-frame"
  | "context-omission"
  | "allusion-misread"
  | "sentiment-bias"
  | "other"

export interface BiasOption {
  id: BiasType
  label: string
  description: string
}

export const BIAS_OPTIONS: BiasOption[] = [
  {
    id: "modernization",
    label: "过度现代化解释",
    description: "用当代概念套用古人思想，丧失历史语境",
  },
  {
    id: "western-frame",
    label: "西方文化框架代入",
    description: "以西方哲学、宗教或价值体系解释中国本土文化",
  },
  {
    id: "context-omission",
    label: "历史背景遗漏",
    description: "忽略魏晋时代政治、社会、思想史背景",
  },
  {
    id: "allusion-misread",
    label: "典故误读",
    description: "对典故、人物、出处理解错误或张冠李戴",
  },
  {
    id: "sentiment-bias",
    label: "情感倾向偏差",
    description: "解读中带有不当的褒贬或情绪化判断",
  },
  {
    id: "other",
    label: "其他",
    description: "其他类型的文化或史学偏差",
  },
]

export interface SampleEntry {
  id: string
  source: {
    title: string
    author: string
    text: string
  }
  interpretations: Record<ModelId, string>
}

export const SAMPLE_ENTRIES: SampleEntry[] = [
  {
    id: "sample-1",
    source: {
      title: "《世说新语·任诞》",
      author: "刘义庆",
      text: "王子猷居山阴，夜大雪，眠觉，开室命酌酒，四望皎然。因起彷徨，咏左思《招隐诗》。忽忆戴安道，时戴在剡，即便夜乘小船就之。经宿方至，造门不前而返。人问其故，王曰：「吾本乘兴而行，兴尽而返，何必见戴？」",
    },
    interpretations: {
      gpt: "这则故事讲述了王子猷在雪夜突然想去拜访朋友戴安道，连夜乘船前往，却在到达门口时转身返回。他的解释是『乘兴而行，兴尽而返』——这体现了一种追求即时情绪满足、注重个人体验胜过社交目的的生活态度，类似于现代人所说的『活在当下』(living in the moment)，强调自我实现与情绪自由。",
      claude:
        "此则出自《世说新语·任诞》，集中体现了魏晋名士的『任诞』之风与玄学背景下的人生态度。王子猷（王徽之）雪夜兴起、乘兴而往、兴尽而返，重在『兴』之自然流动，而非达成某种目的。这种行为方式与当时『越名教而任自然』的思潮相呼应，反映士人对内在性情真率的推崇，'见与不见'本身已无关紧要。",
      gemini:
        "这是一个关于友谊与自由精神的著名故事。王子猷深夜冒雪去看望好友戴安道，行程艰辛却在最后放弃，说明他重视的是行动本身带来的快乐。这种『说走就走』的洒脱，展现了一种浪漫主义(Romanticism)情怀，与追求自由意志的西方个人主义精神不谋而合，是对世俗礼教的一种反叛。",
    },
  },
  {
    id: "sample-2",
    source: {
      title: "《兰亭集序》",
      author: "王羲之",
      text: "夫人之相与，俯仰一世，或取诸怀抱，悟言一室之内；或因寄所托，放浪形骸之外。虽趣舍万殊，静躁不同，当其欣于所遇，暂得于己，快然自足，不知老之将至。",
    },
    interpretations: {
      gpt: "王羲之在这里讨论了不同人的生活方式选择：有人喜欢室内深谈，有人喜欢户外放纵。无论性格内向还是外向，当人们沉浸于自己喜爱的事物时，都会感到满足而忘记衰老。这其实是在说每个人都应该找到自己的『心流』(flow)状态，实现自我价值最大化。",
      claude:
        "此段出自《兰亭集序》，王羲之借兰亭雅集抒发对生命短暂、欢乐易逝的深沉感慨。『俯仰一世』『不知老之将至』之语，承接下文『修短随化，终期于尽』的生死之叹，根植于魏晋之际玄学清谈与生命意识觉醒的时代氛围。所谓『放浪形骸之外』并非纵欲，而指寄情玄远、超脱形迹的精神追求。",
      gemini:
        "这段文字描写了人们交往中的两种态度，反映了作者豁达的人生观。王羲之认为人应当及时行乐，珍惜当下的快乐时光。这种思想体现了对生命的热爱和对自由的向往，颇有几分存在主义(Existentialism)的味道——即在有限的人生中追寻个体生存的意义。",
    },
  },
]
