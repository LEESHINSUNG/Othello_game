/* function checkBottomLeft(x, y) {
  const tbody = document.querySelector("tbody");
  let hasAnyOppositeColor = false; //　前に違う色があるか
  for (let row = x - 1; row >= 0; row--) {
    for (let col = y + 1; col <= 7; col++) {
      if (x + y === row + col) {
        let td = tbody.children[col].children[row];
        if (td.className == "table_block") return 0;
        if (!td.classList.contains(currentColor())) {
          hasAnyOppositeColor = true;
        }
        if (
          td.classList.contains(currentColor()) &&
          hasAnyOppositeColor === false
        )
          return 0;
        if (
          td.classList.contains(currentColor()) &&
          hasAnyOppositeColor === true
        ) {
          for (let col_l = col - 1; col_l > y; col_l--) {
            for (let row_l = row + 1; row_l < x; row_l++) {
              if (x + y == row_l + col_l) {
                let changePosition = tbody.children[col_l].children[row_l];
                reverse(changePosition);
              }
            }
          }
          return 1;
        }
      }
    }
  }
} */

/* function checkTopLeft(x, y) {
  const tbody = document.querySelector("tbody");
  let hasAnyOppositeColor = false; //　前に違う色があるか
  for (let row = x - 1; row >= 0; row--) {
    for (let col = y - 1; col >= 0; col--) {
      if (y - x === col - row) {
        let td = tbody.children[col].children[row];
        if (td.className == "table_block") return 0;
        if (!td.classList.contains(currentColor())) {
          hasAnyOppositeColor = true;
        }
        if (
          td.classList.contains(currentColor()) &&
          hasAnyOppositeColor === false
        )
          return 0;
        if (
          td.classList.contains(currentColor()) &&
          hasAnyOppositeColor === true
        ) {
          for (let col_l = col + 1; col_l < y; col_l++) {
            for (let row_l = row + 1; row_l < x; row_l++) {
              if (y - x === col_l - row_l) {
                let changePosition = tbody.children[col_l].children[row_l];
                reverse(changePosition);
              }
            }
          }
          return 1;
        }
      }
    }
  }
} */

/* function checkBottomRight(x, y) {
  const tbody = document.querySelector("tbody");
  let hasAnyOppositeColor = false; //　前に違う色があるか
  for (let row = x + 1; row <= 7; row++) {
    for (let col = y + 1; col <= 7; col++) {
      if (y - x === col - row) {
        let td = tbody.children[col].children[row];
        if (td.className == "table_block") return 0;
        if (!td.classList.contains(currentColor())) {
          hasAnyOppositeColor = true;
        }
        if (
          td.classList.contains(currentColor()) &&
          hasAnyOppositeColor === false
        )
          return 0;
        if (
          td.classList.contains(currentColor()) &&
          hasAnyOppositeColor === true
        ) {
          for (let col_r = col - 1; col_r > y; col_r--) {
            for (let row_r = row - 1; row_r > x; row_r--) {
              if (col - row === col_r - row_r) {
                let changePosition = tbody.children[col_r].children[row_r];
                reverse(changePosition);
              }
            }
          }
          return 1;
        }
      }
    }
  }
} */


    // count +=
    //   CountR + CountL + CountT + CountB + CountTR + CountTL + CountBR + CountBL;
