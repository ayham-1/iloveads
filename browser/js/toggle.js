document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('toggle');

    browser.storage.local.get('checkboxState', function(result) {
        checkbox.checked = result.checkboxState || false;
    });

    checkbox.addEventListener('change', function() {
        browser.storage.local.set({ checkboxState: checkbox.checked }, function() {
            console.log("Checkbox state saved:", checkbox.checked);
        });
    });
});
