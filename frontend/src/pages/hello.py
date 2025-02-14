class Tables:
    def __init__(self):
        self.LC = 0
        self.LT = [0, 0]
        self.MOT = [
            ["AREG", "RG", "01"], ["BREG", "RG", "02"], ["CREG", "RG", "03"], ["DREG", "RG", "04"],
            ["EQ", "CC", "01"], ["LT", "CC", "02"], ["GT", "CC", "03"], ["LE", "CC", "04"],
            ["GE", "CC", "05"], ["ANY", "CC", "06"], ["STOP", "IS", "00"], ["ADD", "IS", "01"],
            ["SUB", "IS", "02"], ["MULT", "IS", "03"], ["MOVER", "IS", "04"], ["MOVEM", "IS", "05"],
            ["COMP", "IS", "06"], ["BC", "IS", "07"], ["DIV", "IS", "08"], ["READ", "IS", "09"],
            ["PRINT", "IS", "10"], ["LOAD", "IS", "11"], ["START", "AD", "01"], ["END", "AD", "02"],
            ["ORIGIN", "AD", "03"], ["EQU", "AD", "04"], ["LTORG", "AD", "05"], ["DS", "DL", "01"],
            ["DC", "DL", "02"]
        ]
        self.SYMTAB = []
        self.LITTAB = []
        self.POOLTAB = []
        self.LC = 0
        self.CODE = []

    def process_lines(self, lines):
        for line in lines:
            line = line.strip()
            if not line or line.startswith('//'):
                continue
            print(f"Processing line: {line}")
            self.CODE.append(line.split())

    def gen_INTCODE(self):
        for line in self.CODE:
            temp = []
            for token in line:
                result = ""
                if self.is_mnemonic(token) and self.get_class(token) != "CC":
                    if self.get_class(token) == "RG":
                        result = self.get_code(token)
                    elif self.get_class(token) == "IS":
                        result = self.get_code(token)
                    elif self.get_class(token) == "AD":
                        result = self.get_code(token)
                    elif self.get_class(token) == "DL":
                        result = self.get_code(token)
                elif self.is_symbol(token):
                    if not self.is_in_SYMTAB(token):
                        self.SYMTAB.append([token, str(self.LC)])
                    result = self.get_index(token, self.SYMTAB)
                elif self.is_literal(token):
                    if not self.is_in_LITTAB(token):
                        self.LITTAB.append([token, "*"])
                    result = self.get_index(token, self.LITTAB)
                temp.append(result)
            print("\t".join(temp))

    def is_mnemonic(self, token):
        for row in self.MOT:
            if row[0] == token:
                return True
        return False

    def get_class(self, token):
        for row in self.MOT:
            if row[0] == token:
                return row[1]
        return None

    def get_code(self, token):
        for row in self.MOT:
            if row[0] == token:
                return row[2]
        return None

    def is_symbol(self, token):
        return not self.is_mnemonic(token) and not self.is_literal(token)

    def is_literal(self, token):
        return token.startswith('=')

    def is_in_SYMTAB(self, token):
        for row in self.SYMTAB:
            if row[0] == token:
                return True
        return False

    def is_in_LITTAB(self, token):
        for row in self.LITTAB:
            if row[0] == token:
                return True
        return False

    def get_index(self, token, table):
        for i, row in enumerate(table):
            if row[0] == token:
                return str(i)
        return None

if __name__ == "__main__":
    tables = Tables()
    input_string = """START 100
MOVER AREG, ='5'
ADD BREG, ='10'
MOVEM AREG, X
X DS 1
END"""
    lines = input_string.split('\n')
    tables.process_lines(lines)
    tables.gen_INTCODE()
    print("SYMTAB:", tables.SYMTAB)