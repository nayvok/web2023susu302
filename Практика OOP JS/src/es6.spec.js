const assert = require('assert');
const core = require('./es6');

describe('es6', () => {
    describe('#fioToName', () => {
        it('ФИО в Имя Фамилия корректно', () => {
            assert.strictEqual(core.fioToName('Иванов Иван Иванович'), 'Иван Иванов');
        });

        it('ФИ в Имя Фамилия', () => {
            assert.strictEqual(core.fioToName('Петров Петр'), 'Петр Петров');
        });
    });

    describe('#filterUnique', () => {
        it('массив с уникальными равен сам себе', () => {
            assert.deepStrictEqual(core.filterUnique([1, 2, 3]), [1, 2, 3]);
        });

        it('массив с неуникальными отфильтрован', () => {
            assert.deepStrictEqual(core.filterUnique([1, 1, 1, 1]), [1]);
        });

        it('пустой массив', () => {
            assert.deepStrictEqual(core.filterUnique([]), []);
        });
    });

    describe('#calculateSalaryDifference', () => {
        it('считает разницу корректно', () => {
            assert.strictEqual(core.calculateSalaryDifference([1, 2, 3]), 3);
        });

        it('считает разницу корректно', () => {
            assert.strictEqual(core.calculateSalaryDifference([5, 3, 1, 4, 7]), 7);
        });

        it('считает разницу корректно', () => {
            assert.strictEqual(core.calculateSalaryDifference([7, 8, 7, 4, 2]), 4);
        });

        it('на пустой массив возвращается falsy значение', () => {
            assert.strictEqual(!!core.calculateSalaryDifference([]), false);
        });
    });

    describe('#Dictionary', () => {
        const dic = new core.Dictionary();
        it('экземпляр класса создается', () => {
            assert.strictEqual(dic.constructor, core.Dictionary);
        });

        it('слова добавляются в словарь', () => {
            dic.addToDictionary("Слово", "Описание этого слова")
            assert.strictEqual(dic.dictionary.has("Слово"), true);
        });

        it('добавляются только строки', () => {
            dic.addToDictionary(1, " ")
            dic.addToDictionary("Число", 2)
            dic.addToDictionary(NaN, "нан")
            dic.addToDictionary(undefined, "ноу")
            dic.addToDictionary(null, "нall")
            assert.strictEqual(dic.dictionary.has(1), false);
            assert.strictEqual(dic.dictionary.has("Число"), false);
            assert.strictEqual(dic.dictionary.has(NaN), false);
            assert.strictEqual(dic.dictionary.has(undefined), false);
            assert.strictEqual(dic.dictionary.has(null), false);
        });

        it('можно получить определение слова', () => {
            assert.strictEqual(dic.getDefinition("Слово"), "Описание этого слова");
        });

        it('слова удаляются из словаря', () => {
            dic.deleteFromDictionary("Слово");
            assert.strictEqual(dic.dictionary.has("Слово"), false);
        });
    });
});