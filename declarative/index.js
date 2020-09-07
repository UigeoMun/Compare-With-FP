const students = [
    { id: 21300267 ,name : "James", age : 33, score : { mid : 33, final : 34 }, gender : 'male' },
    { id: 21300268 ,name : "Janny", age : 21, score : { mid : 43, final : 24 }, gender : 'female' },
    { id: 21300269 ,name : "Tom", age : 23, score : { mid : 13, final : 11 }, gender : 'male' },
    { id: 21300270 ,name : "Yager", age : 25, score : { mid : 53, final : 14 }, gender : 'male' },
    { id: 21300271 ,name : "Jake", age : 21, score : { mid : 33, final : 13 }, gender : 'male' },
    { id: 21200232 ,name : "John", age : 22, score : { mid : 33, final : 40 }, gender : 'male' },
    { id: 21400007 ,name : "Danial", age : 26, score : { mid : 33, final : 34 }, gender : 'male' },
    { id: 21500127 ,name : "Chris", age : 25, score : { mid : 23, final : 54 }, gender : 'female' },
    { id: 21000107 ,name : "JS", age : 30, score : { mid : 13, final : 44 }, gender : 'female' },
    { id: 21000107 ,name : "JS", age : 33, score : { mid : 1, final : 43 }, gender : 'female' },
    { id: 21000107 ,name : "JS", age : 31, score : { mid : 3, final : 22 }, gender : 'female' },
]


//Imperative 
//남자 학생 중에 상위 3명의 중간 기말 점수의 합
const onlyMaleTotalScoreTop3Sum = (students) => {
    let sum = 0;
    const onlyMaleTotal = [];
    
    for ( const st of students){
        if(st.gender === 'male'){
            onlyMaleTotal.push( { ...st, total : st.score.mid+st.score.final } )
        }
    }
    const onlyMaleTotalSorted = onlyMaleTotal.sort( (pre,cur)=>  cur.total-pre.total )
    for ( let i =0; i <3 ;i++ ){
        sum += onlyMaleTotalSorted[i].total;
    }
    return sum
}

const result1 = onlyMaleTotalScoreTop3Sum( students )
console.log(result1)



//Declarative (Functional)
const take = (limit ,iter)=> {
    const list = [];
    let i = 0;
    while(limit-i) list.push(iter[i++])
    return list
}

const filter = ( pred, iter )=> {
    const list = [];
    for ( const a of iter){
        if( pred(a) ) list.push(a)
    }
    return list
}

const map = ( fn , iter ) => {{
    const list = [];
    for ( const a of iter){
        list.push( fn(a) )
    }
    return list
}}

const reduce = ( fn, acc, iter ) => {
    for( const a of iter ){
        acc = fn(acc,a)
    }
    return acc
}

const sort = ( comp, list )=> {
    return list.sort( comp )
}

const scoreComp = ( a,b )=> b-a

const add = (a,b) => a+b;


// A(B(C(D(E(F(x))))))
const result2 = 
reduce( add, 0 ,
    take( 3 ,
        sort( scoreComp, 
            map( (st)=> st.score.mid + st.score.final ,
                filter( (st)=>st.gender === 'male', students )
                )
            )
        )
    )

console.log(result2)

const pipe = ( fn, ...fns ) => ( ...args ) => {
    return reduce( (a, f)=>f(a), fn(...args), fns )
}

/// A.B.C.D.E.F(x)
const result3 = pipe(
    (iter)=>filter( (st)=>st.gender === 'male', iter ),
    (iter)=>map( (st)=> st.score.mid + st.score.final , iter),
    (iter)=>sort( scoreComp,iter),
    (iter)=>take( 3, iter ),
    (iter)=>reduce( add, 0, iter )
)(students)

console.log(result3)



//More Dclarative 
const filterOnlyMale = (iter) => {
    return filter( (st)=>st.gender === 'male', iter )
}

const mapTotalScore = (iter) => {
    return map( (st)=> st.score.mid + st.score.final , iter)
}

const sortByScoreASC = (iter) => {
    return sort( scoreComp,iter)
}

const take3 = (iter) => {
    return take( 3, iter )
}

const SumAll = ( iter ) => {
    return reduce( add, 0, iter )
}

const result4 = pipe(
    filterOnlyMale,
    mapTotalScore,
    sortByScoreASC,
    take3,
    SumAll
)(students)

console.log(result4)

