#!/usr/bin/env python3
import curses
import random
import time

# 俄罗斯方块形状定义
SHAPES = [
    [[1, 1, 1, 1]],               # I
    [[1, 1], [1, 1]],             # O
    [[1, 1, 1], [0, 1, 0]],       # T
    [[1, 1, 1], [1, 0, 0]],       # L
    [[1, 1, 1], [0, 0, 1]],       # J
    [[1, 1, 0], [0, 1, 1]],       # S
    [[0, 1, 1], [1, 1, 0]]        # Z
]

COLORS = [curses.COLOR_RED, curses.COLOR_GREEN, curses.COLOR_YELLOW,
          curses.COLOR_BLUE, curses.COLOR_MAGENTA, curses.COLOR_CYAN]

class Tetris:
    def __init__(self, width=10, height=20):
        self.width = width
        self.height = height
        self.board = [[0] * width for _ in range(height)]
        self.score = 0
        self.current_piece = None
        self.current_pos = (0, 0)
        self.game_over = False
        self.init_curses()
        
    def init_curses(self):
        self.stdscr = curses.initscr()
        curses.start_color()
        curses.use_default_colors()
        for i, c in enumerate(COLORS, 1):
            curses.init_pair(i, c, -1)
        curses.noecho()
        curses.cbreak()
        self.stdscr.keypad(True)
        self.stdscr.nodelay(True)
        
    def new_piece(self):
        shape = random.choice(SHAPES)
        color = random.choice(COLORS)
        self.current_piece = (shape, color)
        self.current_pos = (0, (self.width - len(shape[0])) // 2)
        
        if self.check_collision(self.current_pos[0], self.current_pos[1]):
            self.game_over = True
            
    def check_collision(self, y, x):
        shape, _ = self.current_piece
        for i, row in enumerate(shape):
            for j, cell in enumerate(row):
                if cell:
                    ny = y + i
                    nx = x + j
                    if (nx < 0 or nx >= self.width or
                        ny >= self.height or
                        (ny >= 0 and self.board[ny][nx])):
                        return True
        return False
    
    def rotate(self):
        shape, color = self.current_piece
        new_shape = [list(row) for row in zip(*reversed(shape))]
        if not self.check_collision(self.current_pos[0], self.current_pos[1]):
            self.current_piece = (new_shape, color)
            
    def move(self, dy, dx):
        ny = self.current_pos[0] + dy
        nx = self.current_pos[1] + dx
        if not self.check_collision(ny, nx):
            self.current_pos = (ny, nx)
            return True
        return False
    
    def drop(self):
        if not self.move(1, 0):
            self.merge_piece()
            self.clear_lines()
            self.new_piece()
            
    def merge_piece(self):
        shape, color = self.current_piece
        y, x = self.current_pos
        for i, row in enumerate(shape):
            for j, cell in enumerate(row):
                if cell and y + i >= 0:
                    self.board[y + i][x + j] = color
                    
    def clear_lines(self):
        lines = 0
        for i, row in enumerate(self.board):
            if all(row):
                del self.board[i]
                self.board.insert(0, [0] * self.width)
                lines += 1
        if lines:
            self.score += 100 * (2 ** (lines - 1))
            
    def draw(self):
        self.stdscr.clear()
        
        # 绘制游戏区域边框
        self.stdscr.border()
        
        # 绘制当前方块
        shape, color = self.current_piece
        y, x = self.current_pos
        for i, row in enumerate(shape):
            for j, cell in enumerate(row):
                if cell and y + i >= 0:
                    try:
                        self.stdscr.addstr(
                            y + i + 1, x + j + 1, " ",
                            curses.color_pair(COLORS.index(color) + 1) | curses.A_REVERSE
                        )
                    except:
                        pass
                        
        # 绘制已固定的方块
        for i, row in enumerate(self.board):
            for j, cell in enumerate(row):
                if cell:
                    try:
                        self.stdscr.addstr(
                            i + 1, j + 1, " ",
                            curses.color_pair(COLORS.index(cell) + 1) | curses.A_REVERSE
                        )
                    except:
                        pass
                        
        # 显示分数
        self.stdscr.addstr(0, self.width + 3, f"Score: {self.score}")
        self.stdscr.addstr(2, self.width + 3, "Controls:")
        self.stdscr.addstr(3, self.width + 3, "←→ : Move")
        self.stdscr.addstr(4, self.width + 3, "↑  : Rotate")
        self.stdscr.addstr(5, self.width + 3, "↓  : Soft drop")
        self.stdscr.addstr(6, self.width + 3, "Space : Hard drop")
        self.stdscr.addstr(7, self.width + 3, "Q : Quit")
        
        if self.game_over:
            self.stdscr.addstr(
                self.height // 2, self.width // 2 - 4,
                "GAME OVER!", curses.A_BLINK
            )
            
        self.stdscr.refresh()
        
    def run(self):
        self.new_piece()
        last_drop = time.time()
        drop_interval = 0.5
        
        while not self.game_over:
            key = self.stdscr.getch()
            
            if key == ord('q'):
                break
            elif key == curses.KEY_LEFT:
                self.move(0, -1)
            elif key == curses.KEY_RIGHT:
                self.move(0, 1)
            elif key == curses.KEY_UP:
                self.rotate()
            elif key == curses.KEY_DOWN:
                self.move(1, 0)
            elif key == ord(' '):
                while self.move(1, 0):
                    pass
                self.drop()
                
            if time.time() - last_drop > drop_interval:
                self.drop()
                last_drop = time.time()
                drop_interval = max(0.1, drop_interval - 0.005)
                
            self.draw()
            time.sleep(0.01)
            
        curses.endwin()
        print(f"Game Over! Final Score: {self.score}")

if __name__ == "__main__":
    game = Tetris()
    game.run()