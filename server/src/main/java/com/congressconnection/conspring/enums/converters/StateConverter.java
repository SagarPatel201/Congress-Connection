package com.congressconnection.conspring.enums.converters;

import com.congressconnection.conspring.enums.State;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.Locale;

@Component
public class StateConverter implements Converter<String, State> {
    @Override
    public State convert(String source) {
        return State.valueOf(source.toUpperCase());
    }
}
