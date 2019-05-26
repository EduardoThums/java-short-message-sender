package br.ifsul.lp3.messagesender.api.config;

import lombok.extern.slf4j.Slf4j;

import javax.persistence.GeneratedValue;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

import static br.ifsul.lp3.messagesender.api.config.RandomGenerator.*;
import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toSet;

/**
 * @author janderson.rosa
 * @author carloshenrique
 */
@Slf4j
public class DummyObjects {

    public static <E> E newInstance(Class<E> clazz) {
        final E instance;
        try {
            instance = clazz.newInstance();
        } catch (InstantiationException | IllegalAccessException ex) {
            String error = "Error creating new instance";
            DummyObjects.log.error(error, ex);
            throw new DummyObjectCreateInstanceException(error);
        }
        try {
            DummyObjects.populate(instance);
        } catch (IllegalArgumentException | SecurityException | IllegalAccessException | InstantiationException ex) {
            String error = "Error to populate instance";
            DummyObjects.log.error(error, ex);
            throw new DummyObjectCreateInstanceException(error);
        }
        return instance;
    }

    public static void populate(final Object instance) throws IllegalArgumentException, SecurityException, IllegalAccessException, InstantiationException {
        final List<Field> allDeclaredFields = DummyObjects.filterNonFinal(DummyObjects.getAllDeclaredFields(instance.getClass(), new ArrayList<>()));

        for (final Field field : allDeclaredFields) {
            field.setAccessible(true);

            if (String.class.isAssignableFrom(field.getType())) {
                int max = field.isAnnotationPresent(Size.class) ? field.getAnnotation(Size.class).max() : 10;
                field.set(instance, nextString(max > 500 ? 500 : max));
            } else if (long.class.isAssignableFrom(field.getType()) || Long.class.isAssignableFrom(field.getType())) {
                if (field.isAnnotationPresent(GeneratedValue.class)) {
                    continue;
                }
                field.set(instance, nextInt(1, Short.MAX_VALUE).longValue()); // TODO: Alguns mapeamentos long são int na base.
            } else if (int.class.isAssignableFrom(field.getType()) || Integer.class.isAssignableFrom(field.getType())) {
                if (field.isAnnotationPresent(Max.class)) {
                    final Long min = field.isAnnotationPresent(Min.class) ? field.getAnnotation(Min.class).value() : 1L;
                    final Long max = field.getAnnotation(Max.class).value();
                    field.set(instance, nextInt(min.intValue(), max.intValue()));
                    continue;
                }
                field.set(instance, nextInt(1, 1000));
            } else if (boolean.class.isAssignableFrom(field.getType()) || Boolean.class.isAssignableFrom(field.getType())) {
                field.set(instance, nextBoolean());
            } else if (LocalDateTime.class.isAssignableFrom(field.getType())) {
                field.set(instance, LocalDateTime.now());
            } else if (LocalDate.class.isAssignableFrom(field.getType())) {
                field.set(instance, LocalDate.now());
            } else if (Enum.class.isAssignableFrom(field.getType())) {
                final Class enumClass = field.getType();
                final Object[] enumConstants = enumClass.getEnumConstants();
                final Enum e = Enum.valueOf(enumClass, enumConstants[nextInt(0, enumConstants.length - 1)].toString());
                field.set(instance, e);
            } else if (BigDecimal.class.isAssignableFrom(field.getType())) {
                field.set(instance, RandomGenerator.nextBigDecimal(1, 1000, 0));
            } else if (BigInteger.class.isAssignableFrom(field.getType())) {
                if (field.isAnnotationPresent(Max.class)) {
                    final Long min = field.isAnnotationPresent(Min.class) ? field.getAnnotation(Min.class).value() : 1L;
                    final Long max = field.getAnnotation(Max.class).value();
                    field.set(instance, nextBigInteger(min.intValue(), max.intValue()));
                    continue;
                }
                field.set(instance, nextBigInteger(1, 1000));
            } else if (UUID.class.isAssignableFrom(field.getType())) {
                field.set(instance, RandomGenerator.nextUUID());
            }
        }
    }

    private static List<Field> getAllDeclaredFields(Class<?> type, List<Field> fields) {
        fields.addAll(Stream.of(type.getDeclaredFields()).collect(toSet()));
        if (type.getSuperclass() != null && Object.class != type.getSuperclass()) {
            DummyObjects.getAllDeclaredFields(type.getSuperclass(), fields);
        }
        return fields;
    }

    private static List<Field> filterNonFinal(List<Field> fields) {
        return fields.stream().filter(f -> !Modifier.isFinal(f.getModifiers())).collect(toList());
    }

}
