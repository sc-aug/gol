### GOL: no border world
Those creatures live in a no border world happily...

#### Features
* No border.
* Auto generation. (constructing)
* Switch board size. (constructing)
* Different initial communities. (constructing)

### Simple Rule
* for `cell(i,j)` in `board(Row, Col)`
  - `i = i % Row`
  - `j = j % Col`

### Reference
* [wiki: Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
