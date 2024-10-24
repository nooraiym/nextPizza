export type Product = {
  name: string;
  imageUrl: string;
  categoryId: number;
};

export const products = [
  {
    name: 'Омлет с ветчиной и грибами',
    description:
      'Горячий сытный омлет с поджаристой корочкой, ветчина, шампиньоны и моцарелла',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp',
    categoryId: 2,
  },
  {
    name: 'Омлет с пепперони',
    description:
      'Сытный и сбалансированный завтрак — омлет с поджаристой корочкой, пикантная пепперони, томаты и моцарелла',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE94ECF33B0C46BA410DEC1B1DD6F8.webp',
    categoryId: 2,
  },
  {
    name: 'Кофе Латте',
    description:
      'Когда хочется нежную молочную пенку, на помощь приходит классический латте',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
    categoryId: 2,
  },
  {
    name: 'Дэнвич ветчина и сыр',
    description:
      'Поджаристая чиабатта и знакомое сочетание, цыпленка, ветчины из цыпленка, моцареллы со свежими томатами и соусом ранч',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.webp',
    categoryId: 3,
  },
  {
    name: 'Куриные наггетсы',
    description: 'Хрустящие куриные наггетсы из цыпленка в панировке',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE7D618B5C7EC29350069AE9532C6E.webp',
    categoryId: 3,
  },
  {
    name: 'Картофель из печи 🌱',
    description: 'Запеченная в печи картошечка. Привычный вкус и мало масла',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EED646A9CD324C962C6BEA78124F19.webp',
    categoryId: 3,
  },
  {
    name: 'Додстер',
    description:
      'Легендарная горячая закуска с цыплёнком, томатами, моцареллой, соусом ранч в тонкой пшеничной лепешке',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE796F96D11392A2F6DD73599921B9.webp',
    categoryId: 3,
  },
  {
    name: 'Острый Додстер 🌶️🌶️',
    description:
      'Горячая закуска с цыпленком, перцем халапеньо, маринованными огурчиками, томатами, моцареллой и соусом барбекю в тонкой пшеничной лепешке',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE796FD3B594068F7A752DF8161D04.webp',
    categoryId: 3,
  },
  {
    name: 'Банановый молочный коктейль',
    description:
      'Сливочная прохлада классического молочного коктейля с добавлением банана',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EEE20B8772A72A9B60CFB20012C185.webp',
    categoryId: 4,
  },
  {
    name: 'Карамельное яблоко молочный коктейль',
    description:
      'Не важно, какое время года на улице, этот коктейль с карамельным концентратом вернет вас в осень с одного глотка',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE79702E2A22E693D96133906FB1B8.webp',
    categoryId: 4,
  },
  {
    name: 'Молочный коктейль с печеньем Орео',
    description:
      'Как вкуснее есть печенье? Его лучше пить! Попробуйте молочный коктейль с мороженым и дробленым печеньем «Орео»',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE796FA1F50F8F8111A399E4C1A1E3.webp',
    categoryId: 4,
  },
  {
    name: 'Классический молочный коктейль 👶',
    description:
      'В мире так много коктейлей, но классика — вечна. Попробуйте наш молочный напиток с мороженым',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE796F93FB126693F96CB1D3E403FB.webp',
    categoryId: 4,
  },
  {
    name: 'Ирландский Капучино',
    description:
      'Насыщенный кофе с бархатистой пенкой, дополненный мягкими нотками ирландского крема для изысканного вкуса',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE7D61999EBDA59C10E216430A6093.webp',
    categoryId: 5,
  },
  {
    name: 'Кофе Карамельный капучино',
    description:
      'Если не шоколад, то карамель! А капучино с карамельным сиропом особенно хорош',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE7D61AED6B6D4BFDAD4E58D76CF56.webp',
    categoryId: 5,
  },
  {
    name: 'Кофе Кокосовый латте',
    description:
      'Много молока и кокоса. Уютный кокосовый латте на основе эспрессо',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE7D61B19FA07090EE88B0ED347F42.webp',
    categoryId: 5,
  },
  {
    name: 'Кофе Американо',
    description: 'Горячий напиток на основе эспрессо',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE7D61B044583596548A59078BBD33.webp',
    categoryId: 5,
  },
  {
    name: 'Кофе Латте',
    description:
      'Когда хочется нежную молочную пенку, на помощь приходит классический латте',
    imageUrl:
      'https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
    categoryId: 5,
  },
];
