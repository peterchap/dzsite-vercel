import React, { useMemo } from "react";
import { Card, Stack, Checkbox, Text, TextInput } from "@sanity/ui";
import { useFormValue, set } from "sanity";

export default function AnchorMultiSelect(props: any) {
  const { value = [], onChange } = props;
  const sections = useFormValue(["sections"]) as any[] | undefined;
  const anchors: { id: string; label: string }[] = useMemo(() => {
    const list: { id: string; label: string }[] = [];
    if (Array.isArray(sections)) {
      for (const s of sections) {
        const a = s?.anchor;
        if (a && typeof a === "string") {
          const label = s?.title || s?.headline || s?._type || a;
          list.push({ id: a, label });
        }
      }
    }
    // Deduplicate
    const seen = new Set<string>();
    return list.filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }, [sections]);

  // Normalize selected value to array of {anchor,label}
  const selectedItems: { anchor: string; label?: string }[] = Array.isArray(value)
    ? value.map((v: any) => (typeof v === "string" ? { anchor: v, label: v } : v))
    : [];
  const isSelected = (id: string) => selectedItems.some((it) => it.anchor === id);

  const toggle = (id: string, defaultLabel: string) => {
    const next = isSelected(id)
      ? selectedItems.filter((x) => x.anchor !== id)
      : [...selectedItems, { anchor: id, label: defaultLabel }];
    onChange(set(next));
  };

  const updateLabel = (id: string, label: string) => {
    const next = selectedItems.map((x) => (x.anchor === id ? { ...x, label } : x));
    onChange(set(next));
  };

  if (!anchors.length) {
    return (
      <Card padding={3} tone="caution">
        <Text size={1}>No anchors found on this page. Add anchors to sections first.</Text>
      </Card>
    );
  }

  return (
    <Stack space={3}>
      {anchors.map((item) => {
        const selected = selectedItems.find((x) => x.anchor === item.id);
        return (
          <Card key={item.id} padding={2}>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", alignItems: "center", gap: 12 }}>
              <Checkbox
                checked={Boolean(selected)}
                onChange={() => toggle(item.id, item.label)}
              />
              <div style={{ display: "grid", gap: 6 }}>
                <Text size={1}>
                  {item.label} <span style={{ color: "#64748b" }}>#{item.id}</span>
                </Text>
                {selected ? (
                  <TextInput
                    value={selected.label ?? item.label}
                    onChange={(e: any) => updateLabel(item.id, e.currentTarget.value)}
                    placeholder="Button label"
                  />
                ) : null}
              </div>
            </div>
          </Card>
        );
      })}
    </Stack>
  );
}
