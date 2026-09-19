import { colors } from "@/lib/theme";
import { useState, useMemo } from "react";
import { StyleSheet, Text, TextInput, View, ScrollView } from "react-native";

interface CodeEditorProps {
  value: string;
  onChangeText: (text: string) => void;
  language?: string;
  editable?: boolean;
}

export default function CodeEditor({
  value,
  onChangeText,
  language,
  editable = true,
}: CodeEditorProps) {
  const [isFocused, setIsFocused] = useState(false);

  const lineCount = useMemo(() => {
    return (value.match(/\n/g) || []).length + 1;
  }, [value]);

  const lineNumbers = useMemo(() => {
    return Array.from({ length: lineCount }, (_, i) => i + 1);
  }, [lineCount]);

  return (
    <View style={[styles.container, isFocused && styles.containerFocused]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        <ScrollView horizontal bounces={false} style={styles.scrollHorizontal}>
          <View style={styles.editorContent}>
            <View style={styles.gutter}>
              {lineNumbers.map((num) => (
                <Text key={num} style={styles.lineNumber}>
                  {num}
                </Text>
              ))}
            </View>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChangeText}
              editable={editable}
              multiline
              scrollEnabled={false}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              keyboardType="default"
              selectionColor={`${colors.accent}80`}
              cursorColor={colors.accent}
              placeholder="Start coding..."
              placeholderTextColor={colors.textMuted}
              textAlignVertical="top"
            />
          </View>
        </ScrollView>
      </ScrollView>

      {language && (
        <View style={styles.languageBadge}>
          <Text style={styles.languageText}>{language}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#171717",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    minHeight: 200,
    position: "relative",
    flex: 1,
  },
  containerFocused: {
    borderColor: colors.accent,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    minHeight: "100%",
  },
  scrollHorizontal: {
    flex: 1,
  },
  editorContent: {
    flexDirection: "row",
    paddingVertical: 16,
    minWidth: "100%",
  },
  gutter: {
    width: 40,
    backgroundColor: "#171717",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  lineNumber: {
    fontFamily: "Courier",
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMuted,
  },
  input: {
    flex: 1,
    fontFamily: "Courier",
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
    padding: 0,
    margin: 0,
    paddingLeft: 8,
    paddingRight: 16,
    minWidth: 300,
  },
  languageBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 10,
  },
  languageText: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});