/**
 * Enables flex col-x or row-x in css
 * @param {string} childElemClass name of flex-instance. May be 'col' or 'row'
 */
function enableFlexGrid(childElemClass) {
    const cols = document.querySelectorAll('.' + childElemClass);
    cols.forEach((col) => {
        const styles = col.parentElement.style;
        if (styles.display !== 'flex') {
            styles.display = 'flex';
            styles.flexDirection = childElemClass === '.row' ? 'column' : 'row';
            styles.alignItems = 'center';
            styles.justifyContent = 'center';

            col.parentElement.style = styles;
        }
    });
}

enableFlexGrid('col');
enableFlexGrid('row');
