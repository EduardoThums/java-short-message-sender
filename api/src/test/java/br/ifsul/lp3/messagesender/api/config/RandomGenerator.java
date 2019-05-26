package br.ifsul.lp3.messagesender.api.config;

import org.apache.commons.lang3.RandomStringUtils;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

public class RandomGenerator {

    public static Boolean nextBoolean() {
        return org.apache.commons.lang3.RandomUtils.nextBoolean();
    }

    public static String nextString(int size) {
        return RandomStringUtils.randomAlphanumeric(size);
    }

    public static Long nextLong() {
        return org.apache.commons.lang3.RandomUtils.nextLong();
    }

    public static Long nextLong(long min, long max) {
        return org.apache.commons.lang3.RandomUtils.nextLong(min, max);
    }

    public static Integer nextInt() {
        return org.apache.commons.lang3.RandomUtils.nextInt();
    }

    public static Integer nextInt(int min, int max) {
        return ThreadLocalRandom.current().nextInt(min, max + 1);
    }

    public static BigDecimal nextBigDecimal() {
        return BigDecimal.valueOf(nextLong());
    }

    public static BigDecimal nextBigDecimal(long min, long max, int scale) {
        return BigDecimal.valueOf(nextLong(min, max), scale);
    }

    public static BigInteger nextBigInteger() {
        return BigInteger.valueOf(nextLong());
    }

    public static BigInteger nextBigInteger(long min, long max) {
        return BigInteger.valueOf(nextLong(min, max));
    }

    public static Double nextDouble() {
        return org.apache.commons.lang3.RandomUtils.nextDouble();
    }

    public static UUID nextUUID() {
        return UUID.randomUUID();
    }

    public static <T> T randomItemArray(T[] arr) {
        return arr[RandomGenerator.nextInt(0, arr.length - 1)];
    }

    public static <E extends Enum<E>> E randomItemEnum(Class<E> enumClass) {
        final E[] values = enumClass.getEnumConstants();
        return randomItemArray(values);
    }

}
