package dayOfWeek;

import java.util.Calendar;
import java.util.Collections;
import java.util.Scanner;

public class dayOfWeek {
	public static void main(String[] args) {
		Calendar cl = Calendar.getInstance();
		Scanner sc = new Scanner(System.in);

		int Year = 2022;
		System.out.print("月を入力⇒");
		int Month = sc.nextInt();

		outputCalendar(Year,Month - 1);

	}

	public static void outputCalendar(int inputYear, int inputMonth) {
		Calendar cl = Calendar.getInstance();
		Scanner sc = new Scanner(System.in);

		String[] week = {"日","月","火","水","木","金","土"};

		System.out.println("1日の曜日を入力");
		System.out.print("日:0 月:1 火:2 水:3 木:4 金:5 土:6⇒");
		int firstDay = 1;

		cl.set(inputYear,inputMonth,firstDay);
		int firstDayWeek = sc.nextInt();

		int lastDay = cl.getActualMaximum(Calendar.DAY_OF_MONTH);

		for (int i = 0; i < week.length; i++) {

			System.out.print(week[i] + " ");
		}
		System.out.println();
		System.out.print(String.join("", Collections.nCopies(firstDayWeek, "   ")));
		for (int i = firstDay; i <= lastDay; i++) {

			System.out.printf("%2d ",i);
			if ((firstDayWeek + i) % 7 == 0) {
				System.out.println();
			}
		}
	}
}
