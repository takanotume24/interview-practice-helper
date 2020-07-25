class OriginalInputHandler {
    private char_limit: number
    constructor() {
        this.char_limit = 4500
        var original_element = document.getElementById("original") as HTMLInputElement;
        this.showResult(original_element);
    }

    public doWork = () => {
        var original_element = document.getElementById("original") as HTMLInputElement;
        this.showResult(original_element);
    }



    private showResult(original_element: HTMLInputElement) {
        var converted_element = document.getElementById("converted");
        if (!converted_element) {
            return;
        }

        var source = original_element.value;
        if (!source) {
            return
        }

        const strings = source.split("\n").map(str => `${str}\n`)
        var results: string[] = this.shuffle(strings)

        converted_element.innerHTML = this.show_boxes(results)
    }

    private shuffle(a : string[]) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    private show_boxes(strings: string[]): string {
        var result = ""
        var i = 0
        strings.forEach(string => {
            result += this.in_box(string, i++)
        })
        return result
    }
    private in_box(string: string, colmn_num: number): string {
        const text_area_id = `"text_area_${colmn_num}"`
        return `<li class="list-group-item">
            <label for=${text_area_id}>
                No.${colmn_num}, Number of characters : ${string.length}
            </label>
            <textarea class="form-control" id=${text_area_id}>${string}</textarea></li>`
    }

}

window.onload = () => {
    var handler = new OriginalInputHandler();
    document.getElementById("original")?.addEventListener("input", handler.doWork);
};