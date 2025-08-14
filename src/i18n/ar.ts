import { Translations } from "./en";

const ar: Translations = {
  common: {
    ok: "نعم",
    cancel: "حذف",
    back: "خلف",
    logOut: "تسجيل خروج", // @demo remove-current-line
  },
  welcomeScreen: {
    postscript:
      "ربما لا يكون هذا هو الشكل الذي يبدو عليه تطبيقك مالم يمنحك المصمم هذه الشاشات وشحنها في هذه الحالة",
    readyForLaunch: "تطبيقك تقريبا جاهز للتشغيل",
    exciting: "اوه هذا مثير",
    letsGo: "لنذهب", // @demo remove-current-line
  },
  errorScreen: {
    title: "هناك خطأ ما",
    friendlySubtitle:
      "هذه هي الشاشة التي سيشاهدها المستخدمون في عملية الانتاج عند حدوث خطأ. سترغب في تخصيص هذه الرسالة ( الموجودة في 'ts.en/i18n/app') وربما التخطيط ايضاً ('app/screens/ErrorScreen'). إذا كنت تريد إزالة هذا بالكامل، تحقق من 'app/app.tsp' من اجل عنصر <ErrorBoundary>.",
    reset: "اعادة تعيين التطبيق",
    traceTitle: "خطأ من مجموعة %{name}", // @demo remove-current-line
  },
  emptyStateComponent: {
    generic: {
      heading: "فارغة جداً....حزين",
      content:
        "لا توجد بيانات حتى الآن. حاول النقر فوق الزر لتحديث التطبيق او اعادة تحميله.",
      button: "لنحاول هذا مرّة أخرى",
    },
  },
  // @demo remove-block-start
  errors: {
    invalidEmail: "عنوان البريد الالكتروني غير صالح",
  },
  tabs: {
    Home: "بيت",
    Wallet: "محفظة",
    MySpaces: "مساحاتي",
    Orders: "طلبات",
    Profile: "حساب تعريفي",
  },
  loginScreen: {
    signIn: "تسجيل الدخول",
    enterDetails:
      ".ادخل التفاصيل الخاصة بك ادناه لفتح معلومات سرية للغاية. لن تخمن ابداً ما الذي ننتظره. او ربما ستفعل انها انها ليست علم الصواريخ",
    emailFieldLabel: "البريد الالكتروني",
    passwordFieldLabel: "كلمة السر",
    emailFieldPlaceholder: "ادخل بريدك الالكتروني",
    passwordFieldPlaceholder: "كلمة السر هنا فائقة السر",
    tapToSignIn: "تسجيل الدخول",
    hint: "(: تلميح: يمكنك استخدام اي عنوان بريد الكتروني وكلمة السر المفضلة لديك",
    continue: "أو الاستمرار مع",
    continuegoogle: "تواصل مع جوجل",
    donthaveaccount: "ليس لديك حساب؟",
    singup: "اشتراك",
    forgotPassword: "هل نسيت كلمة السر؟",
  },
  createAccountScreen: {
    heading: "أنشئ حسابك",
    title: "ما هو أفضل وصف لك؟",
    tenant: "مستأجر",
    landlord: "المالك",
    next: "التالي",
  },

  addInfoScreen: {
    header: "معلومات شخصية",
    firstNameLabel: "الاسم الأول",
    firstNamePlaceholder: "أدخل الاسم الأول",
    lastNameLabel: "اسم العائلة",
    lastNamePlaceholder: "إدخال اسم آخر",
    dateOfBirthLabel: "تاريخ الميلاد",
    dateOfBirthPlaceholder: "أدخل تاريخ الميلاد",
    genderLebel: "جنس",
    selectLebel: "يختار",
    emailLabel: "بريد إلكتروني",
    emailPlaceholder: "أدخل البريد الإلكتروني",
    phoneNumberLabel: "رقم التليفون",
    next: "التالي",
    male: "남성",
    female: "여성",
  },
  home: {
    yourlocation: "موقعك",
    location: "سان دييغو، كاليفورنيا",
    showbalance: "إظهار الرصيد",
    hidebalance: "إخفاء الرصيد",
    viewwallet: "تفاصيل المحفظة",
    requestwithdraw: "طلب السحب",
    active: "نشيط",
    editspace: "تحرير الفضاء",
    vieworder: "عرض الطلبات",
    upcomingparking: "مواقف السيارات القادمة",
    parkingspace: "أماكن وقوف السيارات الخاصة بك",
    details: "تفاصيل",
    linkbankaccount: "ربط الحساب البنكي",
    linkaccountdetail:
      "من أجل متابعة عمليات السحب، تحتاج إلى ربط حسابك المصرفي. يرجى ربط حسابك البنكي لإعداد طريقة السحب الخاصة بك.",
    notnow: "ليس الآن",
    linkbank: "رابط البنك",
    congrats: "تهانينا!",
    accountready: "حسابك جاهز للاستخدام.",
    gotohome: "اذهب إلى الصفحة الرئيسية",
  },

  lindaccountScreen: {
    heading: "ربط حسابك البنكي",
    accountlable: "عنوان الحساب",
    accountplaceholder: "أدخل عنوان الحساب",
    banklabel: "حدد البنك",
    bankplaceholder: "يختار",
    accountnumberLabel: "",
    accuntnumberplaceholder: "رقم الحساب",
    agree: "وأنا أتفق مع بارك جينيوس",
    termsofservice: "شروط الخدمة",
    and: "و",
    privacypolicy: "سياسة الخصوصية",
    skip: "يتخطى",
    link: "وصلة",
  },
  enteramountScreen: {
    header: "سحب المبلغ",
    title: "كم تريد أن تنسحب؟",
    continue: "يكمل",
  },

  withdrawndetailsScreen: {
    header: "سحب المبلغ",
    accounttitlelabel: "عنوان الحساب",
    banklabel: "حدد البنك",
    accountnolabel: "رقم الحساب",
    withdraw: "ينسحب",
    thankyou: "شكرًا لك",
    witdhrawndesc:
      "لطلب السحب الخاص بك. سنقوم بمعالجة طلبك، وسوف تتلقى إشعارًا بمجرد اكتمال المعاملة.",
    gotohomepage: "اذهب إلى الصفحة الرئيسية",
  },
  notificationScreen: {
    header: "إشعارات",
    today: "اليوم",
    ordercompleted: "تم اكتمال الطلب",
    earned: "كنت قد كسبت",
    congratulations: "مبروك 🎊",
    yourearning: "أرباحك من",
    availableinwallet: "متاحة الآن في محفظتك وجاهزة للسحب.",
    yesterday: "أمس",
    parkingorder: "لديك أمر وقوف السيارات الجديد.",
    banklinked: "الحساب البنكي مرتبط",
    verificationsuccessful: "تم التحقق بنجاح",
    verified: "اكتمل التحقق من الحساب",
  },
  walletScreen: {
    header: "تفاصيل المحفظة",
    earning: "الأرباح",
    all: "الجميع",
    parkingspace: "أماكن وقوف السيارات الخاصة بك",
    totalearning: "الأرباح الكلية",
    active: "نشيط",
    viewdetails: "عرض التفاصيل",
  },
  totalearningScreen: {
    header: "الأرباح الكلية",
    completedorder: "الطلبات المكتملة",
    active: "نشيط",
  },

  completedOrderScreen: {
    header: "الطلب جاهز",
    customername: "اسم الزبون",
    vehicletype: "نوع السيارة",
    vehiclename: "اسم المركبة",
    number: "رقم",
    date: "تاريخ",
    duration: "مدة",
    time: "وقت",
    perhour: "المبلغ / ساعة",
    totlahours: "مجموع الساعات",
    platformfees: "رسوم المنصة",
    receivedamount: "المبلغ الذي تسلمه",
  },
  myspacesScreen: {
    header: "أماكن وقوف السيارات الخاصة بي",
    available: "متاح للحجوزات",
    editbutton: "تحرير الفضاء",
    vieworder: "عرض الطلبات",
    editparking: "تحرير أماكن وقوف السيارات",
    modalheading: "هل أنت متأكد؟",
    modaldesc:
      "هل تريد إلغاء تنشيط مكان وقوف السيارات هذا؟ ولن يكون متاحًا بعد الآن للحجوزات.",
    notnow: "ليس الآن",
    deacvtive: "إلغاء التنشيط",
  },
  addspaceScreen: {
    header: "أضف مساحة ركن السيارة الخاصة بك",
    namelabel: "أدخل اسم مكان ركن السيارة الخاص بك",
    nameplaceholder: "أدخل الاسم",
    desclabel: "أدخل الوصف",
    descplaceholder: "أدخل الوصف",
    offerlabel: "ما هي أنواع مرافق وقوف السيارات التي تقدمها؟",
    parkingtype:
      "ما هي أنواع مرافق وقوف السيارات التي تقدمها؟ ما نوع مواقف السيارات التي تمتلكها أو المتاحة للإيجار؟",
    addphotolabel: "أظهر مساحة ركن السيارة الخاصة بك - أضف الصور الآن",
    next: "التالي",
  },

  availabilityScreen: {
    header: "التسعير والتوافر",
    hourlyrate: "ما هو سعر الساعة لاستئجار مكان وقوف السيارات الخاص بك؟",
    availibility:
      "يرجى تحديد أيام الأسبوع وساعات توفر مكان لوقوف السيارات الخاص بك",
    from: "من",
    end: "وقت النهاية",
    mon: "الاثنين",
    tue: "يوم الثلاثاء",
    wed: "الأربعاء",
    thu: "يوم الخميس",
    fri: "جمعة",
    sat: "السبت",
    sun: "الأحد",
    next: "التالي",
  },

  addLocationScreen: {
    header: "أضف الموقع",
    streetlabel: "عنوان الشارع",
    streetplaceholder: "أدخل عنوان الشارع",
    citylabel: "اختر مدينة",
    statelabel: "الولاية/المقاطعة",
    zipcodelabel: "الرمز البريدي / الرمز البريدي",
    countryLabel: "حدد الدولة",
    select: "يختار",
    next: "التالي",
  },
  verifySpaceScreen: {
    header: "التحقق من المساحة الخاصة بك",
    identitycard: "البطاقة الشخصية",
    document: "وثيقة الأرض",
    continue: "يكمل",
    gotospace: "اذهب إلى مساحتي",
    modaldesc:
      "مكان وقوف السيارات الخاص بك في انتظار الموافقة. سنقوم بإخطارك بمجرد موافقة فريق الإدارة لدينا عليه. شكرا لتقريركم.",
    congrats: "تهانينا!",
    submit: "يُقدِّم",
  },
  verifyIdcardScreen: {
    header: "التحقق من المساحة الخاصة بك",
    label: "التقط صورة للجزء الأمامي من بطاقة هويتك",
    takepick: "أخذ الموافقة المسبقة عن علم",
    continue: "يكمل",
  },

  scanDocumentScreen: {
    header: "مسح المستند",
    heading: "مسح المستند الخاص بك",
  },
  spaceDetailsScreen: {
    header: "تفاصيل",
    direction: "الاتجاهات",
    about: "عن",
    review: "التعليقات",
    desc: "وصف",
    parkingtime: "وقت وقوف السيارات",
    editparking: "تحرير أماكن وقوف السيارات",
  },
  
  editspaceScreen:{
    header: "تحرير مساحة وقوف السيارات الخاصة بك",

  },
  ordersScreen:{
    header:"أوامر",
    active:"نشيط",
    upcoming:"القادمة",
    completed:"مكتمل",
    expected:"المبلغ المتوقع",
    activeorder:"النظام النشط",
    upcomingorder:"النظام القادم",
    completedorder:"الطلب جاهز",
  },

  demoNavigator: {
    componentsTab: "عناصر",
    debugTab: "تصحيح",
    communityTab: "واصل اجتماعي",
    podcastListTab: "البودكاست",
  },
  demoCommunityScreen: {
    title: "تواصل مع المجتمع",
    tagLine:
      "قم بالتوصيل لمنتدى Infinite Red الذي يضم تفاعل المهندسين المحلّيين ورفع مستوى تطوير تطبيقك معنا",
    joinUsOnSlackTitle: "انضم الينا على Slack",
    joinUsOnSlack:
      "هل ترغب في وجود مكان للتواصل مع مهندسي React Native حول العالم؟ الانضمام الى المحادثة في سلاك المجتمع الاحمر اللانهائي! مجتمعناالمتنامي هو مساحةآمنة لطرح الاسئلة والتعلم من الآخرين وتنمية شبكتك.",
    joinSlackLink: "انضم الي مجتمع Slack",
    makeIgniteEvenBetterTitle: "اجعل Ignite افضل",
    makeIgniteEvenBetter:
      "هل لديك فكرة لجعل Ignite افضل؟ نحن سعداء لسماع ذلك! نحن نبحث دائماً عن الآخرين الذين يرغبون في مساعدتنا في بناء افضل الادوات المحلية التفاعلية المتوفرة هناك. انضم الينا عبر GitHub للانضمام الينا في بناء مستقبل Ignite",
    contributeToIgniteLink: "ساهم في Ignite",
    theLatestInReactNativeTitle: "الاحدث في React Native",
    theLatestInReactNative:
      "نخن هنا لنبقيك محدثاً على جميع React Native التي تعرضها",
    reactNativeRadioLink: "راديو React Native",
    reactNativeNewsletterLink: "نشرة اخبار React Native",
    reactNativeLiveLink: "مباشر React Native",
    chainReactConferenceLink: "مؤتمر Chain React",
    hireUsTitle: "قم بتوظيف Infinite Red لمشروعك القادم",
    hireUs:
      "سواء كان الامر يتعلّق بتشغيل مشروع كامل او اعداد الفرق بسرعة من خلال التدريب العلمي لدينا، يمكن ان يساعد Infinite Red اللامتناهي في اي مشروع محلي يتفاعل معه.",
    hireUsLink: "ارسل لنا رسالة",
  },
  demoShowroomScreen: {
    jumpStart: "مكونات او عناصر لبدء مشروعك",
    lorem2Sentences:
      "عامل الناس بأخلاقك لا بأخلاقهم. عامل الناس بأخلاقك لا بأخلاقهم. عامل الناس بأخلاقك لا بأخلاقهم",
    demoHeaderTxExample: "ياي",
    demoViaTxProp: "عبر `tx` Prop",
    demoViaSpecifiedTxProp: "Prop `{{prop}}Tx` عبر",
  },
  demoDebugScreen: {
    howTo: "كيف",
    title: "التصحيح",
    tagLine:
      "مبروك، لديك نموذج اصلي متقدم للغاية للتفاعل هنا. الاستفادة من هذه النمذجة",
    reactotron: "Reactotron ارسل إلى",
    reportBugs: "الابلاغ عن اخطاء",
    demoList: "قائمة تجريبية",
    demoPodcastList: "قائمة البودكاست التجريبي",
    androidReactotronHint:
      "اذا لم ينجح ذللك، فتأكد من تشغيل تطبيق الحاسوب الخاص Reactotron، وقم بتشغيل عكس adb tcp:9090 \ntcp:9090 من جهازك الطرفي ، واعد تحميل التطبيق",
    iosReactotronHint:
      "اذا لم ينجح ذلك، فتأكد من تشغيل تطبيق الحاسوب الخاص ب Reactotron وأعد تحميل التطبيق",
    macosReactotronHint:
      "اذا لم ينجح ذلك، فتأكد من تشغيل الحاسوب ب Reactotron وأعد تحميل التطبيق",
    webReactotronHint:
      "اذا لم ينجح ذلك، فتأكد من تشغيل الحاسوب ب Reactotron وأعد تحميل التطبيق",
    windowsReactotronHint:
      "اذا لم ينجح ذلك، فتأكد من تشغيل الحاسوب ب Reactotron وأعد تحميل التطبيق",
  },
  demoPodcastListScreen: {
    title: "حلقات إذاعية React Native",
    onlyFavorites: "المفضلة فقط",
    favoriteButton: "المفضل",
    unfavoriteButton: "غير مفضل",
    accessibility: {
      cardHint:
        "انقر مرّتين للاستماع على الحلقة. انقر مرّتين وانتظر لتفعيل {{action}} هذه الحلقة.",
      switch: "قم بالتبديل لاظهار المفضّلة فقط.",
      favoriteAction: "تبديل المفضلة",
      favoriteIcon: "الحلقة الغير مفضّلة",
      unfavoriteIcon: "الحلقة المفضّلة",
      publishLabel: "نشرت {{date}}",
      durationLabel:
        "المدّة: {{hours}} ساعات {{minutes}} دقائق {{seconds}} ثواني",
    },
    noFavoritesEmptyState: {
      heading: "هذا يبدو فارغاً بعض الشيء.",
      content:
        "لم تتم اضافة اي مفضلات حتى الان. اضغط على القلب في إحدى الحلقات لإضافته الى المفضلة.",
    },
  },
  // @demo remove-block-end
};

export default ar;
