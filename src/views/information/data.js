const mainData = [
  // 1、 找企业服务
  [
    {
      name: "ServiceType",
      title: "",
      pageTitle: "选择企业服务",
      // 企业服务:1找同城代办服务,2找供应商;

      selectList: [
        {
          id: 1,
          title: "找同城代办服务"
        },
        {
          id: 2,
          title: "找供应商"
        }
      ]
    },
    {
      name: "ServiceTime",
      title: "",
      pageTitle: "选择服务时效",

      // 企业服务:1一周,2一个月,3长期;

      selectList: [
        {
          id: 1,
          title: "一周"
        },
        {
          id: 2,
          title: "一个月"
        },
        {
          id: 3,
          title: "长期"
        }
      ]
    },
    {
      name: "Other",
      title: "",
      pageTitle: "个人其他信息",

      selectList: [
        {
          id: "setPlanned",
          title: "您计划的月收入（元）"
        },
        {
          id: "setCurrent",
          title: "您目前的月收入（元）"
        },
        {
          id: "setPlanningTime",
          title: "您预计多久达到计划（天）"
        }
      ]
    }
  ],
  // 2、众筹
  [
    {
      name: "SelectIdentity",
      title: "",
      pageTitle: "选择身份",

      selectList: [
        { id: 1, title: "我是企业" },
        {
          id: 2,
          title: "我是个人"
        }
      ]
    },
    {
      name: "Other",
      title: "",
      pageTitle: "其他信息",

      selectList: [
        {
          id: "setPlanned",
          title: "您今年的众筹目标（万元）"
        },
        {
          id: "setCurrent",
          title: "您今年已经完成的募资金额（万元）"
        },
        {
          id: "setPlanningTime",
          title: "您预计多少天完成"
        }
      ]
    }
  ],
  // 3、找人派单
  [
    {
      name: "ServiceTime",
      title: "",
      pageTitle: "选择服务时效",

      // 找人派单: 1一周, 2一个月, 3长期;
      selectList: [
        {
          id: 1,
          title: "一周"
        },
        {
          id: 2,
          title: "一个月"
        },
        {
          id: 3,
          title: "长期"
        }
      ]
    },
    {
      name: "Other",
      title: "",
      pageTitle: "其他信息",

      selectList: [
        {
          id: "setPlanningTime",
          title: "您现在的企业规模"
        },
        {
          id: "setPlanned",
          title: "您今年的目标业绩（万元）"
        },
        {
          id: "setCurrent",
          title: "您今年已经完成的目标业绩（万元）"
        }
      ]
    }
  ],
  // 4、学习财商知识
  [
    {
      name: "ServiceTime",
      pageTitle: "学习财商知识",

      title: "您预计每天有多长学习时间",
      // 学习财商知识: 1碎片时间, 2一小时内, 3二个小时;
      selectList: [
        {
          id: 1,
          title: "碎片时间（10分钟）"
        },
        {
          id: 2,
          title: "1小时内"
        },
        {
          id: 3,
          title: "2小时"
        }
      ]
    },
    {
      name: "SelectCategory",
      title: "课程分类",
      pageTitle: "课程分类选择",

      selectList: 7
    }
  ],
  // 5、技能赚钱
  [
    {
      name: "SelectIdentity",
      title: "",
      pageTitle: "选择身份",

      selectList: [
        { id: 1, title: "我是企业" },
        {
          id: 2,
          title: "我是个人"
        }
      ]
    },
    {
      name: "SelectCategory",
      title: "技能分类",
      pageTitle: "技能分类",
      selectList: 2
    }
  ],
  // 6、找项目投资
  [
    {
      name: "SelectIdentity",
      title: "",
      pageTitle: "选择身份",
      selectList: [
        { id: 1, title: "我是企业" },
        {
          id: 2,
          title: "我是个人"
        }
      ]
    },
    {
      name: "Other",
      title: "",
      pageTitle: "其他信息",
      selectList: [
        {
          id: "setPlanned",
          title: "您今年的投资目标（万元）"
        },
        {
          id: "setCurrent",
          title: "您今年已经完成的投资金额（万元）"
        }
      ]
    }
  ]
];
export default mainData;
