import unit12 from './unit1/unit1.2.json';
import unit48 from './unit4/unit4.8.json';
import unit50 from './unit5/unit5.0.json';
import unit71 from './unit7/unit7.1.json';

export const questions = 
    unit48.questions
        .concat(unit50.questions)
        .concat(unit12.questions)
        .concat(unit71.questions);